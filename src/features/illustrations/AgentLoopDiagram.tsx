import type { ReactNode } from "react";

import { Figure } from "@/features/ui";

const BOXES = [
  { x: 20, label: "Le das", sub: "un objetivo" },
  { x: 160, label: "Planifica", sub: "los pasos" },
  { x: 300, label: "Actúa", sub: "con una herramienta" },
  { x: 440, label: "Mira", sub: "el resultado" },
] as const;

/** The agent loop: plan, act with a tool, look at the result, repeat until done. */
export function AgentLoopDiagram(): ReactNode {
  return (
    <Figure caption="El bucle de un agente: planifica, actúa con una herramienta (leer un archivo, buscar en el correo, crear un documento), mira qué ha pasado y decide el siguiente paso. Repite hasta terminar, y te pregunta antes de lo delicado.">
      <svg
        viewBox="0 0 580 210"
        width={580}
        role="img"
        aria-label="Bucle del agente: objetivo, planificar, actuar, mirar el resultado y volver a planificar hasta terminar"
      >
        <defs>
          <marker
            id="agent-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="var(--color-ink-soft)" />
          </marker>
        </defs>
        {BOXES.map((box, i) => (
          <g key={box.label}>
            <rect
              x={box.x}
              y={40}
              width={120}
              height={64}
              rx={12}
              fill={
                i === 0
                  ? "var(--color-surface-sunken)"
                  : "var(--subject-soft, var(--color-surface-sunken))"
              }
              stroke="var(--subject-color, var(--color-ink))"
              strokeWidth={2}
            />
            <text
              x={box.x + 60}
              y={68}
              textAnchor="middle"
              fontSize={15}
              fontWeight={700}
              fill="var(--color-ink)"
            >
              {box.label}
            </text>
            <text x={box.x + 60} y={88} textAnchor="middle" fontSize={12} fill="var(--color-muted)">
              {box.sub}
            </text>
            {i < BOXES.length - 1 && (
              <line
                x1={box.x + 122}
                y1={72}
                x2={box.x + 138}
                y2={72}
                stroke="var(--color-ink-soft)"
                strokeWidth={2}
                markerEnd="url(#agent-arrow)"
              />
            )}
          </g>
        ))}
        <path
          d="M500 106 C500 160, 220 160, 220 108"
          fill="none"
          stroke="var(--color-ink-soft)"
          strokeWidth={2}
          strokeDasharray="5 4"
          markerEnd="url(#agent-arrow)"
        />
        <text x={360} y={168} textAnchor="middle" fontSize={12} fill="var(--color-muted)">
          ¿terminado? si no, vuelve a planificar
        </text>
        <rect
          x={250}
          y={180}
          width={220}
          height={26}
          rx={6}
          fill="var(--color-task-soft)"
          stroke="var(--color-task)"
        />
        <text
          x={360}
          y={198}
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          fill="var(--color-task-ink)"
        >
          antes de enviar o borrar: te pregunta
        </text>
      </svg>
    </Figure>
  );
}
