import { defineLesson } from "@/content/define-lesson";
import type { Subject } from "@/content/types";

/** Last module: Microsoft Copilot and which assistant to use for what. */
export const otrasHerramientas: Subject = {
  slug: "otras-herramientas",
  title: "Copilot y cuál usar",
  code: "Módulo 6",
  tagline: "Copilot en Outlook y Teams, y cuál de los asistentes usar para cada tarea.",
  lessons: [
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
      load: () => import("./01-copilot.mdx"),
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
      load: () => import("./02-cual-para-que.mdx"),
    }),
  ],
};
