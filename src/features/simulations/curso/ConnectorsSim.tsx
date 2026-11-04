import { useState, type ReactNode } from "react";

import { Choice, ControlNote, SimFrame, Stat, Toggle } from "@/features/simulations/kit";

import { CONNECTORS, REQUESTS, resolveRequest, type ConnectorId } from "./connectors";

const W = 560;
const H = 250;
const HUB = { x: W / 2, y: H / 2 };
const POSITION: Record<ConnectorId, { x: number; y: number }> = {
  correo: { x: 90, y: 50 },
  calendario: { x: W - 90, y: 50 },
  drive: { x: 90, y: H - 50 },
  chat: { x: W - 90, y: H - 50 },
};

export default function ConnectorsSim(): ReactNode {
  const [connected, setConnected] = useState<readonly ConnectorId[]>(["correo"]);
  const [requestId, setRequestId] = useState("manana");
  const request = REQUESTS.find((r) => r.id === requestId) ?? REQUESTS[0];
  if (!request) return null;
  const result = resolveRequest(request, connected);
  const label = (id: ConnectorId): string => CONNECTORS.find((c) => c.id === id)?.label ?? id;

  const outcome = result.canAnswer
    ? result.needsApproval
      ? `Lo tiene todo, pero va a cambiar algo: te enseña lo que hará y espera tu «Permitir». ${request.answer}`
      : request.answer
    : `No puede verlo: le falta ${result.missing.map(label).join(" y ")}. Te pedirá que lo pegues tú o que conectes la herramienta (y si insistes, se lo puede inventar: ojo).`;

  return (
    <SimFrame
      title="Conectores: lo que Claude puede ver"
      intro="Sin conectores, Claude solo sabe lo que le pegas en el chat. Elige una petición y enchufa o desenchufa herramientas: mira qué necesita cada una."
      onReset={() => {
        setConnected(["correo"]);
        setRequestId("manana");
      }}
      controls={
        <>
          <Choice
            label="Le pides"
            value={requestId}
            onChange={setRequestId}
            options={REQUESTS.map((r) => ({ value: r.id, label: r.label }))}
          />
          {CONNECTORS.map((c) => (
            <Toggle
              key={c.id}
              label={`${c.label} (${c.examples})`}
              isOn={connected.includes(c.id)}
              onChange={(isOn) => {
                setConnected((prev) => (isOn ? [...prev, c.id] : prev.filter((id) => id !== c.id)));
              }}
            />
          ))}
          <ControlNote>
            Las líneas rojas son lo que la petición necesita y no está conectado.
          </ControlNote>
        </>
      }
      readout={
        <>
          <Stat
            label="Resultado"
            value={
              result.canAnswer ? (result.needsApproval ? "Pide permiso" : "Responde") : "No puede"
            }
            tone={result.canAnswer ? "good" : "bad"}
          />
          <Stat label="Lo que pasa" value={outcome} />
        </>
      }
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Petición: ${request.label}. Necesita ${request.needs.map(label).join(", ")}. ${result.canAnswer ? "Puede responder." : `Le falta ${result.missing.map(label).join(", ")}.`}`}
      >
        {CONNECTORS.map((c) => {
          const p = POSITION[c.id];
          const isOn = connected.includes(c.id);
          const isNeeded = request.needs.includes(c.id);
          const stroke = isNeeded
            ? isOn
              ? "var(--subject-color)"
              : "var(--color-bad)"
            : "var(--color-line)";
          return (
            <g key={c.id}>
              <line
                x1={HUB.x}
                y1={HUB.y}
                x2={p.x}
                y2={p.y}
                stroke={stroke}
                strokeWidth={isNeeded ? 4 : 2}
                strokeDasharray={isOn ? undefined : "6 6"}
              />
              <rect
                x={p.x - 70}
                y={p.y - 24}
                width={140}
                height={48}
                rx={10}
                fill={isOn ? "var(--subject-soft)" : "var(--color-surface-sunken)"}
                stroke={stroke}
                strokeWidth={2}
              />
              <text
                x={p.x}
                y={p.y - 3}
                textAnchor="middle"
                fontSize={14}
                fontWeight={700}
                fill="var(--color-ink)"
              >
                {c.label}
              </text>
              <text
                x={p.x}
                y={p.y + 15}
                textAnchor="middle"
                fontSize={11}
                fill="var(--color-muted)"
              >
                {isOn ? "conectado" : "sin conectar"}
                {isNeeded ? " · lo necesita" : ""}
              </text>
            </g>
          );
        })}
        <circle
          cx={HUB.x}
          cy={HUB.y}
          r={42}
          fill="var(--color-surface)"
          stroke="var(--subject-color)"
          strokeWidth={3}
        />
        <text
          x={HUB.x}
          y={HUB.y + 5}
          textAnchor="middle"
          fontSize={16}
          fontWeight={700}
          fill="var(--subject-color)"
        >
          Claude
        </text>
      </svg>
    </SimFrame>
  );
}
