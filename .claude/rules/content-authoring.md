---
paths:
  - "src/content/**"
  - "material/**"
description: How lessons are written — tone, structure, the components available, exercise rules and how to verify product claims.
---

# Writing a lesson

## Tone

- Spanish, close and direct ("tú"), like a colleague who already uses these tools showing you
  at your desk. Short paragraphs. No marketing ("revolucionario", "potentísimo") and no filler.
- Start from **the office problem** (an agenda, an acta, a trip), then the feature that solves
  it, then how to use it well, then what can go wrong.
- Fictional cast for every example: Laura Martín (CEO), Ana (her assistant), Acme (a client),
  the Comité de Dirección and the Consejo. Never real people or companies.

## Structure

1. One opening paragraph: the problem this lesson solves.
2. `##` sections (they feed the table of contents). Keep `##` titles short.
3. At least one `<Callout kind="real">` (how it is done in a real office) per lesson, and a
   `<Callout kind="warn">` when there is a privacy, permission or reliability risk.
4. Exercises spread through the lesson, right after the idea they practise; at least one
   `<Practice>` per lesson.
5. Close with `## Para llevar`: 3–6 bullets (a test enforces the heading).

## Components (no imports needed)

| Component                                                            | Use                                                                  |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `<Callout kind="real \| warn \| idea \| practice \| note" title?>`   | side notes with a fixed meaning                                      |
| `<Chat messages={[{ from: "tu" \| "ia", text, note? }]} assistant?>` | a mock conversation; `note` is a grey line (attachments, tools used) |
| `<Prompt text={`...`} title?>`                                       | a prompt to copy; `[PLACEHOLDERS]` are highlighted                   |
| `<MenuPath to={["Ajustes", "Conectores"]} />`                        | where a setting lives, as a breadcrumb                               |
| `<Figure caption>`                                                   | wraps an inline SVG                                                  |
| `<Quiz id options answer explanation hints?>`                        | multiple choice; `answer` is the index                               |
| `<Predict id answer explanation hints?>`                             | "work it out and type the result" (a word or a number)               |
| `<Practice id title? steps={[...]} hints? example={...}>`            | a task done in the real tool, with a checklist and a worked example  |
| `<XxxSim />`                                                         | a simulation from `features/simulations/registry.tsx`                |
| `<XxxDiagram />`                                                     | an illustration from `features/illustrations/index.ts`               |

## Exercise rules

- `id` is unique in the lesson and **listed in the lesson's `exercises` in
  `content/<module>/index.ts`** in the same order (a test enforces it).
- Quiz options are plausible; the explanation says why the right one is right **and** why the
  tempting wrong one is wrong.
- A `Practice` has 3–6 concrete steps (one action each), a fallback hint when the feature may
  be missing on the learner's plan, and an `example` that shows what a good result looks like.
- Downloads go in `material/` and are linked as `/descargas/<name>.zip` after running
  `scripts/zip-skills.sh`. Internal links are root-relative markdown links: `LessonLink` adds
  the GitHub Pages base path (ADR-0005). Never hard-code `<a href="/…">`.

## Product claims

- Menu paths and feature names are checked against official help pages (see
  `ai-collaboration.md`) and listed in `sources`. When they vary by version or plan, say so
  ("en algunas versiones…", "si tu empresa lo tiene activado").

## MDX pitfalls

- `<` and `{` in plain text start JSX: write them inside `code`.
- Inside template literals (`text={`...`}`): no backticks and no `${`.
- File name `NN-<slug>.mdx` must match the lesson order and slug (a test enforces it).

Review with the `content-reviewer` agent.
