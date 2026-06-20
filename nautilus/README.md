# Nautilus Agent

> Landing page for **Nautilus** — an open-source AI co-pilot built for scientific research. Forked from the Hermes Agent core and wrapped with a domain layer for labs, not just laptops.

🌐 **Live site:** [https://tj-coding.github.io/nautilus-agent/](https://tj-coding.github.io/nautilus-agent/)

[![Vue](https://img.shields.io/badge/Vue-3.5-42b883?logo=vue.js&logoColor=fff)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff?logo=vite&logoColor=fff)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-6e9f18?logo=vitest&logoColor=fff)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-1.59-2ead33?logo=playwright&logoColor=fff)](https://playwright.dev/)


## What it is

This repository hosts the marketing landing page for the Nautilus Agent project. It features a golden-ratio particle canvas animation, a terminal install section, feature cards, and a "How it works" walkthrough.

## Quick start

### Prerequisites

- **Node.js** `^20.19.0` or `>=22.12.0` (run `node -v` to check)
- **npm** (comes with Node)

### Install dependencies

```bash
npm install
```

### Development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (default Vite port).

> Hot Module Replacement (HMR) is enabled — edit any `.vue` or `.css` file and see changes instantly.


## Build

```bash
npm run build
```

Produces the production bundle in `dist/`. You can preview it locally with:

```bash
npm run preview
```

This starts a static server on [http://localhost:4173](http://localhost:4173).


## Project structure

```
.
├── e2e/                   # Playwright end-to-end tests
├── public/                # Static assets (favicon, etc.)
├── src/
│   ├── assets/            # Images, CSS resets & global styles
│   ├── router/            # Vue Router definitions
│   ├── stores/            # Pinia stores (reactive global state)
│   ├── views/             # Page-level Vue components
│   ├── App.vue            # Root component
│   └── main.js            # Entry point — mounts Vue, wires Pinia + router
├── index.html             # HTML entry point
├── vite.config.js         # Vite bundler config
├── vitest.config.js       # Unit test config (Vite + jsdom)
├── playwright.config.js   # E2E test config (3 browsers, auto-starts dev server)
├── package.json
└── README.md
```


## Testing

### Unit tests (Vitest)

```bash
# Run once
npm run test:unit

# Run in watch mode (re-runs on file changes)
npm run test:unit -- --watch
```

Tests live next to the code they test (e.g. `Component.spec.js` beside `Component.vue`).

### End-to-end tests (Playwright)

```bash
# First run only — install browser binaries
npx playwright install

# Run E2E tests (auto-starts the dev server)
npm run test:e2e

# Run against a single browser
npm run test:e2e -- --project=chromium

# Run a specific test file
npm run test:e2e -- e2e/vue.spec.js

# Debug mode (opens headed browser + inspector)
npm run test:e2e -- --debug
```

Playwright is configured to test against **Chromium, Firefox, and WebKit** on desktop. It auto-starts the Vite dev server and will reuse an already-running server if you have `npm run dev` going.

> **CI tip:** Set `CI=true` to run tests in headless mode with 2 retries, 1 worker, and against the preview server (static build on port 4173).


## Lint & format

```bash
# Lint with Oxlint + ESLint, and auto-fix where possible
npm run lint

# Lint only
npm run lint:oxlint
npm run lint:eslint

# Format with Prettier
npm run format
```

| Tool        | Purpose                                         | Config |
|-------------|-------------------------------------------------|--------|
| **Oxlint**  | Ultra-fast JS/TS linter                         | `.oxlintrc.json` |
| **ESLint**  | Full lint rules (Vue, Prettier, Vitest, Playwright) | `eslint.config.js` |
| **Prettier**| Code formatting                                 | `.prettierrc.json` |


## Tech stack

- [Vue 3](https://vuejs.org/) — Composition API (`<script setup>`)
- [Vue Router](https://router.vuejs.org/) — SPA routing
- [Pinia](https://pinia.vuejs.org/) — State management
- [Vite](https://vitejs.dev/) — Next-gen build tool & dev server
- [Vitest](https://vitest.dev/) + jsdom — Unit testing
- [Playwright](https://playwright.dev/) — Cross-browser E2E testing
- ESLint / Oxlint / Prettier — Code quality


## Deploy

The `dist/` folder produced by `npm run build` is a fully static site (single `index.html` + hashed assets). You can deploy it anywhere:

- **Vercel / Netlify / Render** — drop the `dist/` folder or connect the repo for auto-deploy on push.
- **GitHub Pages** — use an Action to run `npm run build` and push `dist/` to `gh-pages`.
- **Nginx / Caddy / S3** — serve `dist/` as a static directory.


## License

MIT — Nautilus is a community fork of Hermes Agent. Built for science, by scientists.
