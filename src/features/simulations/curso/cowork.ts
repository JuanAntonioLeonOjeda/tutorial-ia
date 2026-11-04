/** An agent doing a multi-step task with tools, and the point where it asks before acting. */

export type StepKind =
  "plan" | "leer" | "buscar" | "observar" | "crear" | "revisar" | "permiso" | "enviar" | "fin";

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

/**
 * Cowork's approval modes (support.claude.com, "Get started with Claude Cowork"): Manual asks
 * for each action; Auto keeps going and only blocks actions its safety check flags (data
 * exfiltration, prompt injection…); Skip neither asks nor checks. Emailing an itinerary to
 * your boss is not unsafe, so Auto sends it without asking.
 */
export type ApprovalMode = "manual" | "auto" | "skip";

export const APPROVAL_MODES: readonly { id: ApprovalMode; label: string }[] = [
  { id: "manual", label: "Aprobar a mano" },
  { id: "auto", label: "Aprobar automáticamente" },
  { id: "skip", label: "Saltar aprobaciones" },
];

/** The whole run for a given mode and, when it asks, the person's answer. */
export function agentRun(mode: ApprovalMode, approved: boolean | null): AgentStep[] {
  const steps = [...BEFORE_SENDING];
  if (mode === "auto") {
    steps.push({
      kind: "revisar",
      text: "Comprobación de seguridad automática: enviar un correo a tu jefa no parece peligroso, así que no te pregunta.",
    });
    steps.push({
      kind: "enviar",
      text: "Envía el itinerario a Laura, riesgo incluido, sin que tú lo hayas visto.",
    });
    steps.push({
      kind: "fin",
      text: "Hecho. Si había un error en el itinerario, ya está en la bandeja de Laura.",
    });
    return steps;
  }
  if (mode === "skip") {
    steps.push({
      kind: "enviar",
      text: "Envía el itinerario a Laura directamente: sin preguntarte y sin ninguna comprobación.",
    });
    steps.push({ kind: "fin", text: "Hecho. Nada se ha parado a revisar nada en ningún momento." });
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
