# about.me — portfolio site

Interactive 3D portfolio for Sushank Sajwan (AI Engineer). Deployed to GitHub Pages at
https://sushank-sajwan.github.io/about.me/ (repo: sushank-sajwan/about.me).

## Stack
Vite 8 + React 19 + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`, no tailwind.config — theme lives in `src/index.css`),
three / @react-three/fiber / @react-three/drei, framer-motion. Linter: oxlint.

## Commands
- `npm run dev` — dev server (served under `/about.me/`)
- `npm run build` — `tsc -b && vite build` (must pass before committing)
- `npx oxlint src` — lint
- `npm run preview` — serve `dist/`

## Layout
- `src/data/resume.ts` — **all content** (profile, stats, experience → projects, skills, education). Edit content here only.
  `featuredProjects` picks cards for the Projects section by name.
- `src/App.tsx` — theme state (dark/light via `data-theme` on `<html>`, saved in localStorage), scroll progress bar, section order.
- `src/components/` — `Navbar`, `Hero` (typing effect; lazy-loads `HeroScene`), `HeroScene` (R3F node network + distorted core,
  colours passed as props because WebGL can't read CSS vars), `About` (count-up stats), `Experience` (scroll-filled timeline,
  accordion), `Projects` (tilt cards + modal), `Skills` (CSS-3D rotating tag sphere), `Contact`, `ui.tsx` (`Section`, `Reveal`, `Chip`).
- `src/index.css` — colour tokens (`--bg --surface --line --fg --muted --accent --accent-2`) mapped to Tailwind colours
  (`bg-bg`, `text-muted`, `text-accent`, …). Use these tokens, not raw colours.
- `public/resume.pdf` — downloadable resume (contains phone number; user is aware).
- `.github/workflows/deploy.yml` — builds and deploys to Pages on push to `main`.

## Conventions
- Asset/link paths must be relative (no leading `/`) because of the `base: '/about.me/'` in `vite.config.ts`.
  If the repo is renamed to `sushank-sajwan.github.io`, set `base: '/'` and update README/CLAUDE.md URLs.
- Respect `prefers-reduced-motion` (Hero skips the 3D scene; CSS disables animations).
- Keep layouts working at phone width.
- Commit messages end with the Claude co-author line; only commit/push when asked.
