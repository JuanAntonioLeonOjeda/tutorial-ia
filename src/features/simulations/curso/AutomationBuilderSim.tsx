import { useState, type ReactNode } from "react";

import { Choice, ControlNote, SimFrame, Stat } from "@/features/simulations/kit";

import {
  connectorsNeeded,
  nextRuns,
  taskInstruction,
  WHAT,
  WHEN,
  WHERE,
  type WhatId,
  type WhenId,
  type WhereId,
} from "./automation";
import { CONNECTORS } from "./connectors";
import styles from "./Curso.module.css";

const DATE = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

export default function AutomationBuilderSim(): ReactNode {
  const [when, setWhen] = useState<WhenId>("laborables");
  const [what, setWhat] = useState<WhatId>("agenda");
  const [where, setWhere] = useState<WhereId>("tarea");
  // "Now" is fixed when the simulation opens, so the list does not jump while you play.
  const [now] = useState(() => new Date());
  const runs = nextRuns(when, now, 4);
  const needs = connectorsNeeded(what, where).map(
    (id) => CONNECTORS.find((c) => c.id === id)?.label ?? id,
  );

  return (
    <SimFrame
      title="Monta una tarea programada"
      intro="Una automatización son tres decisiones: cuándo se ejecuta, qué tiene que hacer y dónde te deja el resultado. Combínalas y mira la instrucción que escribirías y cuándo se ejecutaría."
      onReset={() => {
        setWhen("laborables");
        setWhat("agenda");
        setWhere("tarea");
      }}
      controls={
        <>
          <Choice
            label="Cuándo"
            value={when}
            onChange={setWhen}
            options={WHEN.map((w) => ({ value: w.id, label: w.label }))}
          />
          <Choice
            label="Qué"
            value={what}
            onChange={setWhat}
            options={WHAT.map((w) => ({ value: w.id, label: w.label }))}
          />
          <Choice
            label="Dónde lo deja"
            value={where}
            onChange={setWhere}
            options={WHERE.map((w) => ({ value: w.id, label: w.label }))}
          />
          <ControlNote>
            Un borrador y no un envío: la tarea trabaja sola, tú revisas antes de que salga nada.
          </ControlNote>
        </>
      }
      readout={
        <Stat
          label="Conectores que necesita"
          value={needs.length === 0 ? "ninguno" : needs.join(", ")}
        />
      }
    >
      <div className={styles.panes}>
        <section className={styles.pane} aria-label="La instrucción de la tarea">
          <div className={styles.paneHead}>La instrucción de la tarea</div>
          <p className={styles.paneBody}>{taskInstruction(what, where)}</p>
        </section>
        <section className={styles.pane} aria-label="Próximas ejecuciones">
          <div className={styles.paneHead}>Próximas ejecuciones</div>
          <div className={styles.paneBody}>
            <ol className={styles.runs}>
              {runs.map((run) => (
                <li key={run.toISOString()}>{DATE.format(run)}</li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </SimFrame>
  );
}
