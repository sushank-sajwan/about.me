# about.me

Interactive 3D portfolio of **Sushank Sajwan** — AI Engineer (LLM platforms, agentic systems & RAG).

Live: https://sushank-sajwan.github.io/about.me/

Built with Vite, React, TypeScript, Tailwind CSS, Three.js (@react-three/fiber) and Framer Motion.

## Develop

```sh
npm install
npm run dev
```

## Update content

All content lives in [`src/data/resume.ts`](src/data/resume.ts). Put a downloadable resume at `public/resume.pdf`.

## Deploy

Pushing to `main` builds and deploys via GitHub Actions (`.github/workflows/deploy.yml`).
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
