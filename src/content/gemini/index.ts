import { defineLesson } from "@/content/define-lesson";
import type { Subject } from "@/content/types";

const HELP = "https://support.google.com/gemini/answer";

/** The captures in these lessons: gemini.google.com in Spanish (Google AI Pro), checked on screen that day. */
const UI_CAPTURE =
  "Interfaz de gemini.google.com en español (Google AI Pro), capturada el 6 de noviembre de 2026";

/** Module 5: Gemini and Google Workspace in depth. */
export const gemini: Subject = {
  slug: "gemini",
  title: "Gemini y Google Workspace a fondo",
  code: "Módulo 5",
  tagline:
    "La app y sus planes, de las Gems a las skills, Gemini dentro de Gmail y Meet, Deep Research y Canvas, Gemini Notebook y automatizar con Workspace Studio.",
  lessons: [
    defineLesson({
      slug: "la-app-de-gemini",
      title: "La app de Gemini: modelos, planes y cuentas",
      summary:
        "Dónde está cada cosa, Flash, Pro y Argon, los planes de Google AI y la diferencia que más importa: cuenta personal o de trabajo.",
      minutes: 15,
      sources: [
        `${HELP}/18648722?hl=en`,
        `${HELP}/16275805?hl=en`,
        "https://gemini.google/subscriptions/",
        `${HELP}/14620100?hl=en`,
        UI_CAPTURE,
      ],
      exercises: ["cuenta-gemini", "tour-gemini"],
      load: () => import("./01-la-app-de-gemini.mdx"),
    }),
    defineLesson({
      slug: "instrucciones-y-skills",
      title: "Instrucciones y de las Gems a las skills",
      summary:
        "Tus instrucciones para Gemini, las fechas en que las Gems pasan a skills y cómo crear skills (o subir las que ya tienes de Claude).",
      minutes: 20,
      sources: [
        `${HELP}/16598623?hl=en`,
        `${HELP}/16598625?hl=en`,
        `${HELP}/18560919?hl=en`,
        `${HELP}/17094296`,
        `${HELP}/15146780?hl=en`,
        UI_CAPTURE,
      ],
      exercises: ["gem-o-skill", "skill-en-gemini"],
      load: () => import("./02-instrucciones-y-skills.mdx"),
    }),
    defineLesson({
      slug: "gemini-en-workspace",
      title: "Gemini dentro de Gmail, Docs, Sheets y Meet",
      summary:
        "Resumir, redactar y buscar en Gmail; Calendar, Docs, Sheets y Drive; y «Tomar notas por mí» en Meet, con sus cautelas.",
      minutes: 20,
      sources: [
        "https://support.google.com/mail/answer/14199860?hl=en",
        "https://support.google.com/meet/answer/14754931?hl=en",
        `${HELP}/14620100?hl=en`,
        "https://workspace.google.com/blog/product-announcements/august-2026-workspace-feature-drop",
        UI_CAPTURE,
      ],
      exercises: ["notas-meet", "gemini-gmail"],
      load: () => import("./03-gemini-en-workspace.mdx"),
    }),
    defineLesson({
      slug: "deep-research-y-canvas",
      title: "Deep Research y Canvas",
      summary:
        "Investigar con fuentes, también en tu Gmail y tu Drive, y crear documentos y presentaciones que exportas a Docs y Slides.",
      minutes: 20,
      sources: [`${HELP}/15719111?hl=en`, `${HELP}/16047321?hl=en`, UI_CAPTURE],
      exercises: ["canvas-o-docs", "investigar-gemini"],
      load: () => import("./04-deep-research-y-canvas.mdx"),
    }),
    defineLesson({
      slug: "gemini-notebook",
      title: "Gemini Notebook (antes NotebookLM)",
      summary:
        "Preguntar solo a tus documentos con citas, resúmenes en audio en español, cuadernos en la app de Gemini y compartir con cuidado.",
      minutes: 15,
      sources: [
        "https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/",
        "https://workspaceupdates.googleblog.com/2026/07/notebooklm-now-gemini-notebook.html",
        "https://support.google.com/notebooklm/answer/17003757?hl=en",
        "https://support.google.com/gemininotebook/answer/16212820?hl=en",
      ],
      exercises: ["notebook-o-gemini", "cuaderno-actas"],
      load: () => import("./05-gemini-notebook.mdx"),
    }),
    defineLesson({
      slug: "automatizar",
      title: "Automatizar: acciones programadas, Workspace Studio y el modo Tarea",
      summary:
        "Programar peticiones en la app, crear agentes sin código en Workspace Studio y por qué el modo Tarea aún no llega a España.",
      minutes: 20,
      sources: [
        `${HELP}/16316416?hl=en`,
        "https://workspaceupdates.googleblog.com/2025/12/workspace-studio.html",
        "https://support.google.com/workspace-studio/",
        `${HELP}/17094507?hl=en`,
        UI_CAPTURE,
      ],
      exercises: ["programada-o-studio", "automatizar-gemini"],
      load: () => import("./06-automatizar.mdx"),
    }),
  ],
};
