# ADR-0001: A static app without a backend

- **Status:** Accepted
- **Date:** 2026-11-04

## Context

The course is for individual learners, on localhost (or any static host). It shows lessons, simulations
and exercises. The platform is reused from the author's study app (`../master/repaso`), which
made the same decision for the same reasons.

## Options considered

### Option A — Static SPA (Vite + React), content compiled into the build

- Pros: one container (nginx), nothing to operate; lessons versioned with the code; can be
  published on any static host later if a learner wants it on a work laptop.
- Cons: progress cannot be shared between browsers; every content change needs a rebuild.

### Option B — SPA + API with a database

- Pros: progress shared across devices.
- Cons: a service to maintain for one learner; no feature needs it.

### Option C — A document (Google Doc, PDF, Claude Doc)

- Pros: nothing to run.
- Cons: no simulations, no exercises with feedback, no progress; the teaching method of the
  study app is the reason to build this.

## Decision

Option A. Lessons are MDX compiled at build time (`@mdx-js/rollup`, Shiki at build time).

## Consequences

- Easier: run with `docker compose up -d --build`; nothing else to keep alive.
- Harder: progress lives in one browser (ADR-0003).
- Revisit if: the learner wants to use it from several devices.

## Verification

- `pnpm build` and `docker compose up -d --build` on 2026-11-04, pages served on port 3300.
