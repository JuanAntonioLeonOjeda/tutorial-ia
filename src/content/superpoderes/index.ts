import { defineLesson } from "@/content/define-lesson";
import type { Subject } from "@/content/types";

const HELP = "https://support.claude.com";

/** Module 3: connectors (MCP), skills, agents (Cowork), scheduled tasks and recipes. */
export const superpoderes: Subject = {
  slug: "superpoderes",
  title: "Superpoderes",
  code: "Módulo 3",
  tagline:
    "Conectores para que vea tu correo y tu agenda, skills con tus procedimientos, Cowork para delegar tareas largas, automatizaciones y un recetario.",
  lessons: [
    defineLesson({
      slug: "conectores",
      title: "Conectores: tu correo, tu agenda, tus archivos",
      summary:
        "Qué es un conector (y MCP), los imprescindibles, cómo activarlos y cómo pedir con ellos sin riesgos.",
      minutes: 20,
      sources: [HELP, "https://modelcontextprotocol.io"],
      exercises: ["falta-conector", "conectar"],
      load: () => import("./01-conectores.mdx"),
    }),
    defineLesson({
      slug: "skills",
      title: "Skills: tus procedimientos, enseñados una vez",
      summary:
        "Qué es una skill, por qué la descripción lo es todo, cómo instalar las de ejemplo y cómo crear la tuya conversando.",
      minutes: 25,
      sources: [
        "https://academy.claude.com/courses/claude-101/working-with-skills",
        "https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview",
        HELP,
      ],
      exercises: ["descripcion", "instalar-skill", "crear-skill"],
      load: () => import("./02-skills.mdx"),
    }),
    defineLesson({
      slug: "cowork",
      title: "Cowork: delegar en un agente",
      summary:
        "Cómo trabaja un agente, qué es Cowork, qué encargos le van bien y cómo encargarlos con red.",
      minutes: 25,
      sources: [
        "https://claude.com/product/cowork",
        "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork",
      ],
      exercises: ["permiso", "primer-encargo"],
      load: () => import("./03-cowork.mdx"),
    }),
    defineLesson({
      slug: "automatizaciones",
      title: "Automatizaciones y tareas programadas",
      summary:
        "Cuándo, qué y dónde: tareas programadas en Cowork, sus reglas de oro y cuándo usar Power Automate o Zapier.",
      minutes: 20,
      sources: [
        "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork",
        "https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork",
      ],
      exercises: ["proxima", "borrador", "programar"],
      load: () => import("./04-automatizaciones.mdx"),
    }),
    defineLesson({
      slug: "recetario",
      title: "Recetario de la asistente de dirección",
      summary:
        "Ocho recetas que combinan todas las piezas: agenda, actas, fechas, bandeja, consejo, viajes, resúmenes y felicitaciones.",
      minutes: 20,
      sources: [HELP],
      exercises: ["receta-piezas", "mis-recetas"],
      load: () => import("./05-recetario.mdx"),
    }),
  ],
};
