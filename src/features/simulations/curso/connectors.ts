/** Which connectors a request needs, and what happens when one is missing. */

export type ConnectorId = "correo" | "calendario" | "drive" | "chat";

export const CONNECTORS: readonly { id: ConnectorId; label: string; examples: string }[] = [
  { id: "correo", label: "Correo", examples: "Gmail, Outlook" },
  { id: "calendario", label: "Calendario", examples: "Google Calendar, Outlook" },
  { id: "drive", label: "Documentos", examples: "Google Drive, SharePoint" },
  { id: "chat", label: "Mensajería", examples: "Slack, Teams" },
];

export interface ConnectorRequest {
  id: string;
  label: string;
  needs: readonly ConnectorId[];
  /** True when it changes something (creates, moves, sends): Claude asks before doing it. */
  writes: boolean;
  answer: string;
}

export const REQUESTS: readonly ConnectorRequest[] = [
  {
    id: "manana",
    label: "¿Qué tiene Laura mañana y hay un hueco de una hora?",
    needs: ["calendario"],
    writes: false,
    answer: "Mañana: 9:00 equipo, 11:30 Acme, 16:00 consejo. Hueco libre de 13:00 a 14:30.",
  },
  {
    id: "pendientes",
    label: "Resume los correos de la consejera sin contestar",
    needs: ["correo"],
    writes: false,
    answer:
      "Tres pendientes: el orden del día del consejo, la fecha de la junta y una factura de viaje.",
  },
  {
    id: "briefing",
    label: "Prepara un briefing para la reunión con Acme",
    needs: ["calendario", "correo", "drive"],
    writes: false,
    answer:
      "Reunión el jueves 11:30 con dos asistentes de Acme; último correo: piden rebaja del 5 %; la propuesta v3 está en Drive.",
  },
  {
    id: "canal",
    label: "¿Qué se decidió esta semana en el canal de dirección?",
    needs: ["chat"],
    writes: false,
    answer: "Dos decisiones: se aplaza el offsite a junio y se aprueba el proveedor de catering.",
  },
  {
    id: "mover",
    label: "Mueve la reunión de las 9:00 al jueves a la misma hora",
    needs: ["calendario"],
    writes: true,
    answer: "Evento listo para moverse al jueves 9:00. Avisará a los cuatro invitados.",
  },
];

export interface Resolution {
  missing: readonly ConnectorId[];
  canAnswer: boolean;
  needsApproval: boolean;
}

export function resolveRequest(
  request: ConnectorRequest,
  connected: readonly ConnectorId[],
): Resolution {
  const missing = request.needs.filter((c) => !connected.includes(c));
  const canAnswer = missing.length === 0;
  return { missing, canAnswer, needsApproval: canAnswer && request.writes };
}
