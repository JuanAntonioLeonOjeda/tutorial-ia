# Spec: interface captures and the 2026 agent landscape

Date: 2026-11-06. Branch: `feature/capturas-y-agentes`.

## Problem

1. Lessons describe where things are on screen in words only. A learner who is not technical
   needs to **see** the button: a real capture with the zone boxed.
2. The course was written before several changes and misses topics that executive assistants
   are using today (research on 2026-11-06: EdTeam's "Agentes de IA para todos" video, Claude
   Academy, DeepLearning.AI "Agent Skills with Anthropic", EA profession reports, official help
   pages):
   - OpenAI retired ChatGPT agent and the Atlas browser (9 Aug 2026); **ChatGPT Work** replaces
     them. Lesson `otras-herramientas/01` still describes "modo agente" (severity: highest).
   - The Spanish claude.ai interface moved things: personal instructions live in
     **Ajustes → Cuenta → Instrucciones para Claude**; skills/connectors/plugins live in the
     sidebar page **Personalización**; adding a skill is **Añadir → Subir Skill / Crear una
     Skill / Crear con Claude**; Cowork approval modes are **Aprobar manualmente / Aprobar
     automáticamente / Omitir todas las aprobaciones**.
   - Missing topics: Microsoft Copilot (used by ~43 % of assistants per the 2026 EA report),
     Claude for Microsoft 365 / Outlook, the risk of malicious content steering an agent
     (prompt injection), working on your manager's mailbox (delegated access), subagents and the
     assistant's new role (supervising agents), the "levels of agents" framing and where agents
     live, sharing skills and plugins with the team, skill reference files and descriptions,
     and Anthropic's 4D AI Fluency framework (Delegation, Description, Discernment, Diligence).

## Scope

- `<Screenshot src alt width height date marks caption>` in `features/ui`: real capture from
  `public/capturas/`, boxes and numbered badges drawn as SVG over it (editable, not baked in),
  date shown, links to full size. Marks in image pixels.
- Captures of claude.ai only (the author has only Claude on this computer), taken in Spanish
  and light theme from the author's session, with history titles, name and e-mail replaced
  on screen by the fictional cast before capturing (nothing saved to the account). The author
  approved switching language/theme and reverting afterwards.
- ChatGPT, Gemini, Copilot and desktop-only screens (Cowork folders, Excel/Outlook add-ins):
  no captures; text, mock chats and hedged menu paths.
- Content changes listed in `tasks.md`, each product claim checked against official pages in
  this session and added to `sources`.

## Out of scope

- Captures of ChatGPT, Gemini or Microsoft apps.
- Image processing in the build (captures are committed JPEGs, ~40–150 KB each).

## Acceptance criteria

- Given a lesson with `<Screenshot>`, when it renders, then the image shows with its boxes over
  the right zones at any column width, the date is visible and the image opens at full size.
- Given any `<Screenshot>` in the content, then its file exists in `public/capturas/`, it has a
  `date` and a meaningful `alt` (content test).
- Given the Pages build (`BASE_PATH=/tutorial-ia/`), then capture URLs include the base.
- Given lesson `otras-herramientas/01`, then it no longer presents ChatGPT agent or Atlas as
  current, and it explains ChatGPT Work with a hedge on availability.
- Given every menu path in modules 2 and 3, then it matches the Spanish interface captured on
  2026-11-06 or is hedged.
- `pnpm lint && pnpm typecheck && pnpm test && pnpm build` pass; Docker image rebuilt.

## Open questions

None. Decisions taken with the author: captures from the author's session with fictional data
(answer 1), only Claude available (answer 2), include every content item (answer 3).
