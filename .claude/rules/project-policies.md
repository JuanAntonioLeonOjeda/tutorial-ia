---
description: What this project is, its scope, commands, the Docker rebuild rule, language and what not to do.
---

# Project policies and context

## What this is

**Aprende IA**: a step-by-step course for executive assistants (asistente de
dirección) who use Claude, ChatGPT and Gemini as regular users and want to get much more out
of them at work. Learners are **not programmers**: everything except the optional section is done
through the apps' interfaces.

- Four modules (Fundamentos, Claude a fondo, Superpoderes, ChatGPT y Gemini) and an optional
  section, **Un paso más** (`extras` in `catalog.ts`), with the few things worth learning that
  need a terminal or a text file (Claude Code, the `.claude/` folder, MCP by hand).
- Each lesson: plain Spanish, mock chats, prompts to copy, simulations that make one idea
  visible, quick questions and **practices done in the real tool** (`<Practice>`).
- `material/` holds downloadable material (example skills, a Claude Code workspace template).
  `scripts/zip-skills.sh` packs it into `public/descargas/`, where lessons link to it.
- It runs on localhost in Docker and is published on GitHub Pages under `/tutorial-ia/` on
  every push to `main` (ADR-0005). **No accounts, no backend, no telemetry** (ADR-0001).
  Progress lives in the browser's `localStorage` (ADR-0003).

Priority: **correct and useful content over features**. A wrong menu path or a feature that no
longer exists is a bug of the highest severity; a missing feature of the app is not.

## Content principles (the reason the project exists)

- Explain in close, plain Spanish ("tú"), from their job: agendas, actas, consejo, viajes,
  correos. Every example should be something an executive assistant does.
- Interface first. Code only in `un-paso-mas/`, and even there explained line by line.
- Say **how it is done in a real office** (`<Callout kind="real">`) and **what can go wrong**
  (privacy, invented data, permissions).
- Every lesson ends in practice: something to do in Claude (or ChatGPT/Gemini) this week.
- AI products change monthly: describe **ideas** that last and treat menu paths as hints
  ("en algunas versiones…"). Verify every product claim against official help pages before
  writing it (see `ai-collaboration.md`).

Authoring rules: `.claude/rules/content-authoring.md`. Simulations:
`.claude/rules/simulations.md`.

## Commands

```bash
pnpm install
pnpm dev               # Vite dev server on :5173
pnpm lint
pnpm typecheck
pnpm test              # Vitest: content consistency, simulation logic, UI
pnpm build
./scripts/zip-skills.sh                      # rebuild public/descargas/ from material/
docker compose up -d --build                 # the app on http://localhost:3300
```

### Rebuild the Docker image after every change

The course is used through the container (`tutorial-ia-web-1`, port `TUTORIAL_IA_PORT`, 3300 by
default), which serves the image built at that moment: `pnpm dev` or green tests do not update
it. After any change in `src/`, `public/`, `material/`, styles, `index.html`, `nginx.conf` or
dependencies, and before saying the work is done, run `./scripts/zip-skills.sh` if `material/`
changed, then `docker compose up -d --build`, and say in the final message that the image was
rebuilt (or why it was not).

## Dependencies

- Versions are pinned exactly and come from the registry, never from memory.
- pnpm enforces a minimum release age: do not bypass it; pick an older version instead.
- When a main dependency is added or upgraded, update its badge in the README.

## Language

- Conversation with the author: Spanish.
- Code, identifiers, comments, commits, ADRs, specs and `.claude/`: English.
- Everything the learner reads (UI strings in `src/i18n/es.ts`, lessons in `src/content/`,
  `material/`): Spanish.

## What NOT to do

- Do not add a backend, accounts or analytics.
- Do not state a product feature, menu path, plan or limit without checking an official source
  in the same session; if it cannot be checked, hedge it in the text or leave it out.
- Do not put real company data, names of real people from a learner's workplace or credentials in
  examples: use the fictional cast (Laura Martín, CEO; Ana, her assistant; Acme, a client).
- Do not add dependencies without saying why; prefer small hand-written SVG over chart
  libraries for simulations.
- Do not commit secrets or `.env`.
- Do not create content in `.claude/` just to fill a folder: add it when the need is real.
