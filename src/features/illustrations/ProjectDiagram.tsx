import type { ReactNode } from "react";

import { Figure } from "@/features/ui";

/** What a project holds: instructions and files shared by every chat inside it. */
export function ProjectDiagram(): ReactNode {
  return (
    <Figure caption="Un proyecto es una carpeta con memoria: las instrucciones y los archivos se aplican a todos los chats que abras dentro. Cada chat sigue siendo independiente de los demás.">
      <svg
        viewBox="0 0 560 250"
        width={560}
        role="img"
        aria-label="Un proyecto contiene instrucciones y archivos que comparten todos sus chats"
      >
        <rect
          x={10}
          y={10}
          width={540}
          height={230}
          rx={16}
          fill="var(--subject-soft, var(--color-surface-sunken))"
          stroke="var(--subject-color, var(--color-ink))"
          strokeWidth={2}
        />
        <text
          x={30}
          y={40}
          fontSize={16}
          fontWeight={700}
          fill="var(--subject-color, var(--color-ink))"
        >
          Proyecto «Dirección General»
        </text>
        <rect
          x={30}
          y={56}
          width={240}
          height={78}
          rx={10}
          fill="var(--color-surface)"
          stroke="var(--color-line-strong)"
        />
        <text x={44} y={80} fontSize={14} fontWeight={700} fill="var(--color-ink)">
          Instrucciones
        </text>
        <text x={44} y={100} fontSize={12} fill="var(--color-muted)">
          «Trabajas para Laura, CEO…
        </text>
        <text x={44} y={118} fontSize={12} fill="var(--color-muted)">
          tono, formatos, nombres clave»
        </text>
        <rect
          x={290}
          y={56}
          width={240}
          height={78}
          rx={10}
          fill="var(--color-surface)"
          stroke="var(--color-line-strong)"
        />
        <text x={304} y={80} fontSize={14} fontWeight={700} fill="var(--color-ink)">
          Conocimiento (archivos)
        </text>
        <text x={304} y={100} fontSize={12} fill="var(--color-muted)">
          organigrama.pdf · plantilla-acta.docx
        </text>
        <text x={304} y={118} fontSize={12} fill="var(--color-muted)">
          política-viajes.pdf · estilo-correos.txt
        </text>
        {["Acta comité 14/11", "Viaje Bruselas", "Correos consejo"].map((title, i) => (
          <g key={title}>
            <rect
              x={30 + i * 170}
              y={160}
              width={160}
              height={60}
              rx={10}
              fill="var(--color-surface)"
              stroke="var(--subject-color, var(--color-ink))"
              strokeDasharray="5 4"
            />
            <text
              x={110 + i * 170}
              y={186}
              textAnchor="middle"
              fontSize={13}
              fontWeight={700}
              fill="var(--color-ink)"
            >
              Chat
            </text>
            <text
              x={110 + i * 170}
              y={205}
              textAnchor="middle"
              fontSize={12}
              fill="var(--color-muted)"
            >
              {title}
            </text>
          </g>
        ))}
        <line x1={280} y1={136} x2={280} y2={156} stroke="var(--color-ink-soft)" strokeWidth={2} />
      </svg>
    </Figure>
  );
}
