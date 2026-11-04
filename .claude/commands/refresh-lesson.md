---
description: Re-check a lesson against today's official docs (AI products change monthly) and propose the edits that are now needed
argument-hint: <module-slug>/<NN> or a module slug for all its lessons
allowed-tools: Read, Grep, Glob, WebSearch, WebFetch
---

# Refresh: $ARGUMENTS

AI products rename and move features every few weeks. This command finds what in a lesson is
no longer true. Do not edit files: report, then wait for the author.

1. Read the lesson(s) and their `sources` in `src/content/<module>/index.ts`.
2. List every product claim: feature names, menu paths (`<MenuPath>`), plans, limits,
   commands, file formats.
3. Check each one against the official pages (start with the lesson's `sources`). Record the
   page and date you checked.
4. Report a table: claim · still true / changed / gone / could not verify · source · the
   proposed new wording. Then list new features in the same area worth a mention.
5. Ask the author which changes to apply; apply them with `/new-lesson`'s verification steps.
