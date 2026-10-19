# React DevOps Dashboard

A responsive developer portfolio built with React, Vite, CSS, and Lucide icons.

## Features
- Responsive navigation with mobile menu
- Dark/light theme toggle
- Skills section
- Project cards with category filters and search
- Contact form with client-side validation and confirmation
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

## Deploy on Vercel

1. Push the project to GitHub.
2. Sign in at https://vercel.com/ and import the GitHub repository.
3. Keep the framework preset as Vite (or let Vercel detect it).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy. Subsequent pushes to the connected branch trigger new deployments.

## Important notes
- The contact form is a frontend demo; it does not send email or store messages.
- Replace example social links and `hello@example.com` with your own details.
- Project cards are portfolio concepts; customize them to match your actual work.
