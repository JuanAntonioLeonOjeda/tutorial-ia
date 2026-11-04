/** A scheduled task: when it runs, what it does, where it leaves the result. */

import type { ConnectorId } from "./connectors";

export type WhenId = "laborables" | "lunes" | "viernes" | "mes";

export const WHEN: readonly { id: WhenId; label: string; hour: number; minute: number }[] = [
  { id: "laborables", label: "Cada día laborable a las 8:00", hour: 8, minute: 0 },
  { id: "lunes", label: "Cada lunes a las 8:00", hour: 8, minute: 0 },
  { id: "viernes", label: "Cada viernes a las 14:00", hour: 14, minute: 0 },
  { id: "mes", label: "El día 1 de cada mes a las 9:00", hour: 9, minute: 0 },
];

export type WhatId = "agenda" | "pendientes" | "semana" | "vencimientos";

export const WHAT: readonly {
  id: WhatId;
  label: string;
  instruction: string;
  needs: readonly ConnectorId[];
}[] = [
  {
    id: "agenda",
    label: "Briefing de la agenda del día",
    instruction:
      "Revisa el calendario de Laura para hoy. Para cada reunión: hora, asistentes, de qué va (busca el último correo relacionado) y qué hay que llevar preparado. Marca los solapes y los huecos libres.",
    needs: ["calendario", "correo"],
  },
  {
    id: "pendientes",
    label: "Correos importantes sin contestar",
    instruction:
      "Busca correos dirigidos a Laura de hace más de dos días sin respuesta. Quédate con los del consejo, clientes y su equipo directo. Para cada uno: remitente, asunto, qué piden y una propuesta de respuesta de dos líneas.",
    needs: ["correo"],
  },
  {
    id: "semana",
    label: "Resumen de la semana",
    instruction:
      "Resume la semana: reuniones celebradas, acuerdos y tareas que salieron (busca las actas en la carpeta Actas), y lo que queda pendiente para la semana que viene.",
    needs: ["calendario", "correo", "drive"],
  },
  {
    id: "vencimientos",
    label: "Vencimientos y fechas clave",
    instruction:
      "Lee la hoja Seguimiento de la carpeta Dirección y lista los contratos, renovaciones, cumpleaños y plazos de los próximos 30 días, ordenados por fecha.",
    needs: ["drive"],
  },
];

export type WhereId = "tarea" | "borrador" | "documento";

export const WHERE: readonly {
  id: WhereId;
  label: string;
  instruction: string;
  needs: readonly ConnectorId[];
}[] = [
  {
    id: "tarea",
    label: "En la propia tarea",
    instruction: "Deja el resultado aquí, en la tarea.",
    needs: [],
  },
  {
    id: "borrador",
    label: "Borrador de correo para mí",
    instruction: "Déjalo como borrador de correo dirigido a mí, sin enviarlo.",
    needs: ["correo"],
  },
  {
    id: "documento",
    label: "Documento en Drive",
    instruction:
      "Añádelo al principio del documento «Seguimiento semanal» de la carpeta Dirección, con la fecha como título.",
    needs: ["drive"],
  },
];

function runsOn(when: WhenId, day: Date): boolean {
  const weekday = day.getDay(); // 0 Sunday … 6 Saturday
  switch (when) {
    case "laborables":
      return weekday >= 1 && weekday <= 5;
    case "lunes":
      return weekday === 1;
    case "viernes":
      return weekday === 5;
    case "mes":
      return day.getDate() === 1;
  }
}

/** The next `count` runs strictly after `from`, in local time. */
export function nextRuns(when: WhenId, from: Date, count: number): Date[] {
  const rule = WHEN.find((w) => w.id === when);
  if (rule === undefined) return [];
  const runs: Date[] = [];
  const day = new Date(from.getFullYear(), from.getMonth(), from.getDate(), rule.hour, rule.minute);
  // Two years of days is far more than any rule here needs to produce `count` runs.
  for (let i = 0; i < 730 && runs.length < count; i++) {
    if (runsOn(when, day) && day.getTime() > from.getTime()) runs.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }
  return runs;
}

export function taskInstruction(what: WhatId, where: WhereId): string {
  const task = WHAT.find((w) => w.id === what);
  const place = WHERE.find((w) => w.id === where);
  return [
    task?.instruction ?? "",
    place?.instruction ?? "",
    "Si algo no lo encuentras, dilo en vez de suponerlo.",
  ].join(" ");
}

export function connectorsNeeded(what: WhatId, where: WhereId): ConnectorId[] {
  const task = WHAT.find((w) => w.id === what);
  const place = WHERE.find((w) => w.id === where);
  return [...new Set([...(task?.needs ?? []), ...(place?.needs ?? [])])];
}
