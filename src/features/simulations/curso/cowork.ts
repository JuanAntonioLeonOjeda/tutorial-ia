/** An agent doing a multi-step task with tools, and the point where it asks before acting. */

export type StepKind =
  "plan" | "leer" | "buscar" | "observar" | "crear" | "permiso" | "enviar" | "fin";

export interface AgentStep {
  kind: StepKind;
  text: string;
}

export const TASK =
  "Prepara el viaje a Bruselas: con lo que hay en la carpeta y en el correo, haz el itinerario y mándaselo a Laura.";

const BEFORE_SENDING: readonly AgentStep[] = [
  {
    kind: "plan",
    text: "Plan: 1) leer la carpeta «Viaje Bruselas», 2) buscar en el correo la reserva del hotel, 3) montar el itinerario, 4) enviarlo a Laura.",
  },
  {
    kind: "leer",
    text: "Lee 4 archivos de la carpeta: billetes.pdf, agenda-comision.docx, notas.txt, dietas.xlsx.",
  },
  {
    kind: "buscar",
    text: "Busca en el correo «Hotel confirmación Bruselas» y encuentra la reserva (2 noches).",
  },
  {
    kind: "observar",
    text: "Detecta un problema: el vuelo de vuelta sale a las 18:05 y la última reunión acaba a las 17:30. Lo apunta como riesgo.",
  },
  {
    kind: "crear",
    text: "Crea itinerario-bruselas.docx en la carpeta, con horarios, direcciones y el riesgo marcado en rojo.",
  },
];

/** The whole run for a given setting and, when it asks, the person's answer. */
export function agentRun(askBeforeSending: boolean, approved: boolean | null): AgentStep[] {
  const steps = [...BEFORE_SENDING];
  if (!askBeforeSending) {
    steps.push({
      kind: "enviar",
      text: "Envía el itinerario a Laura directamente, riesgo incluido, sin que tú lo hayas visto.",
    });
    steps.push({
      kind: "fin",
      text: "Hecho. Si había un error en el itinerario, ya está en la bandeja de Laura.",
    });
    return steps;
  }
  steps.push({
    kind: "permiso",
    text: "Quiere enviar un correo a laura@empresa.com con el itinerario adjunto. ¿Lo permites?",
  });
  if (approved === true) {
    steps.push({ kind: "enviar", text: "Envía el correo a Laura con el itinerario." });
    steps.push({
      kind: "fin",
      text: "Hecho: itinerario creado y enviado. Te resume el riesgo del vuelo para que lo valores.",
    });
  } else if (approved === false) {
    steps.push({
      kind: "fin",
      text: "No envía nada. Deja el itinerario en la carpeta y te pregunta si cambia el vuelo antes.",
    });
  }
  return steps;
}
