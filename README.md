# VYRO Creative Studio

Cinematic portfolio website built with React, TanStack Start, Vite, GSAP, and Tailwind CSS.

## Local development

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
```

Open http://localhost:8080. Source changes update the preview automatically.

## Checks

```sh
npm run typecheck
npm run build:dev
```

Website source is in `src`; brand artwork and campaign films are in `public`.
The animated chrome loading screen waits for media and fonts before revealing the page.
The `.grok/app-env.json` file contains the original non-secret application flags.

This repository contains the website only. Local archives, dependency caches, and build output are excluded.
