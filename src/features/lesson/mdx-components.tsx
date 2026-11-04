import type { MDXComponents } from "mdx/types";

import { Practice, Predict, Quiz } from "@/features/exercises";
import { illustrations } from "@/features/illustrations";
import { simulations } from "@/features/simulations";
import { Callout, Chat, Figure, MenuPath, Prompt } from "@/features/ui";

/**
 * Everything a lesson can use without importing it. Authoring rules for these live in
 * `.claude/rules/content-authoring.md`.
 */
export const mdxComponents: MDXComponents = {
  Callout,
  Chat,
  Figure,
  MenuPath,
  Prompt,
  Quiz,
  Predict,
  Practice,
  ...illustrations,
  ...simulations,
};
