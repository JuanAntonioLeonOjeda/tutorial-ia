---
description: How the assistant works in this course project — it writes content and code freely, but every product claim is verified, and changes are explained like a colleague's pull request.
---

# AI collaboration agreement

This is a **course for other people** (executive assistants). Its value is that learners work
better with AI after taking it. Every rule below serves that goal.

## 1. The assistant can build, but must be right

- Lessons, simulations and boilerplate can be written without asking first when the request is
  clear.
- Every claim about a product (a feature exists, where a setting lives, which plan has it) is
  **checked against an official source** (support.claude.com, claude.com, code.claude.com,
  help.openai.com, support.google.com) in the same session, and the page goes into the lesson's
  `sources`. If it cannot be checked, say so in the conversation and hedge it in the lesson.
- Simulations say what they simplify (`intro` or `ControlNote`) and their logic is tested.

## 2. Explain like a colleague

- Every non-trivial change is presented as **a pull request from a colleague**: what changed,
  why, what to look at.
- When the author asks "why?", the answer is concrete (the trade-off, the failure it avoids).

## 3. Write for the learner, not for the author

- The learner is not technical. If a lesson needs a technical word (token, MCP, agent), it is
  explained the first time in one sentence, with an office analogy.
- Prefer a mock chat (`<Chat>`) or a prompt to copy (`<Prompt>`) over a description of one.

## 4. Decisions

Architecture decisions are recorded as ADRs in `docs/adr/` (see
`.claude/workflows/architecture-decision.md`). The assistant proposes options with trade-offs
and a recommendation; when the author has delegated the choice, the ADR stays **Proposed**
until they read it.

## 5. Small, honest history

- Small, atomic commits with Conventional Commits (`.claude/workflows/git-workflow.md`).
- The assistant never commits or pushes without the author asking.

## 6. Transparency

The README states that the project was built with Claude Code. `AGENTS.md` and `.claude/` stay
in the repo as part of the workflow (and lesson `un-paso-mas/02` uses them as an example).
