/**
 * How Claude picks a skill: it only sees each skill's name and description until one fits the
 * request. Here "fits" is a hand-made keyword match: the real model reads the description with
 * judgement, but a vague description fails it in the same way.
 */

export interface Skill {
  id: string;
  name: string;
  description: string;
  /** Words of the description that a request can match. */
  triggers: readonly string[];
  /** Lines of the full SKILL.md, loaded only when the skill is used. */
  bodyLines: number;
  isBuiltIn: boolean;
}

export type MinutesDescription = "vaga" | "concreta";

export function minutesSkill(kind: MinutesDescription): Skill {
  return kind === "vaga"
    ? {
        id: "acta",
        name: "acta-de-reunion",
        description: "Ayuda con documentos.",
        triggers: ["documento"],
        bodyLines: 60,
        isBuiltIn: false,
      }
    : {
        id: "acta",
        name: "acta-de-reunion",
        description:
          "Convierte notas o la transcripción de una reunión en un acta con el formato de la empresa: asistentes, acuerdos, responsables y fechas. Úsala cuando pidan un acta, un resumen de reunión o los acuerdos.",
        triggers: ["acta", "reunión", "acuerdos", "transcripción"],
        bodyLines: 60,
        isBuiltIn: false,
      };
}

export const OTHER_SKILLS: readonly Skill[] = [
  {
    id: "correo",
    name: "correo-ejecutivo",
    description:
      "Redacta y contesta correos en nombre de la dirección con el estilo de la casa. Úsala para escribir, responder o declinar un correo.",
    triggers: ["correo", "contesta", "declinar"],
    bodyLines: 45,
    isBuiltIn: false,
  },
  {
    id: "viajes",
    name: "preparar-viaje",
    description:
      "Organiza un viaje de trabajo: itinerario, opciones de vuelo y hotel según la política de viajes y checklist. Úsala para viajes y desplazamientos.",
    triggers: ["viaje", "vuelo", "hotel"],
    bodyLines: 80,
    isBuiltIn: false,
  },
  {
    id: "docx",
    name: "docx",
    description: "Crea y edita documentos de Word (.docx).",
    triggers: ["word", "documento"],
    bodyLines: 200,
    isBuiltIn: true,
  },
  {
    id: "xlsx",
    name: "xlsx",
    description: "Crea y edita hojas de cálculo de Excel (.xlsx).",
    triggers: ["excel", "hoja de cálculo", "tabla"],
    bodyLines: 200,
    isBuiltIn: true,
  },
];

export interface SkillRequest {
  id: string;
  label: string;
  keywords: readonly string[];
  /** The skill a person would expect to be used, or null when none applies. */
  expected: string | null;
}

export const SKILL_REQUESTS: readonly SkillRequest[] = [
  {
    id: "acta",
    label: "Hazme el acta del comité con estas notas",
    keywords: ["acta", "notas"],
    expected: "acta",
  },
  {
    id: "acuerdos",
    label: "¿Qué acuerdos salieron ayer? Te pego la transcripción",
    keywords: ["acuerdos", "transcripción"],
    expected: "acta",
  },
  {
    id: "declinar",
    label: "Contesta al consejero declinando la cena",
    keywords: ["contesta", "declinar"],
    expected: "correo",
  },
  {
    id: "bruselas",
    label: "Organiza el viaje a Bruselas del 12 al 14",
    keywords: ["viaje"],
    expected: "viajes",
  },
  {
    id: "word",
    label: "Pasa este documento a Word",
    keywords: ["documento", "word"],
    expected: "docx",
  },
  {
    id: "tiempo",
    label: "¿Qué tiempo hará en Bruselas?",
    keywords: ["tiempo"],
    expected: null,
  },
];

export function matchSkills(request: SkillRequest, skills: readonly Skill[]): Skill[] {
  return skills.filter((skill) => skill.triggers.some((t) => request.keywords.includes(t)));
}

export type MatchVerdict = "acierta" | "falla" | "duda" | "ninguna";

/** Did the right skill (and only it) load? */
export function verdict(request: SkillRequest, matched: readonly Skill[]): MatchVerdict {
  const ids = matched.map((s) => s.id);
  if (request.expected === null) return ids.length === 0 ? "ninguna" : "falla";
  if (!ids.includes(request.expected)) return "falla";
  return ids.length === 1 ? "acierta" : "duda";
}
