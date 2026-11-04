/**
 * How much of the context window a conversation uses. Sizes are rough orders of magnitude in
 * thousands of tokens (Spanish text is ~1.3–1.5 tokens per word), enough to compare.
 */

export const CONTEXT_CAPACITY = 200; // thousand tokens: the standard window of Claude's chat

export interface ContextItem {
  id: string;
  label: string;
  /** Thousand tokens. */
  size: number;
}

export const OPTIONAL_ITEMS: readonly ContextItem[] = [
  { id: "instrucciones", label: "Instrucciones del proyecto (1 página)", size: 1 },
  { id: "acta", label: "Acta de 10 páginas", size: 7 },
  { id: "hilo", label: "Hilo de 40 correos", size: 25 },
  { id: "informe", label: "Informe anual en PDF (120 páginas)", size: 85 },
  { id: "excel", label: "Excel de gastos (3.000 filas)", size: 90 },
];

/** An average exchange (your question and a medium-length answer). */
export const TOKENS_PER_EXCHANGE = 1.5;

export type ContextStatus = "holgado" | "lleno" | "al-limite" | "desborda";

export interface ContextFill {
  segments: readonly ContextItem[];
  used: number;
  overflow: number;
  status: ContextStatus;
}

export function fillContext(itemIds: readonly string[], exchanges: number): ContextFill {
  const docs = OPTIONAL_ITEMS.filter((item) => itemIds.includes(item.id));
  const chat: ContextItem = {
    id: "chat",
    label: `${exchanges} intercambios de conversación`,
    size: exchanges * TOKENS_PER_EXCHANGE,
  };
  const segments = exchanges > 0 ? [...docs, chat] : docs;
  const used = segments.reduce((sum, s) => sum + s.size, 0);
  const ratio = used / CONTEXT_CAPACITY;
  const status: ContextStatus =
    ratio > 1 ? "desborda" : ratio >= 0.9 ? "al-limite" : ratio >= 0.5 ? "lleno" : "holgado";
  return { segments, used, overflow: Math.max(0, used - CONTEXT_CAPACITY), status };
}

/** Left edge and width of each segment when the window is drawn `scale` units per k-token. */
export function layoutSegments(
  segments: readonly ContextItem[],
  start: number,
  scale: number,
): { segment: ContextItem; index: number; x: number; width: number }[] {
  const out: { segment: ContextItem; index: number; x: number; width: number }[] = [];
  let x = start;
  for (const [index, segment] of segments.entries()) {
    const width = segment.size * scale;
    out.push({ segment, index, x, width });
    x += width;
  }
  return out;
}
