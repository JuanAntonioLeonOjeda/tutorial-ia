---
description: App layout, feature folders, how lessons, exercises, simulations and downloads fit together, and the dependency rules.
---

# Architecture

A static single-page app (Vite + React + React Router). No server code: nginx serves the build.

## Layout

```
src/
  content/              # the lessons
    catalog.ts          # modules in home-page order, and the extras ("Un paso más")
    define-lesson.ts    # catalog entry + lazy component per lesson
    <module>/index.ts   # the module and its lessons (metadata, exercise ids, sources)
    <module>/NN-<slug>.mdx
  design/               # tokens (light/dark), base styles, prose (lesson typography)
  i18n/es.ts            # every UI string (lesson text lives in the MDX)
  features/
    shell/              # header, footer, theme
    catalog/            # queries over the catalog, progress ring, module icons
    lesson/             # lesson page, sidebar, table of contents, MDX component map
    exercises/          # Quiz, Predict, Practice, answer checking, progress scope
    progress/           # localStorage progress store
    simulations/        # kit/ (frame, controls, plot helpers) + curso/ (logic + sims)
    illustrations/      # static SVG diagrams used by lessons
    ui/                 # Callout, Figure, Chat, Prompt, MenuPath
  routes/               # route tree and pages (home, module, lesson, not found)
material/               # downloadable sources: skills/<name>/SKILL.md, espacio-direccion/
public/descargas/       # zips built from material/ by scripts/zip-skills.sh (committed)
```

## How a lesson works

1. `content/<module>/index.ts` declares the lesson with `defineLesson`, which wraps the MDX
   import in `React.lazy`: each lesson is its own chunk.
2. MDX is compiled at build time (`@mdx-js/rollup`) with GFM and Shiki (code blocks, both
   themes as CSS variables): no highlighter ships to the browser.
3. `features/lesson/mdx-components.tsx` exposes, by name, everything a lesson may use without
   importing it: callouts, chats, prompts, exercises, every simulation and every illustration.
4. Simulations are registered in `features/simulations/registry.tsx`, each lazily loaded.

## Exercises

- `Quiz` and `Predict` check the answer in the page. `Practice` is done in the real assistant:
  it is marked done when every step is ticked and the learner confirms.
- Progress is keyed `module/lesson#id` in `localStorage` (ADR-0003).

## Dependency rules

- `routes → features → design / i18n / content types`. Features import other features only
  through their `index.ts`.
- `content/` may import only `define-lesson` and types; lessons never import components (the
  MDX provider supplies them).
- Simulation logic lives in plain `.ts` modules and is unit-tested; components only draw.

## When NOT to apply this literally

- Tiny presentational components do not need a folder each.
- Do not create a context or a global store before two features need the same state.
