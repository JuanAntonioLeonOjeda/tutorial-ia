---
paths:
  - "src/features/simulations/**"
description: How simulations are built — pure tested logic, the kit, tokens for colours, accessibility and motion.
---

# Simulations

A simulation exists to make one idea visible by moving one or two knobs. If it does not invite
an experiment ("quita el contexto y mira la respuesta…"), it is a figure, not a simulation.
Simulations of AI products are honest simplifications: the `intro` or a `ControlNote` says what
is simplified (hand-written answers, keyword matching instead of the model's judgement…).

## Structure

- One component per file, `XxxSim.tsx`, **default export** (it is lazy-loaded), registered in
  `registry.tsx` under the same name.
- The logic lives in a pure module next to it (`prompt-builder.ts`, `skills.ts`,
  `automation.ts`…) and is covered in `curso.test.ts`. Dates are passed in, never read inside
  the logic. The component only holds state and draws.
- Use the kit (`features/simulations/kit`): `SimFrame` (title, intro, controls, readout,
  reset), `Slider`, `Choice`, `Toggle`, `SimButton`, `Stat`, `Axes`, `useAnimation`,
  `createRng` (seeded: the same data every time).

## Drawing

- Hand-written SVG with a `viewBox`, scaled with `linearScale`. Canvas only for per-pixel
  images (decision maps, convolutions).
- Colours only from tokens: `var(--plot-N)` via `plotColour(i)`, `var(--subject-color)`,
  `var(--color-*)`. Canvas reads them with `getComputedStyle` and redraws on theme change.
- Colour is never the only cue: add labels, shapes or text readouts.

## Accessibility and motion

- Every SVG has `role="img"` and an `aria-label` that states the current result.
- Everything is operable by keyboard: prefer kit controls; clickable SVG elements need
  `role="button"`, `tabIndex`, Enter/Space handling and `aria-pressed` where it is a toggle.
- Animations go through `useAnimation`, which slows down under `prefers-reduced-motion`, and
  always have a pause and a step-by-step alternative.
- Do not read refs during render (React Compiler lint): keep random streams in state.
