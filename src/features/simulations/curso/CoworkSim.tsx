import { useState, type ReactNode } from "react";

import {
  ButtonRow,
  Choice,
  ControlNote,
  SimButton,
  SimFrame,
  Stat,
} from "@/features/simulations/kit";

import { agentRun, APPROVAL_MODES, TASK, type ApprovalMode, type StepKind } from "./cowork";
import styles from "./Curso.module.css";

const KIND: Record<StepKind, string> = {
  plan: "Planifica",
  leer: "Lee",
  buscar: "Busca",
  observar: "Se da cuenta",
  crear: "Crea",
  revisar: "Se autorrevisa",
  permiso: "Te pregunta",
  enviar: "Envía",
  fin: "Termina",
};

export default function CoworkSim(): ReactNode {
  const [mode, setMode] = useState<ApprovalMode>("manual");
  const [approved, setApproved] = useState<boolean | null>(null);
  const [shown, setShown] = useState(1);
  const steps = agentRun(mode, approved);
  const visible = steps.slice(0, shown);
  const last = visible.at(-1);
  const isWaiting = last?.kind === "permiso" && approved === null;
  const isDone = last?.kind === "fin";

  function reset(nextMode: ApprovalMode = mode): void {
    setMode(nextMode);
    setApproved(null);
    setShown(1);
  }

  function answer(isYes: boolean): void {
    setApproved(isYes);
    setShown((n) => n + 1);
  }

  return (
    <SimFrame
      title="Un agente trabajando (y cuándo te pregunta)"
      intro="Un agente no responde de una vez: planifica, usa herramientas, mira el resultado y sigue. Avanza paso a paso con «Aprobar a mano» y luego repite con «Aprobar automáticamente», que es el modo por defecto en muchos planes."
      onReset={() => {
        reset("manual");
      }}
      controls={
        <>
          <Choice
            label="Modo de aprobación"
            value={mode}
            onChange={(next) => {
              reset(next);
            }}
            options={APPROVAL_MODES.map((m) => ({ value: m.id, label: m.label }))}
          />
          <ButtonRow>
            <SimButton
              isPrimary
              onClick={() => {
                setShown((n) => n + 1);
              }}
              isDisabled={isWaiting || isDone}
            >
              Siguiente paso
            </SimButton>
          </ButtonRow>
          {isWaiting && (
            <ButtonRow>
              <SimButton
                isPrimary
                onClick={() => {
                  answer(true);
                }}
              >
                Permitir
              </SimButton>
              <SimButton
                onClick={() => {
                  answer(false);
                }}
              >
                Mejor no
              </SimButton>
            </ButtonRow>
          )}
          <ControlNote>
            En automático, Claude solo frena lo que su comprobación ve peligroso (como sacar datos
            fuera o instrucciones escondidas en una web). Mandar algo a tu jefa no lo es: lo envía.
          </ControlNote>
        </>
      }
      readout={
        <>
          <Stat label="Pasos" value={`${visible.length}`} />
          <Stat
            label="Estado"
            value={isWaiting ? "Esperando tu permiso" : isDone ? "Terminado" : "Trabajando"}
            tone={isDone ? (mode === "manual" ? "good" : "bad") : "default"}
          />
        </>
      }
    >
      <div className={styles.panes}>
        <div className={styles.task}>
          <strong>La tarea:</strong> {TASK}
        </div>
        <ol className={styles.log} aria-live="polite">
          {visible.map((step, i) => (
            <li key={i} className={styles.logItem} data-kind={step.kind}>
              <span className={styles.kind}>{KIND[step.kind]}</span>
              <span>{step.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </SimFrame>
  );
}
