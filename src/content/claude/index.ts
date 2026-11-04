import { defineLesson } from "@/content/define-lesson";
import type { Subject } from "@/content/types";

const HELP = "https://support.claude.com";

/** Module 2: everything in Claude's interface, beyond typing and sending. */
export const claude: Subject = {
  slug: "claude",
  title: "Claude a fondo",
  code: "Módulo 2",
  tagline:
    "La interfaz entera, documentos y mini apps, proyectos, memoria y estilos, investigación con fuentes y Claude dentro de Chrome, Excel y PowerPoint.",
  lessons: [
    defineLesson({
      slug: "la-interfaz",
      title: "La interfaz, sin prisas",
      summary:
        "Dónde está cada cosa: herramientas, modelo, estilo, ajustes, y los pequeños gestos que ahorran tiempo.",
      minutes: 15,
      sources: [HELP, "https://claude.com/download"],
      exercises: ["donde-busqueda", "tour"],
      load: () => import("./01-la-interfaz.mdx"),
    }),
    defineLesson({
      slug: "artefactos-y-documentos",
      title: "Artefactos y documentos",
      summary:
        "Documentos y mini aplicaciones en un panel aparte, y Word, Excel, PowerPoint y PDF creados o editados de verdad.",
      minutes: 20,
      sources: [HELP],
      exercises: ["artefacto", "presentacion", "mini-app"],
      load: () => import("./02-artefactos-y-documentos.mdx"),
    }),
    defineLesson({
      slug: "proyectos",
      title: "Proyectos: el contexto que no repites",
      summary:
        "Instrucciones, conocimiento y chats; cómo escribir las instrucciones, qué subir y qué proyectos crear. Y su parecido con las Gems.",
      minutes: 25,
      sources: [HELP],
      exercises: ["donde-va", "mi-proyecto"],
      load: () => import("./03-proyectos.mdx"),
    }),
    defineLesson({
      slug: "memoria-y-personalizacion",
      title: "Memoria, preferencias y estilos",
      summary:
        "Lo que vale para todas tus conversaciones, cómo escribir con tu estilo y qué recuerda Claude de un chat a otro.",
      minutes: 15,
      sources: [HELP],
      exercises: ["que-va-donde", "incognito", "personalizar"],
      load: () => import("./04-memoria-y-personalizacion.mdx"),
    }),
    defineLesson({
      slug: "investigacion",
      title: "Buscar e investigar con fuentes",
      summary:
        "Búsqueda web para datos actuales, Investigación para informes con decenas de fuentes, y cómo comprobarlas.",
      minutes: 15,
      sources: [HELP],
      exercises: ["busqueda-o-investigacion", "verificar", "briefing"],
      load: () => import("./05-investigacion.mdx"),
    }),
    defineLesson({
      slug: "claude-en-tus-herramientas",
      title: "Claude en tus herramientas",
      summary:
        "Claude en Chrome, en Excel y PowerPoint, en Slack, y la app de escritorio y del móvil.",
      minutes: 15,
      sources: ["https://claude.com/claude-for-microsoft-365", "https://claude.com/download", HELP],
      exercises: ["donde-trabajar", "integraciones"],
      load: () => import("./06-claude-en-tus-herramientas.mdx"),
    }),
  ],
};
