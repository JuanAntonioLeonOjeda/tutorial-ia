import { useState, type ReactNode } from "react";

import { ControlNote, SimFrame, Stat, Toggle } from "@/features/simulations/kit";

import styles from "./Curso.module.css";
import { answerFor, buildPrompt, INGREDIENTS, type Ingredient } from "./prompt-builder";

/** Marks the [gaps] the model left, so they stand out in the answer. */
function withGaps(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\])/g).map((part, i) =>
    /^\[[^\]]+\]$/.test(part) ? (
      <mark key={i} className={styles.placeholder}>
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function PromptBuilderSim(): ReactNode {
  const [on, setOn] = useState<readonly Ingredient[]>([]);
  const answer = answerFor(on);

  return (
    <SimFrame
      title="Los ingredientes de un buen prompt"
      intro="Misma petición, distinto prompt. Activa los ingredientes uno a uno y mira cómo cambia la respuesta y cuánto te queda por retocar a mano."
      onReset={() => {
        setOn([]);
      }}
      controls={
        <>
          {INGREDIENTS.map((ingredient) => (
            <Toggle
              key={ingredient.id}
              label={ingredient.label}
              isOn={on.includes(ingredient.id)}
              onChange={(isOn) => {
                setOn((prev) =>
                  isOn ? [...prev, ingredient.id] : prev.filter((i) => i !== ingredient.id),
                );
              }}
            />
          ))}
          <ControlNote>
            La tarea («escribe un correo para cambiar la reunión») va siempre.
          </ControlNote>
        </>
      }
      readout={
        <>
          <Stat label="Ingredientes" value={`${on.length} de ${INGREDIENTS.length}`} />
          <Stat
            label="Retoques a mano"
            value={answer.fixes.length === 0 ? "ninguno: listo para enviar" : answer.fixes.length}
            tone={answer.fixes.length === 0 ? "good" : answer.fixes.length >= 4 ? "bad" : "default"}
          />
        </>
      }
    >
      <div className={styles.panes}>
        <section className={styles.pane} aria-label="Tu prompt">
          <div className={styles.paneHead}>Tu prompt</div>
          <pre className={styles.paneBody}>{buildPrompt(on)}</pre>
        </section>
        <section className={styles.pane} aria-label="La respuesta" aria-live="polite">
          <div className={styles.paneHead}>La respuesta</div>
          <pre className={styles.paneBody}>{withGaps(answer.text)}</pre>
        </section>
        {answer.fixes.length > 0 && (
          <section className={styles.pane} aria-label="Lo que tendrías que arreglar">
            <div className={styles.paneHead}>Lo que tendrías que arreglar tú</div>
            <div className={styles.paneBody}>
              <ul className={styles.fixes}>
                {answer.fixes.map((fix) => (
                  <li key={fix}>{fix}</li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </SimFrame>
  );
}
