import { defineLesson } from "@/content/define-lesson";
import type { Subject } from "@/content/types";

/** Module 4: the same ideas in ChatGPT and Gemini, and which one to use for what. */
export const otrasHerramientas: Subject = {
  slug: "otras-herramientas",
  title: "ChatGPT y Gemini",
  code: "Módulo 4",
  tagline:
    "Las mismas piezas con otros nombres: GPTs, Gems, NotebookLM y Gemini dentro de Workspace, y cuál usar para qué.",
  lessons: [
    defineLesson({
      slug: "chatgpt",
      title: "ChatGPT, traducido",
      summary:
        "Personalización, proyectos, GPTs, Canvas, investigación, aplicaciones, tareas y agente: el diccionario desde Claude.",
      minutes: 15,
      sources: ["https://help.openai.com"],
      exercises: ["gpt-o-proyecto", "traducir-gpt"],
      load: () => import("./01-chatgpt.mdx"),
    }),
    defineLesson({
      slug: "gemini",
      title: "Gemini, Gems y NotebookLM",
      summary:
        "Gems bien hechas, Gemini dentro de Gmail, Docs, Sheets y Meet, y NotebookLM para preguntar solo a tus documentos.",
      minutes: 20,
      sources: [
        "https://support.google.com/gemini",
        "https://workspaceupdates.googleblog.com/2026/01/take-notebooks-further-notebooklm-gemini.html",
        "https://notebooklm.google",
      ],
      exercises: ["notebooklm", "gem-mejorada"],
      load: () => import("./02-gemini.mdx"),
    }),
    defineLesson({
      slug: "cual-para-que",
      title: "Cuál usar para qué",
      summary:
        "El criterio que manda (dónde están tus datos), en qué destaca cada uno hoy y tu propio mapa de herramientas.",
      minutes: 10,
      sources: [
        "https://support.claude.com",
        "https://help.openai.com",
        "https://support.google.com/gemini",
      ],
      exercises: ["elegir", "mi-mapa"],
      load: () => import("./03-cual-para-que.mdx"),
    }),
  ],
};
