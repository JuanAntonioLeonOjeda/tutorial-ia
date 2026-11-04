---
description: Testing conventions — Vitest and Testing Library, content consistency and simulation logic tests.
---

# Testing conventions

## Tools

- **Vitest** with **Testing Library** (`@testing-library/react`, `user-event`); query by role
  and accessible name.
- No snapshot tests of whole pages.

## What must be tested

- **Content consistency** (`src/content/content.test.ts`): file names match lesson order and
  slug; exercise ids in the catalog match the MDX (`Quiz`, `Predict`, `Practice`); every
  simulation/diagram used exists; every practice has steps and an example; every lesson ends
  with "Para llevar".
- **Simulation logic** (`src/features/simulations/curso/curso.test.ts`): each module against
  hand-checked cases (which skill a request loads, next runs of a schedule, what a missing
  connector blocks…).
- **Components**: exercises (right/wrong feedback, hints one at a time, practice enabled only
  when every step is ticked) and UI pieces (`Prompt`, `Chat`, `MenuPath`).
- **Routes**: home, module and not-found pages.

## Determinism

- No network in tests. Dates are injected (`nextRuns(when, from, n)`), never `new Date()` in
  logic.

## Before saying something is done

`pnpm lint && pnpm typecheck && pnpm test && pnpm build`, plus a Docker rebuild (see
`project-policies.md`).
