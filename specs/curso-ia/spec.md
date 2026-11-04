# Spec: "Aprende IA", a course for an executive assistant

## What it solves

Executive assistants (asistentes de dirección) often use Claude, ChatGPT and Gemini as regular
users, and may have tried custom Gems, but do not know the features that would help most at
work. They are not programmers. The course teaches those features step by step, in the format
and teaching method of the author's study app (`../master/repaso`): plain-language lessons,
simulations, exercises with hints, and the same `AGENTS.md` / `.claude/` setup.

## Scope

- Platform reused from `repaso`, without Python, KaTeX or the TFM (ADR-0001, ADR-0002).
- Four modules and an optional section:
  1. **Fundamentos** (4): how it works, prompts, files/images/voice, safe use.
  2. **Claude a fondo** (6): interface, artifacts and files, projects, memory/styles,
     research, Claude in Chrome/Excel/PowerPoint.
  3. **Superpoderes** (5): connectors (MCP), skills, Cowork, scheduled tasks, recipes.
  4. **ChatGPT y Gemini** (3): ChatGPT translated, Gemini/Gems/NotebookLM, which for what.
  5. **Un paso más** (3, optional, with code): Claude Code, the `.claude/` folder and
     `AGENTS.md`, MCP by hand.
- New components: `Practice`, `Chat`, `Prompt`, `MenuPath`.
- Six simulations: context window, prompt builder, connectors, skill triggering, an agent run
  with an approval step, a scheduled-task builder.
- Downloads: three example skills and a Claude Code workspace template (ADR-0004).

## Out of scope

- Calling any AI API from the page.
- Screenshots of products (they go stale; ADR-0002).
- Microsoft Copilot beyond a mention (the course centres on Claude).

## Acceptance criteria

- Given the home page, it shows the four modules and "Un paso más" with lesson counts and
  progress.
- Given any lesson, the content tests pass: file names, exercise ids, simulations used,
  practices with steps and example, "Para llevar" at the end.
- Given a practice, "Lo he hecho" is enabled only when every step is ticked, and it counts as a
  solved exercise.
- Given a download link, the zip contains one folder with a valid `SKILL.md` (or the workspace).

## Open questions

- Which plan and features a learner's company has enabled (Cowork, connectors, skills): lessons
  give fallbacks.
