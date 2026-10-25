# React DevOps Dashboard

# Test commit 
# manikanatreddy gade
# hi this is portfoilo website
A responsive developer portfolio built with React, Vite, CSS, and Lucide icons.

## Features
- Responsive navigation with mobile menu
- Dark/light theme toggle
- Skills section
- Project cards with category filters and search
- Recruiter contact form with server-side validation and email delivery
- Responsive layout for mobile, tablet, and desktop

## Requirements
- Node.js (LTS recommended)
- Git
- GitHub account

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Create a production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Git and GitHub practice

From this project folder:

```bash
git init
git add .
git commit -m "Initial React portfolio"
git branch -M main
```

Create an empty repository on GitHub, then connect it (replace the URL):

```bash
git remote add origin https://github.com/YOUR-USERNAME/react-devops-dashboard.git
git push -u origin main
```

For future changes:

```bash
git status
git add .
git commit -m "Describe your change"
git push
```

## Configure recruiter email delivery

The contact form sends recruiter details (name, email, company, role, optional phone number, and message) to your inbox using the Resend email API.

1. Create a Resend account and verify a domain you can send email from.
2. Create a Resend API key.
3. Add these environment variables to a local `.env.local` file for development and to the Vercel project settings for each deployed environment:
   - `RESEND_API_KEY`: your Resend API key
   - `CONTACT_EMAIL`: the inbox where recruiter messages should arrive
   - `FROM_EMAIL`: a sender address on your verified domain, for example `Portfolio Contact <portfolio@yourdomain.com>`
4. Restart the local dev server after changing `.env.local`. Redeploy Vercel after changing its environment variables.

Keep the API key only in server-side environment variables. Do not add it to React code or commit it to Git. `.env.example` shows the required variable names without real credentials.

## Test the contact form locally

Copy `.env.example` to `.env.local`, replace the example values with your Resend settings, then run:

```bash
npm run dev
```

The Vite dev server also runs the contact API locally at `/api/contact`. The form cannot send email until valid Resend settings are configured.

## Deploy on Vercel

1. Push the project to GitHub.
2. Sign in at https://vercel.com/ and import the GitHub repository.
3. Keep the framework preset as Vite (or let Vercel detect it).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add the email environment variables above, then deploy. Subsequent pushes to the connected branch trigger new deployments.

The API endpoint is `POST /api/contact` and is served by Vercel alongside the Vite frontend.

## Important notes
- The contact form requires the three Resend/Vercel environment variables to deliver messages.
- Replace example social links with your own profiles.
- Project cards are portfolio concepts; customize them to match your actual work.
