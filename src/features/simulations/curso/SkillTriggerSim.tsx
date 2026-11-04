import { useState, type ReactNode } from "react";

import { Choice, SimFrame, Stat } from "@/features/simulations/kit";

import styles from "./Curso.module.css";
import {
  matchSkills,
  minutesSkill,
  OTHER_SKILLS,
  SKILL_REQUESTS,
  verdict,
  type MatchVerdict,
  type MinutesDescription,
} from "./skills";

const VERDICT: Record<MatchVerdict, string> = {
  acierta: "Carga la skill correcta.",
  falla: "Falla: no carga la que tocaba (o carga una que no).",
  duda: "Duda: encajan varias y puede usar la que no es.",
  ninguna: "Ninguna encaja y responde sin skills, que es lo correcto.",
};

export default function SkillTriggerSim(): ReactNode {
  const [kind, setKind] = useState<MinutesDescription>("vaga");
  const [requestId, setRequestId] = useState("acta");
  const skills = [minutesSkill(kind), ...OTHER_SKILLS];
  const request = SKILL_REQUESTS.find((r) => r.id === requestId) ?? SKILL_REQUESTS[0];
  if (!request) return null;
  const matched = matchSkills(request, skills);
  const result = verdict(request, matched);
  const loadedLines = matched.reduce((sum, s) => sum + s.bodyLines, 0);

  return (
    <SimFrame
      title="Cómo elige Claude una skill"
      intro="Claude no lee tus skills enteras: solo su nombre y su descripción. Cuando una encaja con lo que pides, entonces carga sus instrucciones. Prueba las peticiones con la descripción «vaga» de la skill del acta y luego con la «concreta»."
      onReset={() => {
        setKind("vaga");
        setRequestId("acta");
      }}
      controls={
        <>
          <Choice
            label="Descripción de acta-de-reunion"
            value={kind}
            onChange={setKind}
            options={[
              { value: "vaga", label: "Vaga" },
              { value: "concreta", label: "Concreta" },
            ]}
          />
          <Choice
            label="Le pides"
            value={requestId}
            onChange={setRequestId}
            options={SKILL_REQUESTS.map((r) => ({ value: r.id, label: r.label }))}
          />
        </>
      }
      readout={
        <>
          <Stat
            label="Resultado"
            value={VERDICT[result]}
            tone={result === "acierta" || result === "ninguna" ? "good" : "bad"}
          />
          <Stat
            label="Instrucciones cargadas"
            value={
              matched.length === 0
                ? "ninguna"
                : `${matched.map((s) => s.name).join(" + ")} (${loadedLines} líneas)`
            }
          />
        </>
      }
    >
      <div className={styles.panes} aria-live="polite">
        {skills.map((skill) => {
          const isLoaded = matched.includes(skill);
          return (
            <div key={skill.id} className={styles.skillRow} data-loaded={isLoaded}>
              <span className={styles.skillName}>
                {skill.name}
                {skill.isBuiltIn ? " · de Anthropic" : " · tuya"}
              </span>
              <span className={styles.badge}>
                {isLoaded ? `cargada: ${skill.bodyLines} líneas` : "solo nombre y descripción"}
              </span>
              <span className={styles.skillDesc}>{skill.description}</span>
            </div>
          );
        })}
      </div>
    </SimFrame>
  );
}
