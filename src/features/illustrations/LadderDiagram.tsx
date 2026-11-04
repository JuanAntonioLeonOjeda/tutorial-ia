import type { ReactNode } from "react";

import { Figure } from "@/features/ui";

const RUNGS = [
  { label: "Chat", sub: "preguntas sueltas" },
  { label: "Proyecto", sub: "contexto fijo" },
  { label: "Skill", sub: "procedimientos" },
  { label: "Conector", sub: "tu correo y agenda" },
  { label: "Agente / tarea", sub: "trabaja por ti" },
] as const;

/** The course as a ladder: each rung saves more repetition than the one below. */
export function LadderDiagram(): ReactNode {
  return (
    <Figure caption="La escalera del curso: cada peldaño te ahorra repetir algo que hacías en el anterior.">
      <svg
        viewBox="0 0 560 250"
        width={560}
        role="img"
        aria-label="Escalera: chat, proyecto, skill, conector, agente y tareas programadas"
      >
        {RUNGS.map((rung, i) => {
          const x = 20 + i * 100;
          const y = 200 - i * 40;
          return (
            <g key={rung.label}>
              <rect
                x={x}
                y={y}
                width={120}
                height={40 + i * 40}
                rx={8}
                fill="var(--subject-soft, var(--color-surface-sunken))"
                stroke="var(--subject-color, var(--color-ink))"
                strokeWidth={2}
                opacity={0.35 + i * 0.15}
              />
              <text x={x + 8} y={y + 18} fontSize={14} fontWeight={700} fill="var(--color-ink)">
                {rung.label}
              </text>
              <text x={x + 8} y={y + 34} fontSize={10.5} fill="var(--color-ink-soft)">
                {rung.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}
