import { defineLesson } from "@/content/define-lesson";
import type { Subject } from "@/content/types";

/** Optional section: Claude Code, the .claude/ folder and connectors added by hand. */
export const unPasoMas: Subject = {
  slug: "un-paso-mas",
  title: "Un paso más",
  code: "Opcional",
  tagline:
    "Claude Code desde el terminal, la carpeta .claude (AGENTS.md, reglas, skills, comandos y subagentes) y conectores MCP añadidos a mano.",
  lessons: [
    defineLesson({
      slug: "claude-code-sin-miedo",
      title: "Claude Code sin miedo",
      summary:
        "El terminal en cinco minutos, instalar y arrancar Claude Code, permisos y tu primera sesión sobre una carpeta.",
      minutes: 25,
      sources: [
        "https://code.claude.com/docs/en/overview",
        "https://code.claude.com/docs/en/quickstart",
      ],
      exercises: ["carpeta", "primera-sesion"],
      load: () => import("./01-claude-code-sin-miedo.mdx"),
    }),
    defineLesson({
      slug: "la-carpeta-claude",
      title: "La carpeta .claude y AGENTS.md",
      summary:
        "Tu asistente configurado con archivos de texto: índice, permisos, reglas, skills, comandos y subagentes, con una plantilla para descargar.",
      minutes: 30,
      sources: [
        "https://agents.md",
        "https://code.claude.com/docs/en/memory",
        "https://code.claude.com/docs/en/settings",
        "https://code.claude.com/docs/en/sub-agents",
      ],
      exercises: ["que-archivo", "deny", "mi-espacio"],
      load: () => import("./02-la-carpeta-claude.mdx"),
    }),
    defineLesson({
      slug: "conectores-a-mano",
      title: "Conectores MCP a mano",
      summary:
        "Conectores del directorio, remotos por URL y locales; cómo añadirlos en la app y en Claude Code, y qué preguntar antes.",
      minutes: 20,
      sources: ["https://modelcontextprotocol.io", "https://code.claude.com/docs/en/mcp"],
      exercises: ["tipo-conector", "conector-manual"],
      load: () => import("./03-conectores-a-mano.mdx"),
    }),
  ],
};
