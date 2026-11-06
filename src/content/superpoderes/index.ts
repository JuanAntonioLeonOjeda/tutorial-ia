import { defineLesson } from "@/content/define-lesson";
import type { Subject } from "@/content/types";

const HELP = "https://support.claude.com";

/** The captures in these lessons: claude.ai in Spanish, checked on screen that day. */
const UI_CAPTURE = "Interfaz de claude.ai en español, capturada el 6 de noviembre de 2026";

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
      sources: [
        `${HELP}/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities`,
        `${HELP}/en/articles/10166901-use-google-workspace-connectors`,
        "https://modelcontextprotocol.io",
        `${HELP}/en/articles/12542951-set-up-the-microsoft-365-connector`,
        "https://support.microsoft.com/en-us/microsoft-365-copilot/use-copilot-in-shared-mailboxes-and-delegate-mailboxes",
        UI_CAPTURE,
      ],
      exercises: ["falta-conector", "delegacion", "conectar"],
      load: () => import("./01-conectores.mdx"),
    }),
    defineLesson({
      slug: "skills",
      title: "Skills: tus procedimientos, enseñados una vez",
      summary:
        "Qué es una skill, por qué la descripción lo es todo, cómo instalar las de ejemplo y cómo crear la tuya conversando.",
      minutes: 25,
      sources: [
        `${HELP}/en/articles/12512180-use-skills-in-claude`,
        `${HELP}/en/articles/12512198-how-to-create-custom-skills`,
        "https://academy.claude.com/courses/claude-101/working-with-skills",
        "https://learn.deeplearning.ai/courses/agent-skills-with-anthropic",
        "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices",
        "https://claude.com/blog/cowork-plugins",
        UI_CAPTURE,
      ],
      exercises: ["descripcion", "instalar-skill", "crear-skill"],
      load: () => import("./02-skills.mdx"),
    }),
    defineLesson({
      slug: "cowork",
      title: "Cowork: delegar en un agente",
      summary:
        "Cómo trabaja un agente, qué es Cowork, los modos de aprobación, qué encargos le van bien y cómo encargarlos con red.",
      minutes: 25,
      sources: [
        `${HELP}/en/articles/13345190-get-started-with-claude-cowork`,
        `${HELP}/en/articles/16761823-claude-cowork-and-chat-are-one-claude`,
        `${HELP}/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile`,
        `${HELP}/en/articles/13364135-use-claude-cowork-safely`,
        "https://claude.com/product/cowork",
        "https://academy.claude.com/courses/ai-fluency-framework-foundations",
        "https://www.vimcal.com/ea/2026-report",
        UI_CAPTURE,
      ],
      exercises: ["permiso", "primer-encargo"],
      load: () => import("./03-cowork.mdx"),
    }),
    defineLesson({
      slug: "automatizaciones",
      title: "Automatizaciones y tareas programadas",
      summary:
        "Cuándo, qué y dónde: tareas programadas en Claude, sus reglas de oro y cuándo usar Power Automate o Zapier.",
      minutes: 20,
      sources: [
        `${HELP}/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork`,
        `${HELP}/en/articles/13345190-get-started-with-claude-cowork`,
        UI_CAPTURE,
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
