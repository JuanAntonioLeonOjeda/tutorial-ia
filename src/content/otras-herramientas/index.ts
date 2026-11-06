import { defineLesson } from "@/content/define-lesson";
import type { Subject } from "@/content/types";

/** Last module: Gemini (until it gets its own module), Microsoft Copilot and which one to use for what. */
export const otrasHerramientas: Subject = {
  slug: "otras-herramientas",
  title: "Gemini, Copilot y cuál usar",
  code: "Módulo 5",
  tagline: "Gemini y NotebookLM, Copilot en Outlook y Teams, y cuál usar para qué.",
  lessons: [
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
        "https://support.google.com/gemini/answer/17094507?hl=en",
        "https://support.google.com/gemini/answer/18560919?hl=en",
      ],
      exercises: ["notebooklm", "gem-mejorada"],
      load: () => import("./01-gemini.mdx"),
    }),
    defineLesson({
      slug: "copilot",
      title: "Copilot en Outlook y Teams",
      summary:
        "Los dos Copilots, resumir, redactar y convocar en Outlook, el buzón delegado, las reuniones de Teams y Copilot Cowork.",
      minutes: 20,
      sources: [
        "https://support.microsoft.com/en-us/microsoft-365-copilot/how-copilot-chat-works-with-and-without-a-microsoft-365-copilot-license",
        "https://support.microsoft.com/en-us/outlook/copilot-pages/summarize-an-email-thread-with-copilot-in-outlook",
        "https://support.microsoft.com/en-us/outlook/frequently-asked-questions-about-copilot-in-outlook",
        "https://learn.microsoft.com/en-us/training/modules/from-inbox-impact-improve-your-email-workflows-ai/",
        "https://support.microsoft.com/en-us/microsoft-365-copilot/use-copilot-in-shared-mailboxes-and-delegate-mailboxes",
        "https://support.microsoft.com/en-us/teams/copilot/use-copilot-without-transcribing-or-recording-a-teams-meeting-or-call",
        "https://support.microsoft.com/en-us/outlook/sharing/shared-delegated-mailboxes-copilot-chat-outlook",
        "https://www.microsoft.com/en-us/copilot/blog/2026/03/09/copilot-cowork-a-new-way-of-getting-work-done/",
        "https://www.microsoft.com/en-us/copilot/blog/2026/06/16/copilot-cowork-is-now-generally-available/",
        "https://learn.microsoft.com/en-us/microsoft-365/copilot/responsible-ai/copilot-cowork-application-card",
        "https://www.vimcal.com/ea/2026-report",
      ],
      exercises: ["que-copilot", "copilot-outlook"],
      load: () => import("./02-copilot.mdx"),
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
        "https://support.microsoft.com/en-us/microsoft-365-copilot/how-copilot-chat-works-with-and-without-a-microsoft-365-copilot-license",
      ],
      exercises: ["elegir", "mi-mapa"],
      load: () => import("./03-cual-para-que.mdx"),
    }),
  ],
};
