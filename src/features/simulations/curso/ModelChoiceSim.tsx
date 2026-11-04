import { useState, type ReactNode } from "react";

import { Choice, ControlNote, SimFrame, Stat } from "@/features/simulations/kit";

import styles from "./Curso.module.css";
import {
  chooseModel,
  EFFORTS,
  MODEL_TASKS,
  MODELS,
  type EffortId,
  type ModelId,
  type ModelVerdict,
} from "./model-choice";

const VERDICT: Record<ModelVerdict, string> = {
  corto: "Te quedas corta: es fácil que se le escape algo. Sube el modelo o el esfuerzo.",
  acertado: "Bien elegido: calidad suficiente sin gastar de más.",
  "de-mas": "Funciona, pero gastas límite y tiempo de más para lo que es.",
};

/** A row of six blocks, `value` of them filled: a relative scale, not a number. */
function Meter({ value, label }: { value: number; label: string }): ReactNode {
  return (
    <span className={styles.meter} role="img" aria-label={`${label}: ${value} de 6`}>
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} data-on={i < value} />
      ))}
    </span>
  );
}

export default function ModelChoiceSim(): ReactNode {
  const [taskId, setTaskId] = useState("correo");
  const [model, setModel] = useState<ModelId>("equilibrado");
  const [effort, setEffort] = useState<EffortId>("medio");
  const task = MODEL_TASKS.find((t) => t.id === taskId) ?? MODEL_TASKS[0];
  if (!task) return null;
  const outcome = chooseModel(task, model, effort);

  return (
    <SimFrame
      title="Qué modelo y cuánto esfuerzo"
      intro="Elige una tarea y prueba combinaciones de modelo y esfuerzo. Busca la más barata que salga «bien elegido»: esa es la que deberías usar."
      onReset={() => {
        setTaskId("correo");
        setModel("equilibrado");
        setEffort("medio");
      }}
      controls={
        <>
          <Choice
            label="La tarea"
            value={taskId}
            onChange={setTaskId}
            options={MODEL_TASKS.map((t) => ({ value: t.id, label: t.label }))}
          />
          <Choice
            label="Modelo"
            value={model}
            onChange={setModel}
            options={MODELS.map((m) => ({ value: m.id, label: m.label }))}
          />
          <Choice
            label="Esfuerzo"
            value={effort}
            onChange={setEffort}
            options={EFFORTS.map((e) => ({ value: e.id, label: e.label }))}
          />
          <ControlNote>
            Escala orientativa. La ayuda de Claude dice que el modelo y el esfuerzo influyen en el
            consumo y que más esfuerzo es más lento y gasta más; no da cifras por modelo. «Muy alto»
            queda fuera: es para tareas largas de agente.
          </ControlNote>
        </>
      }
      readout={
        <>
          <Stat
            label="Resultado"
            value={VERDICT[outcome.verdict]}
            tone={outcome.verdict === "acertado" ? "good" : "bad"}
          />
          <Stat
            label="Consumo de tu límite"
            value={<Meter value={outcome.usage} label="Consumo" />}
          />
          <Stat label="Rapidez" value={<Meter value={outcome.speed} label="Rapidez" />} />
        </>
      }
    >
      <div className={styles.task} aria-live="polite">
        <strong>{task.label}.</strong> {task.why}
      </div>
    </SimFrame>
  );
}
