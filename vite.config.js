import { defineConfig, loadEnv } from "vite";

const MAX_BODY_SIZE = 10_000;
const contactHandler = (await import("./api/contact.js")).default;

function localContactApi() {
  return {
    name: "local-contact-api",
    configureServer(server) {
      server.middlewares.use("/api/contact", (req, res, next) => {
        if (req.url !== "/" && req.url !== "") {
          return next();
        }

        let rawBody = "";
        let bodySize = 0;
        let tooLarge = false;

        req.on("data", (chunk) => {
          bodySize += chunk.length;
          if (bodySize > MAX_BODY_SIZE) {
            tooLarge = true;
            return;
          }
          rawBody += chunk;
        });

        req.on("end", async () => {
          const sendJson = (statusCode, payload) => {
            res.statusCode = statusCode;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify(payload));
          };

          if (tooLarge) {
            return sendJson(413, { error: "The form submission is too large." });
          }

          try {
            req.body = rawBody ? JSON.parse(rawBody) : {};
          } catch {
            return sendJson(400, { error: "Invalid JSON request body." });
          }

          try {
            await contactHandler(req, {
              status(statusCode) {
                res.statusCode = statusCode;
                return this;
              },
              json(payload) {
                sendJson(res.statusCode || 200, payload);
                return this;
              },
            });
          } catch (error) {
            console.error("Local contact API failed:", error);
            sendJson(500, { error: "The contact service failed. Please try again later." });
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const key of ["RESEND_API_KEY", "CONTACT_EMAIL", "FROM_EMAIL"]) {
    if (!process.env[key] && env[key]) {
      process.env[key] = env[key];
    }
  }

  return { plugins: [localContactApi()] };
});
