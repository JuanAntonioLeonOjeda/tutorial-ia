# ADR-0002: Hands-on exercises happen in the real assistant

- **Status:** Accepted
- **Date:** 2026-11-04

## Context

The study app checks exercises by running Python in the browser. Here the skill being learned
is using Claude, ChatGPT and Gemini, which cannot run inside the page: they need the learner's
own account, connectors and data. Learners are not technical, and the products change their
interface every few weeks.

## Options considered

### Option A — `Practice`: a checklist done in the real tool, plus a worked example

- Pros: the learner practises with their own account, data and plan; nothing to keep in sync with the
  products; the worked example shows what "good" looks like.
- Cons: completion is self-reported; nothing checks the result.

### Option B — Call an AI API from the page and grade the answer

- Pros: automatic feedback on prompts.
- Cons: needs a backend or an API key in the browser (ADR-0001), costs money, and still does
  not teach the real interface (projects, connectors, Cowork).

### Option C — Screenshots of each step

- Pros: very concrete.
- Cons: outdated within weeks; heavy; not accessible.

## Decision

Option A for hands-on work, with `Quiz` and `Predict` for what can be checked in the page, and
mock chats (`Chat`), copyable prompts (`Prompt`) and menu breadcrumbs (`MenuPath`) instead of
screenshots.

## Consequences

- Easier: lessons survive interface changes if they describe ideas and hedge menu paths.
- Harder: menu paths still drift; `/refresh-lesson` exists to re-check them.
- Revisit if: learners ask for automatic feedback on their prompts.
