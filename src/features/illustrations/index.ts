import type { ComponentType } from "react";

import { AgentLoopDiagram } from "./AgentLoopDiagram";
import { LadderDiagram } from "./LadderDiagram";
import { ProjectDiagram } from "./ProjectDiagram";

/** Static diagrams a lesson can use by name, like the simulations. */
export const illustrations: Record<string, ComponentType> = {
  AgentLoopDiagram,
  LadderDiagram,
  ProjectDiagram,
};
