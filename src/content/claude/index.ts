import { defineLesson } from "@/content/define-lesson";
import type { Subject } from "@/content/types";

const HELP = "https://support.claude.com";

/** Module 2: everything in Claude's interface, beyond typing and sending. */
export const claude: Subject = {
  slug: "claude",
  title: "Claude a fondo",
  code: "Módulo 2",
  tagline:
    "La interfaz, modelos y límites de uso, documentos y mini apps, proyectos, instrucciones y memoria, investigación con fuentes y Claude dentro de Chrome, Excel y Google Docs.",
  lessons: [
    defineLesson({
      slug: "la-interfaz",
      title: "La interfaz, sin prisas",
      summary:
        "Dónde está cada cosa: el botón +, el menú del modelo, Ajustes y Personalizar, y los pequeños gestos que ahorran tiempo.",
      minutes: 15,
      sources: [
        `${HELP}/en/articles/16761823-claude-cowork-and-chat-are-one-claude`,
        `${HELP}/en/articles/10185728-understanding-claude-s-personalization-features`,
        "https://claude.com/download",
      ],
      exercises: ["donde-busqueda", "tour"],
      load: () => import("./01-la-interfaz.mdx"),
    }),
    defineLesson({
      slug: "modelos-y-limites",
      title: "Modelos, esfuerzo y límites de uso",
      summary:
        "Qué modelo y cuánto esfuerzo para cada tarea, cómo funcionan los límites de uso y cómo estirarlos.",
      minutes: 20,
      sources: [
        `${HELP}/en/articles/8664678-change-the-model-effort-and-thinking-settings`,
        `${HELP}/en/articles/11647753-how-do-usage-and-length-limits-work`,
        `${HELP}/en/articles/9797557-usage-limit-best-practices`,
      ],
      exercises: ["modelo-correo", "sesion", "comparar-modelos"],
      load: () => import("./02-modelos-y-limites.mdx"),
    }),
    defineLesson({
      slug: "artefactos-y-documentos",
      title: "Artefactos y documentos",
      summary:
        "Documentos y mini aplicaciones en un panel aparte, y Word, Excel, PowerPoint y PDF creados o editados de verdad.",
      minutes: 20,
      sources: [
        `${HELP}/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them`,
        `${HELP}/en/articles/12111783-create-and-edit-files-with-claude`,
      ],
      exercises: ["artefacto", "presentacion", "mini-app"],
      load: () => import("./03-artefactos-y-documentos.mdx"),
    }),
    defineLesson({
      slug: "proyectos",
      title: "Proyectos: el contexto que no repites",
      summary:
        "Instrucciones, conocimiento y chats; cómo escribir las instrucciones, qué subir y qué proyectos crear. Y su parecido con las Gems.",
      minutes: 25,
      sources: [`${HELP}/en/articles/9519177-how-can-i-create-and-manage-projects`],
      exercises: ["donde-va", "mi-proyecto"],
      load: () => import("./04-proyectos.mdx"),
    }),
    defineLesson({
      slug: "memoria-y-personalizacion",
      title: "Instrucciones y memoria",
      summary:
        "Lo que vale para todas tus conversaciones, cómo hacer que escriba como tú y qué recuerda Claude de un chat a otro.",
      minutes: 15,
      sources: [
        `${HELP}/en/articles/10185728-understanding-claude-s-personalization-features`,
        `${HELP}/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context`,
        `${HELP}/en/articles/12260368-use-incognito-chats`,
      ],
      exercises: ["que-va-donde", "incognito", "personalizar"],
      load: () => import("./05-memoria-y-personalizacion.mdx"),
    }),
    defineLesson({
      slug: "investigacion",
      title: "Buscar e investigar con fuentes",
      summary:
        "Búsqueda web para datos actuales, Investigación para informes con decenas de fuentes, y cómo comprobarlas.",
      minutes: 15,
      sources: [
        `${HELP}/en/articles/11088861-use-research-on-claude`,
        `${HELP}/en/articles/10684626-enable-and-use-web-search`,
      ],
      exercises: ["busqueda-o-investigacion", "verificar", "briefing"],
      load: () => import("./06-investigacion.mdx"),
    }),
    defineLesson({
      slug: "claude-en-tus-herramientas",
      title: "Claude en tus herramientas",
      summary:
        "Claude en Chrome, en Excel y PowerPoint, en Google Docs y Sheets, en Slack, y la app de escritorio y del móvil.",
      minutes: 15,
      sources: [
        "https://claude.com/claude-in-chrome",
        "https://claude.com/claude-for-microsoft-365",
        `${HELP}/en/articles/16951679-use-claude-in-google-docs-sheets-and-slides`,
      ],
      exercises: ["donde-trabajar", "integraciones"],
      load: () => import("./07-claude-en-tus-herramientas.mdx"),
    }),
  ],
};
