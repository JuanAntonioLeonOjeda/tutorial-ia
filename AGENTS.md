# AGENTS.md — Aprende IA (AI course for an executive assistant)

Route index.

Project context, scope, commands, the Docker rebuild rule and what not to do live in
`.claude/rules/project-policies.md`. How the assistant must collaborate (verify product claims,
explain, write for a non-technical learner) lives in `.claude/rules/ai-collaboration.md`. Both
are always loaded with this index. Writing lessons: `.claude/rules/content-authoring.md`
(loaded when touching `src/content/` or `material/`). Building simulations:
`.claude/rules/simulations.md`.

## Code map

Status: ⏳ planned (does not exist yet) · 🚧 in progress · ✅ done.
Update the status column when a change creates or finishes a path.

| Path                                                                | Content                                                                                                                                                           | Status |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `package.json`, `pnpm-lock.yaml`, `vite.config.ts`, `tsconfig.json` | pnpm project, Vite with MDX (GFM, Shiki at build time), strict TypeScript, `@/` alias                                                                             | ✅     |
| `src/content/`                                                      | the lessons: `catalog.ts` (four modules and the extras), `define-lesson.ts`, one folder per module with `index.ts` and `NN-<slug>.mdx`; `content.test.ts`         | ✅     |
| `src/content/fundamentos/`                                          | Module 1, 4 lessons: what is behind the chat, asking well, files/images/voice, safe use                                                                           | ✅     |
| `src/content/claude/`                                               | Module 2, 6 lessons: the interface, artifacts and documents, projects, memory and styles, research, Claude in Chrome/Excel/PowerPoint                             | ✅     |
| `src/content/superpoderes/`                                         | Module 3, 5 lessons: connectors (MCP), skills, Cowork, scheduled tasks, recipes for an executive assistant                                                        | ✅     |
| `src/content/otras-herramientas/`                                   | Module 4, 3 lessons: ChatGPT translated, Gemini/Gems/NotebookLM, which one for what                                                                               | ✅     |
| `src/content/un-paso-mas/`                                          | Optional section with a little code, 3 lessons: Claude Code, the `.claude/` folder and AGENTS.md, MCP connectors by hand                                          | ✅     |
| `src/design/`                                                       | tokens (light/dark, module hues, plot palette, the "task" highlighter), base styles, `prose.css`; fonts from `@fontsource-variable`                               | ✅     |
| `src/i18n/es.ts`                                                    | every UI string (lesson text lives in the MDX)                                                                                                                    | ✅     |
| `src/features/shell/`                                               | header, footer, theme (light/dark, stored, applied before first paint by `index.html`)                                                                            | ✅     |
| `src/features/catalog/`                                             | queries over the catalog and progress, progress ring, module icons                                                                                                | ✅     |
| `src/features/lesson/`                                              | lesson page: sidebar, header with sources, MDX provider, table of contents, done button, prev/next                                                                | ✅     |
| `src/features/exercises/`                                           | `Quiz`, `Predict`, `Practice` (checklist done in the real tool), hints and solution, answer checking                                                              | ✅     |
| `src/features/progress/`                                            | progress store in localStorage (ADR-0003)                                                                                                                         | ✅     |
| `src/features/simulations/`                                         | `kit/` and 6 sims in `curso/` (context window, prompt builder, connectors, skill triggering, agent run, scheduled task) with pure logic tested in `curso.test.ts` | ✅     |
| `src/features/illustrations/`                                       | static SVG diagrams (the course ladder, a project, the agent loop)                                                                                                | ✅     |
| `src/features/ui/`                                                  | `Callout`, `Figure`, `Chat`, `Prompt`, `MenuPath`                                                                                                                 | ✅     |
| `src/routes/`                                                       | route tree, home, module page, lesson route, not found, error boundary                                                                                            | ✅     |
| `material/skills/`                                                  | example skills in Spanish (`acta-de-reunion`, `correo-ejecutivo`, `preparar-viaje`), one folder with `SKILL.md` each                                              | ✅     |
| `material/espacio-direccion/`                                       | Claude Code workspace template: `AGENTS.md`, `CLAUDE.md`, `.claude/` (settings, rules, skill, commands, a reviewer subagent)                                      | ✅     |
| `scripts/zip-skills.sh`, `public/descargas/`                        | packs `material/` into the zips the lessons link to                                                                                                               | ✅     |
| `Dockerfile`, `nginx.conf`, `docker-compose.yml`, `.dockerignore`   | build with pnpm, serve with unprivileged nginx on 8080; host port `TUTORIAL_IA_PORT` (3300)                                                                       | ✅     |
| `docs/adr/`                                                         | ADRs (index and template)                                                                                                                                         | ✅     |
| `specs/`                                                            | specs and task lists of changes (`curso-ia/`)                                                                                                                     | ✅     |

