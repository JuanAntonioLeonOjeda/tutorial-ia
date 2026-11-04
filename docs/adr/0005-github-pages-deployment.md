# ADR-0005: Also published on GitHub Pages, under /tutorial-ia/

- **Status:** Accepted
- **Date:** 2026-11-04

## Context

Learners should be able to open the course from a work laptop without Docker. The repository is
public on GitHub. The app was built to be served from the root of a domain by nginx, which
also sends every unknown path to `index.html` (ADR-0001).

## Options considered

### Option A — GitHub Pages project site, built by a GitHub Actions workflow

- Pros: free, no server, deploys on every push to `main`; Docker keeps working locally.
- Cons: the site lives under `/tutorial-ia/`, so the build needs a base path; Pages has no
  SPA fallback.

### Option B — Netlify, Vercel or Cloudflare Pages

- Pros: SPA rewrites built in; root path.
- Cons: another account and service for the author; nothing Pages cannot do here.

### Option C — Hash routes (`/#/fundamentos`) to avoid the fallback

- Pros: no `404.html` trick.
- Cons: uglier URLs; the table of contents already uses `#` anchors.

## Decision

Option A. The base path comes from `BASE_PATH` (default `/`), used by Vite (`base`), React
Router (`basename` from `import.meta.env.BASE_URL`), `index.html` (`%BASE_URL%`) and lesson
links (`LessonLink` prefixes `/descargas/…`). The workflow copies `index.html` to `404.html`,
so a reloaded lesson URL loads the app, which then routes it.

## Consequences

- Easier: the course is at https://juanantonioleonojeda.github.io/tutorial-ia/.
- Harder: links in lessons must be root-relative (`/descargas/…`) and go through `LessonLink`;
  a hard-coded `<a href="/…">` in a component would break on Pages.
- Pages answers deep links with HTTP 404 (the page still works); search engines may not index
  them, which does not matter for this course.
- Progress is per origin: Pages and Docker keep separate progress (ADR-0003).

## Verification

- 2026-11-04: `BASE_PATH=/tutorial-ia/ pnpm build`, served under `/tutorial-ia/` by a local
  server that returns `404.html` for unknown paths: a lesson URL loaded directly, the header
  link pointed to `/tutorial-ia/`, the skill zip downloaded with HTTP 200.
