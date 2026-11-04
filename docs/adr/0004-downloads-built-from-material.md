# ADR-0004: Downloads are built from `material/` and committed

- **Status:** Accepted
- **Date:** 2026-11-04

## Context

Lessons offer example skills (zips that claude.ai accepts) and a Claude Code workspace
template. The sources must stay readable and reviewable; the learner needs one-click zips.

## Options considered

### Option A — Sources in `material/`, zips built by `scripts/zip-skills.sh` into `public/descargas/` and committed

- Pros: sources reviewable in diffs; the Docker build needs no `zip`; the zips are exactly what
  was reviewed.
- Cons: someone can edit `material/` and forget to re-run the script.

### Option B — Build the zips in the Dockerfile

- Pros: never stale.
- Cons: adds `zip` to the build image; the dev server would not have them.

## Decision

Option A. The project policies require running the script whenever `material/` changes.

## Consequences

- Revisit if: the zips are found stale; then add a test comparing them with `material/`.
