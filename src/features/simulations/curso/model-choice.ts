/**
 * Picking a model and an effort level for a task. Official help pages say that the model and the
 * effort level both affect how fast you use your limits, and that higher effort is more thorough
 * but slower and uses more. They give no per-model numbers, so the scales here are illustrative:
 * relative, ordered, never presented as real figures.
 */

export type ModelId = "rapido" | "equilibrado" | "capaz";
export type EffortId = "bajo" | "medio" | "alto" | "maximo";

export const MODELS: readonly { id: ModelId; label: string; power: number; weight: number }[] = [
  { id: "rapido", label: "Haiku (rápido)", power: 1, weight: 1 },
  { id: "equilibrado", label: "Sonnet (equilibrado)", power: 2, weight: 2 },
  { id: "capaz", label: "Opus (el más capaz)", power: 3, weight: 3 },
];

export const EFFORTS: readonly { id: EffortId; label: string; bonus: number; weight: number }[] = [
  { id: "bajo", label: "Bajo", bonus: -0.5, weight: 0 },
  { id: "medio", label: "Medio", bonus: 0, weight: 1 },
  { id: "alto", label: "Alto", bonus: 0.5, weight: 2 },
  { id: "maximo", label: "Máximo", bonus: 1, weight: 3 },
];

export interface ModelTask {
  id: string;
  label: string;
  /** How much reasoning it needs: 1 routine, 2 needs care, 3 many steps where a slip ruins it. */
  need: number;
  why: string;
}

export const MODEL_TASKS: readonly ModelTask[] = [
  {
    id: "correo",
    label: "Contestar un correo rutinario",
    need: 1,
    why: "Redactar algo corto y claro lo hace bien cualquier modelo.",
  },
  {
    id: "triar",
    label: "Clasificar 30 correos de la bandeja",
    need: 1,
    why: "Muchas decisiones fáciles: importa más la rapidez que la profundidad.",
  },
  {
    id: "acta",
    label: "Hacer el acta con una transcripción de una hora",
    need: 2,
    why: "Hay que entender quién decide qué y no perder acuerdos: pide cuidado, no genialidad.",
  },
  {
    id: "contrato",
    label: "Comparar dos versiones de un contrato de 40 páginas",
    need: 3,
    why: "Un cambio de una palabra en una cláusula importa: aquí compensa lo más capaz.",
  },
  {
    id: "agendas",
    label: "Cuadrar una reunión con seis agendas y dos viajes",
    need: 3,
    why: "Muchas restricciones a la vez: un fallo invalida la propuesta entera.",
  },
];

export type ModelVerdict = "corto" | "acertado" | "de-mas";

export interface ModelOutcome {
  verdict: ModelVerdict;
  /** 1 (least) to 6 (most): relative use of your limits, illustrative. */
  usage: number;
  /** 1 (slowest) to 6 (fastest), illustrative. */
  speed: number;
}

export function chooseModel(task: ModelTask, model: ModelId, effort: EffortId): ModelOutcome {
  const m = MODELS.find((x) => x.id === model);
  const e = EFFORTS.find((x) => x.id === effort);
  if (m === undefined || e === undefined)
    throw new Error(`Unknown model or effort: ${model}, ${effort}`);
  const quality = m.power + e.bonus;
  const verdict: ModelVerdict =
    quality < task.need - 0.25 ? "corto" : quality > task.need + 1.25 ? "de-mas" : "acertado";
  const usage = m.weight + e.weight; // 1…6
  return { verdict, usage, speed: 7 - usage };
}