Dependency rules: `.claude/rules/architecture.md` and `.claude/rules/import-conventions.md`.

## `.claude/` map and agent config

| Path                                         | What it holds                                                                                           |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `.claude/settings.json`                      | team permissions: allowed checks, zip script and Docker rebuild, `.env` blocked                         |
| `.claude/rules/project-policies.md`          | what this is, content principles, commands, Docker rebuild rule, dependencies, language, what not to do |
| `.claude/rules/ai-collaboration.md`          | verify product claims, explain like a colleague, write for a non-technical learner, small commits       |
| `.claude/rules/architecture.md`              | layout, how lessons, exercises, simulations and downloads fit together, dependency rules                |
| `.claude/rules/content-authoring.md`         | (path-scoped to `src/content/`, `material/`) tone, structure, components, exercise rules, MDX pitfalls  |
| `.claude/rules/simulations.md`               | (path-scoped) pure tested logic, honest simplifications, the kit, tokens, accessibility and motion      |
| `.claude/rules/code-style.md`                | strict TypeScript, React, accessibility basics, lint/format, errors                                     |
| `.claude/rules/naming-conventions.md`        | files, lessons, exercise ids, sims, tokens                                                              |
| `.claude/rules/import-conventions.md`        | `@/` alias, feature public entries                                                                      |
| `.claude/rules/atomic-functions-solid.md`    | atomic functions and the SOLID that applies here                                                        |
| `.claude/rules/testing-conventions.md`       | Vitest, content consistency, simulation logic                                                           |
| `.claude/agents/content-reviewer.md`         | lesson reviewer (read-only, can search the web): accuracy, safety, usability, exercises, tone           |
| `.claude/agents/ts-reviewer.md`              | app reviewer (read-only): logic tests, boundaries, typed edges, React, a11y in sims                     |
| `.claude/agents/accessibility-reviewer.md`   | WCAG 2.2 AA reviewer (read-only)                                                                        |
| `.claude/agents/code-reviewer.md`            | generic reviewer (read-only): security, correctness, performance, maintainability                       |
| `.claude/commands/new-lesson.md`             | `/new-lesson <module> <topic>`: research official docs → outline → verified lesson                      |
| `.claude/commands/refresh-lesson.md`         | `/refresh-lesson <module>/<NN>`: re-check a lesson's product claims against today's docs                |
| `.claude/commands/create-pr.md`              | `/create-pr`: PR with `gh`, local checks, generated description                                         |
| `.claude/commands/new-adr.md`                | `/new-adr <title>`: ADR skeleton filled in with the author                                              |
| `.claude/workflows/spec-driven-phase.md`     | plan (and wait) → spec → tasks → implementation → tests → review → ADR                                  |
| `.claude/workflows/git-workflow.md`          | `main`/`develop`, branch naming, Conventional Commits                                                   |
| `.claude/workflows/architecture-decision.md` | when an ADR is needed and how to write one                                                              |
| `.claude/skills/frontend-design/`            | design guidance for new UI                                                                              |
| `.claude/skills/ui-ux-pro-max/`              | (link to `.agents/skills/`) UI/UX reference data and search scripts                                     |
