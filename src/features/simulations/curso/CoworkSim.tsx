import { useState, type ReactNode } from "react";

import {
  ButtonRow,
  ControlNote,
  SimButton,
  SimFrame,
  Stat,
  Toggle,
} from "@/features/simulations/kit";

import { agentRun, TASK, type StepKind } from "./cowork";
import styles from "./Curso.module.css";

const KIND: Record<StepKind, string> = {
  plan: "Planifica",
  leer: "Lee",
  buscar: "Busca",
  observar: "Se da cuenta",
  crear: "Crea",
  permiso: "Te pregunta",
  enviar: "Envía",
  fin: "Termina",
};

export default function CoworkSim(): ReactNode {
  const [askFirst, setAskFirst] = useState(true);
  const [approved, setApproved] = useState<boolean | null>(null);
  const [shown, setShown] = useState(1);
  const steps = agentRun(askFirst, approved);
  const visible = steps.slice(0, shown);
  const last = visible.at(-1);
  const isWaiting = last?.kind === "permiso" && approved === null;
  const isDone = last?.kind === "fin";

  function reset(nextAskFirst = askFirst): void {
    setAskFirst(nextAskFirst);
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
      intro="Un agente no responde de una vez: planifica, usa herramientas, mira el resultado y sigue. Avanza paso a paso. Luego desactiva «Preguntar antes de enviar» y repite."
      onReset={() => {
        reset(true);
      }}
      controls={
        <>
          <Toggle
            label="Preguntar antes de enviar o borrar"
            isOn={askFirst}
            onChange={(isOn) => {
              reset(isOn);
            }}
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
            Fíjate en el paso amarillo: es el momento de revisar antes de que algo salga de tu
            ordenador.
          </ControlNote>
        </>
      }
      readout={
        <>
          <Stat label="Pasos" value={`${visible.length}`} />
          <Stat
            label="Estado"
            value={isWaiting ? "Esperando tu permiso" : isDone ? "Terminado" : "Trabajando"}
            tone={isDone ? (askFirst ? "good" : "bad") : "default"}
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
