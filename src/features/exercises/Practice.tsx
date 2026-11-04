import { useId, useState, type ReactNode } from "react";

import { es } from "@/i18n/es";

import { ExerciseFrame } from "./ExerciseFrame";
import { useExerciseProgress } from "./exercise-scope";
import { HintsAndSolution } from "./HintsAndSolution";
import styles from "./Exercise.module.css";

interface Props {
  id: string;
  title?: string;
  /** What to do, in a sentence or two. */
  children: ReactNode;
  /** The checklist, one action per step, done in the real tool (Claude, ChatGPT, Gemini…). */
  steps: readonly ReactNode[];
  hints?: readonly ReactNode[];
  /** A worked example: a prompt, the settings used, what a good result looks like. */
  example: ReactNode;
}

/**
 * A hands-on task done outside the app, in the real assistant. Nothing can be checked
 * automatically, so it is solved when every step is ticked and "Lo he hecho" is pressed.
 */
export function Practice({
  id,
  title = es.exercise.practiceTitle,
  children,
  steps,
  hints = [],
  example,
}: Props): ReactNode {
  const name = useId();
  const { isSolved, markSolved } = useExerciseProgress(id);
  const [ticked, setTicked] = useState<readonly boolean[]>(() => steps.map(() => isSolved));
  const isAllTicked = ticked.every(Boolean);

  return (
    <ExerciseFrame title={title} isSolved={isSolved}>
      <div className={styles.prompt}>{children}</div>
      <fieldset className={styles.steps} aria-labelledby={`${name}-steps`}>
        <legend id={`${name}-steps`} className={styles.revealLabel}>
          {es.exercise.practiceSteps}
        </legend>
        {steps.map((step, i) => (
          <label key={i} className={styles.step} data-done={ticked[i]}>
            <input
              type="checkbox"
              checked={ticked[i] ?? false}
              onChange={(event) => {
                const isOn = event.target.checked;
                setTicked((prev) => prev.map((v, j) => (j === i ? isOn : v)));
              }}
            />
            <span className={styles.stepNumber}>{i + 1}</span>
            <span>{step}</span>
          </label>
        ))}
      </fieldset>
      <HintsAndSolution
        hints={hints}
        leading={
          <button
            type="button"
            className={`${styles.button} ${styles.primary}`}
            onClick={markSolved}
            disabled={!isAllTicked || isSolved}
            title={isAllTicked ? undefined : es.exercise.practiceDoneHint}
          >
            {es.exercise.practiceDone}
          </button>
        }
        solution={
          <div className={styles.reveal}>
            <span className={styles.revealLabel}>{es.exercise.practiceExample}</span>
            <div className={styles.explanation}>{example}</div>
          </div>
        }
      />
    </ExerciseFrame>
  );
}
