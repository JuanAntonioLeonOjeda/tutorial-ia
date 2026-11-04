import { useState, type ReactNode } from "react";

import {
  ControlNote,
  SimFrame,
  Slider,
  Stat,
  Toggle,
  plotColour,
} from "@/features/simulations/kit";

import {
  CONTEXT_CAPACITY,
  OPTIONAL_ITEMS,
  fillContext,
  layoutSegments,
  type ContextStatus,
} from "./context-window";

const W = 560;
const BAR_X = 10;
const BAR_W = 440; // the window; anything beyond is overflow
const BAR_Y = 34;
const BAR_H = 54;

const STATUS_TEXT: Record<ContextStatus, string> = {
  holgado: "Holgado: Claude lo tiene todo presente.",
  lleno: "Lleno a medias: va bien, pero lo del principio pesa menos.",
  "al-limite": "Al límite: empieza un chat nuevo pronto.",
  desborda:
    "No cabe: la app tiene que resumir o descartar lo más antiguo, o no te deja seguir. Los detalles del principio se pierden.",
};

export default function ContextWindowSim(): ReactNode {
  const [items, setItems] = useState<readonly string[]>(["instrucciones"]);
  const [exchanges, setExchanges] = useState(10);
  const fill = fillContext(items, exchanges);
  const scale = BAR_W / CONTEXT_CAPACITY;
  const maxX = W - 10;

  const rects = layoutSegments(fill.segments, BAR_X, scale).map(({ segment, index, x, width }) => ({
    segment,
    x,
    width,
    colour: segment.id === "chat" ? "var(--color-line-strong)" : plotColour(index),
  }));

  return (
    <SimFrame
      title="La memoria de trabajo de una conversación"
      intro="Todo lo que hay en un chat (tus mensajes, sus respuestas y los archivos) ocupa sitio en la «ventana de contexto». Añade documentos y alarga la conversación: mira cuándo deja de caber."
      onReset={() => {
        setItems(["instrucciones"]);
        setExchanges(10);
      }}
      controls={
        <>
          {OPTIONAL_ITEMS.map((item) => (
            <Toggle
              key={item.id}
              label={`${item.label} · ~${item.size}k`}
              isOn={items.includes(item.id)}
              onChange={(isOn) => {
                setItems((prev) =>
                  isOn ? [...prev, item.id] : prev.filter((id) => id !== item.id),
                );
              }}
            />
          ))}
          <Slider
            label="Intercambios en el chat"
            value={exchanges}
            min={0}
            max={120}
            onChange={setExchanges}
          />
          <ControlNote>
            Tamaños aproximados, en miles de tokens (un token ≈ ¾ de palabra).
          </ControlNote>
        </>
      }
      readout={
        <>
          <Stat
            label="Ocupado"
            value={`${Math.round((fill.used / CONTEXT_CAPACITY) * 100)} %`}
            tone={fill.status === "desborda" ? "bad" : "default"}
          />
          <Stat
            label="Tokens (aprox.)"
            value={`${Math.round(fill.used)}k de ${CONTEXT_CAPACITY}k`}
          />
          <Stat
            label="Estado"
            value={STATUS_TEXT[fill.status]}
            tone={
              fill.status === "holgado" ? "good" : fill.status === "desborda" ? "bad" : "default"
            }
          />
        </>
      }
    >
      <svg
        viewBox={`0 0 ${W} 150`}
        role="img"
        aria-label={`Ventana de contexto ocupada al ${Math.round((fill.used / CONTEXT_CAPACITY) * 100)} por ciento. ${STATUS_TEXT[fill.status]}`}
      >
        <text x={BAR_X} y={22} fontSize={13} fill="var(--color-muted)">
          Ventana de contexto ({CONTEXT_CAPACITY}k tokens ≈ 500 páginas)
        </text>
        <rect
          x={BAR_X}
          y={BAR_Y}
          width={BAR_W}
          height={BAR_H}
          rx={8}
          fill="var(--color-surface-sunken)"
          stroke="var(--color-line-strong)"
        />
        {rects.map(({ segment, x: rx, width, colour }) => {
          const visible = Math.max(0, Math.min(width, maxX - rx));
          return (
            <g key={segment.id}>
              <rect
                x={rx}
                y={BAR_Y + 4}
                width={visible}
                height={BAR_H - 8}
                fill={colour}
                opacity={rx >= BAR_X + BAR_W ? 0.35 : 0.85}
              />
              {visible > 46 && (
                <text
                  x={rx + 6}
                  y={BAR_Y + BAR_H / 2 + 5}
                  fontSize={12}
                  fill="var(--color-surface)"
                  fontWeight={700}
                >
                  {segment.id === "chat" ? "chat" : `${Math.round(segment.size)}k`}
                </text>
              )}
            </g>
          );
        })}
        <line
          x1={BAR_X + BAR_W}
          x2={BAR_X + BAR_W}
          y1={BAR_Y - 8}
          y2={BAR_Y + BAR_H + 8}
          stroke="var(--color-bad)"
          strokeWidth={2}
          strokeDasharray="4 3"
        />
        <text x={BAR_X + BAR_W + 6} y={BAR_Y + BAR_H + 22} fontSize={12} fill="var(--color-bad)">
          límite
        </text>
        {fill.overflow > 0 && (
          <text
            x={BAR_X}
            y={BAR_Y + BAR_H + 40}
            fontSize={13}
            fill="var(--color-bad)"
            fontWeight={700}
          >
            Sobran ~{Math.round(fill.overflow)}k tokens: algo se queda fuera.
          </text>
        )}
      </svg>
    </SimFrame>
  );
}
