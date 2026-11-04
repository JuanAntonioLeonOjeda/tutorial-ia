import type { MDXContent } from "mdx/types";
import type { ComponentType } from "react";

export type SubjectSlug =
  "fundamentos" | "claude" | "superpoderes" | "otras-herramientas" | "un-paso-mas";

export interface Lesson {
  slug: string;
  title: string;
  /** One line shown in lists: what you will understand after reading it. */
  summary: string;
  minutes: number;
  /** Official help pages and docs this lesson is based on (checked when written). */
  sources: readonly string[];
  /** Exercise ids in the lesson, so progress can be counted without loading it. */
  exercises: readonly string[];
  load: () => Promise<{ default: MDXContent }>;
  /** `load` wrapped in React.lazy once, at definition time (see `defineLesson`). */
  Component: ComponentType;
}

export interface Subject {
  slug: SubjectSlug;
  title: string;
  /** Short, plain-language pitch shown on the home page. */
  tagline: string;
  /** Short label shown above the title on the home page ("Módulo 1"…). */
  code: string;
  lessons: readonly Lesson[];
}
