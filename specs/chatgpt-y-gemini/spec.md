# Spec: ChatGPT and Gemini in depth

Date: 2026-11-06. Branch: `content/chatgpt-y-gemini-a-fondo`.

## Problem

Module 4 covers ChatGPT and Gemini in one lesson each, as a dictionary from Claude. Learners
use them at work too (ChatGPT is the most used AI tool among assistants in the 2026 Vimcal
survey), and both changed deeply in 2026:

- OpenAI retires custom **GPTs** (no new ones on personal plans; standard retirement
  11 Dec 2026) in favour of **plugins** and **skills**; ChatGPT **Work** replaced agent mode;
  **dots** (29 Sep 2026) are persistent personal agents (Pro, Business Premium, Enterprise beta).
- Google turns **Gems** into **skills** (personal accounts from Nov 2026, work accounts in
  2027); Deep Research reads Gmail and Drive; **Workspace Studio** builds agents and flows;
  Task mode is not available in the EU/EEA.

The current lessons recommend creating GPTs and Gems: wrong from now on.

## Scope

- Two new modules with the depth of "Claude a fondo":
  - Module 4 `chatgpt` — "ChatGPT a fondo": interface/models/plans; instructions, memory and
    projects; from GPTs to skills and plugins; files, search, deep research, images, voice and
    Record; connected apps and scheduled tasks; Work and workspace agents; dots.
  - Module 5 `gemini` — "Gemini y Google Workspace a fondo": the app, models, plans and
    account types; personalization, memory and from Gems to skills; Gemini in Gmail, Calendar,
    Docs, Sheets, Drive and Meet; Deep Research and Canvas; NotebookLM; automation (scheduled
    actions, Workspace Studio, Task mode).
- Module 6 `otras-herramientas` keeps Copilot and "cuál usar para qué" (title changes).
- Redirects from `/otras-herramientas/chatgpt` and `/otras-herramientas/gemini` to the new
  modules (progress on those two lessons is not migrated: two marks at most).
- New subject hues and icons; README, AGENTS.md, home lead.
- Captures of chatgpt.com and gemini.google.com from the author's free accounts, Spanish UI,
  fictional data on screen (author agreed). Paid-only features: text and mock chats, hedged.

## Out of scope

- New simulations (existing ones are referenced where they fit).
- Copilot captures (no Microsoft account).

## Acceptance criteria

- Given the home page, then it lists six modules in order: Fundamentos, Claude, Superpoderes,
  ChatGPT, Gemini, Copilot y cuál usar.
- Given `/otras-herramientas/chatgpt`, then the app navigates to the first ChatGPT lesson.
- Given any new lesson, then every product claim is in an official page listed in `sources`
  (help.openai.com, openai.com, support.google.com, workspace.google.com, blog.google,
  gemini.google) or hedged; plan-dependent features say so.
- No lesson recommends creating a new GPT or Gem without the retirement notice.
- Every lesson follows `content-authoring.md` (real-office callout, practice, "Para llevar").
- Lint, typecheck, tests, build pass; Docker rebuilt.

## Open questions

None. Author decisions (2026-11-06): two new modules; captures from the author's free accounts;
"dots" means OpenAI dots.
