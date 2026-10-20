const MAX_BODY_SIZE = 10_000;

function readField(body, field, maxLength, required = true) {
  const value = body[field];

  if (value === undefined && !required) {
    return "";
  }
  if (typeof value !== "string") {
    throw new Error(`Please provide a valid ${field}.`);
  }

  const trimmed = value.trim();
  if ((required && !trimmed) || trimmed.length > maxLength) {
    throw new Error(`Please provide a valid ${field}.`);
  }

  return trimmed;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)
    || Buffer.byteLength(JSON.stringify(body), "utf8") > MAX_BODY_SIZE) {
    return res.status(400).json({ error: "Invalid form submission." });
  }

  let name;
  let email;
  let company;
  let role;
  let phone;
  let message;

  try {
    name = readField(body, "name", 100);
    email = readField(body, "email", 254);
    company = readField(body, "company", 120);
    role = readField(body, "role", 120);
    phone = readField(body, "phone", 40, false);
    message = readField(body, "message", 5000);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  const { RESEND_API_KEY, CONTACT_EMAIL, FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_EMAIL || !FROM_EMAIL) {
    console.error("Contact email service is missing required environment variables.");
    return res.status(500).json({ error: "The contact service is not configured yet. Please email me directly." });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeRole = escapeHtml(role);
  const safePhone = escapeHtml(phone || "Not provided");
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");
  const subjectDetails = `${role} at ${company}`.replace(/[\r\n]+/g, " ").slice(0, 250);

  try {
    const providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `Portfolio recruiter inquiry: ${subjectDetails}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company}`,
          `Role: ${role}`,
          `Phone: ${phone || "Not provided"}`,
          "",
          message,
        ].join("\n"),
        html: `
          <h2>New portfolio recruiter inquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Company:</strong> ${safeCompany}</p>
          <p><strong>Role:</strong> ${safeRole}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Message:</strong><br>${safeMessage}</p>
        `,
      }),
    });

    if (!providerResponse.ok) {
      console.error(`Email provider request failed with status ${providerResponse.status}.`);
      return res.status(502).json({ error: "The message could not be delivered. Please try again later." });
    }

    return res.status(200).json({ message: "Message sent." });
  } catch (error) {
    console.error("Unable to reach the email provider:", error);
    return res.status(502).json({ error: "The contact service is temporarily unavailable. Please try again later." });
  }
}
