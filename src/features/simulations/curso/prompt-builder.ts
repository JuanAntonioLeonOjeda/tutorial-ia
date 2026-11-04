/**
 * The same request with more or fewer "ingredients", and the answer each version gets. The
 * answers are written by hand to show the typical effect of each ingredient; a real model
 * varies, but in the same direction.
 */

export type Ingredient = "rol" | "contexto" | "formato" | "tono" | "ejemplo";

export const INGREDIENTS: readonly { id: Ingredient; label: string; text: string }[] = [
  {
    id: "rol",
    label: "Rol",
    text: "Eres mi ayudante para la agenda de Laura Martín, la CEO; yo soy Ana, su asistente.",
  },
  {
    id: "contexto",
    label: "Contexto",
    text: "El Comité de Dirección del jueves 14 a las 10:00 pasa al martes 19 a las 9:30, en la sala Retiro, porque Laura viaja a Bruselas. Van los seis miembros del comité.",
  },
  {
    id: "formato",
    label: "Formato",
    text: "Dame asunto y cuerpo; máximo seis líneas, con la nueva fecha, hora y sala en una línea aparte.",
  },
  {
    id: "tono",
    label: "Tono",
    text: "Tono cordial y directo, de tú, sin pedir perdón tres veces.",
  },
  {
    id: "ejemplo",
    label: "Ejemplo",
    text: 'Así suelo escribir: "Buenos días a todos: … Gracias y un saludo, Ana".',
  },
];

const TASK = "Escribe un correo para cambiar la reunión del comité.";

export function buildPrompt(on: readonly Ingredient[]): string {
  const parts = INGREDIENTS.filter((i) => on.includes(i.id)).map((i) => i.text);
  const role = on.includes("rol") ? [parts.shift() ?? ""] : [];
  return [...role, TASK, ...parts].join("\n");
}

export interface Answer {
  text: string;
  /** What you would still have to fix by hand. */
  fixes: readonly string[];
}

export function answerFor(on: readonly Ingredient[]): Answer {
  const has = (i: Ingredient): boolean => on.includes(i);
  const fixes: string[] = [];

  const subject = has("contexto")
    ? "Asunto: Comité de Dirección: cambio al martes 19, 9:30"
    : "Asunto: Cambio de fecha de la reunión";
  if (!has("contexto"))
    fixes.push("Rellenar fecha, hora, sala y motivo (se los ha inventado o dejado en blanco).");

  const greeting = has("ejemplo")
    ? "Buenos días a todos:"
    : has("tono")
      ? "Hola a todos:"
      : "Estimados miembros del comité:";
  if (!has("ejemplo") && !has("tono"))
    fixes.push("Cambiar el tono: suena acartonado y no es como tú escribes.");

  const apology = has("tono")
    ? ""
    : " Lamentamos sinceramente las molestias que esto pueda ocasionar y pedimos disculpas por el cambio.";
  if (!has("rol")) fixes.push("Dejar claro que escribes en nombre de Laura.");
  const reason = has("contexto")
    ? has("rol")
      ? "Laura viaja a Bruselas el jueves, así que movemos el Comité de Dirección."
      : "Por un viaje a Bruselas, movemos el Comité de Dirección."
    : has("rol")
      ? "Por un cambio en la agenda de Laura, tenemos que mover la reunión."
      : "Por motivos de agenda, es necesario cambiar la reunión prevista.";
  const when = has("contexto")
    ? "Martes 19 · 9:30 · sala Retiro"
    : "[nueva fecha] · [hora] · [sala]";
  const body = has("formato")
    ? [reason + apology, "", `Nueva cita: ${when}`, "", "Si no puedes, dímelo antes del viernes."]
    : [
        `${reason}${apology} La nueva propuesta sería ${has("contexto") ? "el martes 19 a las 9:30 en la sala Retiro" : "[nueva fecha] a las [hora]"}, aunque estamos abiertos a otras alternativas si esa fecha no os viniera bien, en cuyo caso os rogamos que nos lo comuniquéis a la mayor brevedad posible para poder reorganizar las agendas de todos los asistentes.`,
      ];
  if (!has("formato")) fixes.push("Acortarlo: un párrafo largo donde la fecha se pierde.");

  const signature = has("ejemplo")
    ? "Gracias y un saludo,\nAna"
    : has("rol")
      ? "Un saludo,\nAna\nAsistente de Laura Martín"
      : "Atentamente,\n[Tu nombre]";
  if (!has("ejemplo")) fixes.push("Ajustar la despedida a tu estilo.");

  return { text: [subject, "", greeting, "", ...body, "", signature].join("\n"), fixes };
}
