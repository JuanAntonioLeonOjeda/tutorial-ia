import { describe, expect, it } from "vitest";

import { connectorsNeeded, nextRuns, taskInstruction } from "./automation";
import { REQUESTS, resolveRequest } from "./connectors";
import { CONTEXT_CAPACITY, fillContext, layoutSegments } from "./context-window";
import { agentRun } from "./cowork";
import { answerFor, buildPrompt, INGREDIENTS } from "./prompt-builder";
import { chooseModel, MODEL_TASKS, type ModelTask } from "./model-choice";
import { matchSkills, minutesSkill, OTHER_SKILLS, SKILL_REQUESTS, verdict } from "./skills";

describe("fillContext", () => {
  it("adds documents and conversation and classifies the fill", () => {
    expect(fillContext([], 0)).toMatchObject({ used: 0, status: "holgado" });
    const big = fillContext(["informe", "excel"], 10);
    expect(big.used).toBe(85 + 90 + 15);
    expect(big.status).toBe("al-limite");
    const over = fillContext(["informe", "excel", "hilo"], 40);
    expect(over.status).toBe("desborda");
    expect(over.overflow).toBe(over.used - CONTEXT_CAPACITY);
  });
});

describe("prompt builder", () => {
  it("starts with the role when it is on and always has the task", () => {
    expect(buildPrompt([])).toBe("Escribe un correo para cambiar la reunión del comité.");
    expect(buildPrompt(["rol", "contexto"]).split("\n")[0]).toMatch(/^Eres mi ayudante/);
  });

  it("leaves fewer things to fix with every ingredient", () => {
    const all = INGREDIENTS.map((i) => i.id);
    expect(answerFor([]).fixes.length).toBe(5);
    expect(answerFor(all).fixes).toEqual([]);
    expect(answerFor(["contexto"]).text).toContain("martes 19");
    expect(answerFor([]).text).toContain("[nueva fecha]");
  });
});

describe("connectors", () => {
  it("answers only with every connector it needs, and asks before writing", () => {
    const briefing = REQUESTS.find((r) => r.id === "briefing");
    const mover = REQUESTS.find((r) => r.id === "mover");
    if (!briefing || !mover) throw new Error("missing request");
    expect(resolveRequest(briefing, ["correo"])).toEqual({
      missing: ["calendario", "drive"],
      canAnswer: false,
      needsApproval: false,
    });
    expect(resolveRequest(mover, ["calendario"]).needsApproval).toBe(true);
  });
});

describe("skills", () => {
  const verdicts = (kind: "vaga" | "concreta"): Record<string, string> => {
    const skills = [minutesSkill(kind), ...OTHER_SKILLS];
    return Object.fromEntries(
      SKILL_REQUESTS.map((r) => [r.id, verdict(r, matchSkills(r, skills))]),
    );
  };

  it("a specific description gets every request right", () => {
    expect(verdicts("concreta")).toEqual({
      acta: "acierta",
      acuerdos: "acierta",
      declinar: "acierta",
      bruselas: "acierta",
      word: "acierta",
      tiempo: "ninguna",
    });
  });

  it("a vague one misses its own requests and gets in the way of others", () => {
    const v = verdicts("vaga");
    expect(v.acta).toBe("falla");
    expect(v.acuerdos).toBe("falla");
    expect(v.word).toBe("duda");
  });
});

describe("automation", () => {
  // Wednesday 4 November 2026, 10:00 local time.
  const from = new Date(2026, 10, 4, 10, 0);

  it("computes the next runs after now", () => {
    expect(nextRuns("laborables", from, 3).map((d) => d.getDate())).toEqual([5, 6, 9]);
    expect(nextRuns("lunes", from, 2).map((d) => d.getDate())).toEqual([9, 16]);
    expect(nextRuns("viernes", from, 1)[0]?.getHours()).toBe(14);
    expect(nextRuns("hora", from, 3).map((d) => d.getHours())).toEqual([11, 12, 13]);
  });

  it("includes today when the hour has not passed", () => {
    const early = new Date(2026, 10, 4, 7, 0);
    expect(nextRuns("laborables", early, 1)[0]?.getDate()).toBe(4);
  });

  it("lists every connector once and writes a full instruction", () => {
    expect(connectorsNeeded("semana", "borrador")).toEqual(["calendario", "correo", "drive"]);
    expect(taskInstruction("vencimientos", "tarea")).toMatch(/Seguimiento.*en la tarea.*suponerlo/);
  });
});

describe("cowork agent run", () => {
  it("in manual mode stops at the approval step until the person answers", () => {
    expect(agentRun("manual", null).at(-1)?.kind).toBe("permiso");
    expect(agentRun("manual", false).some((s) => s.kind === "enviar")).toBe(false);
    expect(agentRun("manual", true).at(-1)?.kind).toBe("fin");
  });

  it("in auto mode checks safety but sends a harmless email without asking", () => {
    const steps = agentRun("auto", null);
    expect(steps.some((s) => s.kind === "permiso")).toBe(false);
    expect(steps.map((s) => s.kind)).toContain("revisar");
    expect(steps.some((s) => s.kind === "enviar")).toBe(true);
  });

  it("in skip mode neither asks nor checks", () => {
    const kinds = agentRun("skip", null).map((s) => s.kind);
    expect(kinds).not.toContain("permiso");
    expect(kinds).not.toContain("revisar");
    expect(kinds).toContain("enviar");
  });
});

describe("layoutSegments", () => {
  it("places segments one after another", () => {
    const fill = fillContext(["instrucciones", "acta"], 2);
    expect(layoutSegments(fill.segments, 10, 2).map((s) => [s.x, s.width])).toEqual([
      [10, 2],
      [12, 14],
      [26, 6],
    ]);
  });
});

describe("chooseModel", () => {
  const task = (id: string): ModelTask => {
    const t = MODEL_TASKS.find((x) => x.id === id);
    if (!t) throw new Error(id);
    return t;
  };

  it("routine work is fine on the fast model and wasteful on the most capable at high effort", () => {
    expect(chooseModel(task("correo"), "rapido", "medio").verdict).toBe("acertado");
    expect(chooseModel(task("correo"), "equilibrado", "medio").verdict).toBe("acertado");
    expect(chooseModel(task("correo"), "capaz", "alto").verdict).toBe("de-mas");
  });

  it("hard work falls short on small models or low effort", () => {
    expect(chooseModel(task("contrato"), "equilibrado", "medio").verdict).toBe("corto");
    expect(chooseModel(task("contrato"), "rapido", "maximo").verdict).toBe("corto");
    expect(chooseModel(task("contrato"), "capaz", "medio").verdict).toBe("acertado");
    expect(chooseModel(task("agendas"), "equilibrado", "maximo").verdict).toBe("acertado");
  });

  it("usage grows with model and effort, and speed falls", () => {
    const low = chooseModel(task("acta"), "rapido", "bajo");
    const high = chooseModel(task("acta"), "capaz", "maximo");
    expect([low.usage, high.usage]).toEqual([1, 6]);
    expect(low.speed).toBeGreaterThan(high.speed);
  });
});
