import { defineLesson } from "@/content/define-lesson";
import type { Subject } from "@/content/types";

/** Module 1: how assistants work, how to ask, files and voice, and safe use. */
export const fundamentos: Subject = {
  slug: "fundamentos",
  title: "Fundamentos",
  code: "Módulo 1",
  tagline:
    "Cómo funciona un asistente por dentro, cómo pedirle las cosas, qué hacer con archivos, fotos y voz, y qué datos darle.",
  lessons: [
    defineLesson({
      slug: "que-hay-detras-del-chat",
      title: "Qué hay detrás del chat",
      summary:
        "Por qué la IA redacta tan bien y a veces inventa, qué sabe y qué no, la ventana de contexto y qué modelo elegir.",
      minutes: 15,
      sources: ["https://support.claude.com", "https://claude.com/product/overview"],
      exercises: ["alucinacion", "ventana", "modelo", "primer-contacto"],
      load: () => import("./01-que-hay-detras-del-chat.mdx"),
    }),
    defineLesson({
      slug: "pedir-bien",
      title: "Pedir bien: el prompt",
      summary:
        "Los cinco ingredientes de una buena petición, una plantilla para delegar, iterar en vez de repetir y dar ejemplos.",
      minutes: 20,
      sources: [
        "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        "https://academy.claude.com",
      ],
      exercises: ["ingrediente", "ejemplos", "delegar"],
      load: () => import("./02-pedir-bien.mdx"),
    }),
    defineLesson({
      slug: "archivos-imagenes-y-voz",
      title: "Archivos, imágenes y voz",
      summary:
        "Resúmenes con propósito, Excel sin fórmulas, fotos de pizarras y tarjetas, y dictar o hablar con la IA.",
      minutes: 20,
      sources: ["https://support.claude.com"],
      exercises: ["pagina", "pizarra", "excel"],
      load: () => import("./03-archivos-imagenes-y-voz.mdx"),
    }),
    defineLesson({
      slug: "con-cabeza",
      title: "Usarla con cabeza",
      summary:
        "Cuenta de empresa o personal, el semáforo de los datos, de qué no fiarse y cuándo no usarla.",
      minutes: 15,
      sources: ["https://www.anthropic.com/legal/privacy", "https://trust.anthropic.com"],
      exercises: ["semaforo", "politica"],
      load: () => import("./04-con-cabeza.mdx"),
    }),
  ],
};
