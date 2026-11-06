import { defineLesson } from "@/content/define-lesson";
import type { Subject } from "@/content/types";

const HELP = "https://help.openai.com/en/articles";

/** The captures in these lessons: chatgpt.com in Spanish (free plan), checked on screen that day. */
const UI_CAPTURE =
  "Interfaz de chatgpt.com en español (plan Gratis), capturada el 6 de noviembre de 2026";

/** Module 4: ChatGPT in depth, from the interface to agents (Work, workspace agents, dots). */
export const chatgpt: Subject = {
  slug: "chatgpt",
  title: "ChatGPT a fondo",
  code: "Módulo 4",
  tagline:
    "La interfaz y los planes, instrucciones, memoria y proyectos, la retirada de los GPTs, investigación y Record, apps y tareas programadas, Work y los dots.",
  lessons: [
    defineLesson({
      slug: "interfaz-modelos-y-planes",
      title: "La interfaz, los modelos y los planes",
      summary:
        "Dónde está cada cosa, qué es Instant, Thinking o Pro y qué cambia entre Gratis, Go, Plus, Pro y los planes de empresa.",
      minutes: 15,
      sources: [
        `${HELP}/20001354-gpt-6-and-other-models-in-chatgpt`,
        "https://chatgpt.com/es-ES/pricing/",
        `${HELP}/20001275-chatgpt-work-and-codex`,
        `${HELP}/8096356-chatgpt-custom-instructions`,
        UI_CAPTURE,
      ],
      exercises: ["esfuerzo-chatgpt", "tour-chatgpt"],
      load: () => import("./01-interfaz-modelos-y-planes.mdx"),
    }),
    defineLesson({
      slug: "instrucciones-memoria-y-proyectos",
      title: "Instrucciones, memoria y proyectos",
      summary:
        "Las instrucciones personalizadas, una memoria que te dice de dónde saca cada cosa y proyectos con memoria propia que se comparten.",
      minutes: 20,
      sources: [
        `${HELP}/8096356-chatgpt-custom-instructions`,
        `${HELP}/8590148-memory-faq`,
        `${HELP}/10169521-projects-in-chatgpt`,
        `${HELP}/6825453-chatgpt-release-notes`,
        UI_CAPTURE,
      ],
      exercises: ["instrucciones-o-proyecto", "proyecto-chatgpt"],
      load: () => import("./02-instrucciones-memoria-y-proyectos.mdx"),
    }),
    defineLesson({
      slug: "de-los-gpts-a-las-skills",
      title: "De los GPTs a las skills y los plugins",
      summary:
        "Qué era un GPT, las fechas de su retirada, qué los sustituye y qué hacer con cada uno antes del 11 de diciembre.",
      minutes: 20,
      sources: [
        `${HELP}/8554407-gpts-in-chatgpt`,
        `${HELP}/20001519-custom-gpt-retirement-and-migration-faq`,
        `${HELP}/20001256`,
        `${HELP}/20001066-skills-in-chatgpt`,
        `${HELP}/8554397-creating-and-editing-gpts`,
        UI_CAPTURE,
      ],
      exercises: ["gpt-equipo", "inventario-gpts"],
      load: () => import("./03-de-los-gpts-a-las-skills.mdx"),
    }),
    defineLesson({
      slug: "archivos-busqueda-e-investigacion",
      title: "Archivos, búsqueda, investigación, imágenes, voz y Record",
      summary:
        "Darle material y sacar algo útil: archivos, búsqueda e investigación avanzada con citas, imágenes, voz y grabar reuniones en Mac.",
      minutes: 20,
      sources: [
        `${HELP}/10500283-deep-research`,
        `${HELP}/11487532-chatgpt-record`,
        `${HELP}/6825453-chatgpt-release-notes`,
        "https://chatgpt.com/es-ES/pricing/",
      ],
      exercises: ["busqueda-o-investigacion-gpt", "investigar-gpt"],
      load: () => import("./04-archivos-busqueda-e-investigacion.mdx"),
    }),
    defineLesson({
      slug: "apps-y-tareas-programadas",
      title: "Apps conectadas y tareas programadas",
      summary:
        "Los conectores de ChatGPT (apps y plugins) y las tareas que trabajan solas: periódicas, de vigilancia y por evento.",
      minutes: 20,
      sources: [
        `${HELP}/11487775-apps-in-chatgpt`,
        `${HELP}/20001256`,
        `${HELP}/10291617-tasks-in-chatgpt`,
        UI_CAPTURE,
      ],
      exercises: ["evento-o-programada", "tarea-chatgpt"],
      load: () => import("./05-apps-y-tareas-programadas.mdx"),
    }),
    defineLesson({
      slug: "chatgpt-work",
      title: "Work y los agentes de equipo",
      summary:
        "El Cowork de ChatGPT para trabajos de varios pasos con entregable, cómo encargarlo y los agentes compartidos de Business y Enterprise.",
      minutes: 20,
      sources: [
        `${HELP}/20001275-chatgpt-work-and-codex`,
        `${HELP}/11752874-chatgpt-agent`,
        `${HELP}/20001371`,
        `${HELP}/20001143-chatgpt-workspace-agents-for-enterprise-and-business`,
      ],
      exercises: ["chat-o-work", "primer-work"],
      load: () => import("./06-chatgpt-work.mdx"),
    }),
    defineLesson({
      slug: "dots",
      title: "Los dots: un agente siempre encendido",
      summary:
        "Qué es un dot, cómo se controla, en qué se diferencia de Work y de una tarea programada, y quién lo tiene (en España, solo por la empresa).",
      minutes: 15,
      sources: [
        "https://openai.com/es-ES/index/introducing-dots/",
        `${HELP}/20001530-getting-started-with-your-dot`,
        `${HELP}/20001529-dots-privacy-security-and-safety-faqs`,
        `${HELP}/20001554-managing-dots-in-chatgpt-workspaces`,
      ],
      exercises: ["dot-o-tarea", "objetivo-dot"],
      load: () => import("./07-dots.mdx"),
    }),
  ],
};
