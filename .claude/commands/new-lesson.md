---
description: Write a new lesson (or rewrite one) following the authoring rules, with every product claim checked against official sources
argument-hint: <module-slug> <topic>
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, WebSearch, WebFetch
---

# New lesson: $ARGUMENTS

Follow `.claude/rules/content-authoring.md`.

1. Research the topic in the official help pages (support.claude.com, claude.com,
   code.claude.com, help.openai.com, support.google.com). Note what exists today, its name,
   where it lives and which plans have it. Keep the notes in the scratchpad, not in the repo.
2. Propose to the author, in Spanish and briefly: the lesson outline (`##` sections), the office
   situations it uses as examples, which simulations (existing or a new one explained in one
   line), the quick questions and the practices. **Wait for confirmation** if the lesson is
   new; go ahead if it is a rewrite the author asked for.
3. Write `src/content/<module>/NN-<slug>.mdx` and add the lesson to
   `src/content/<module>/index.ts` (with `sources` and `exercises` in order).
4. If a new simulation is needed, follow `.claude/rules/simulations.md` and test its logic in
   `curso.test.ts`. If the lesson offers a download, add it to `material/` and run
   `./scripts/zip-skills.sh`.
5. Verify: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.
6. Run the `content-reviewer` agent and fix or explicitly accept its findings.
7. Rebuild the Docker image and give the author the URL of the lesson.
