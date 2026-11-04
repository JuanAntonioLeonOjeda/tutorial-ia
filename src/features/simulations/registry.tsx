import { lazy, Suspense, type ComponentType, type ReactNode } from "react";

import { es } from "@/i18n/es";

/** Wraps a lazily loaded simulation so each one is its own chunk, loaded when a lesson uses it. */
function lazySim(load: () => Promise<{ default: ComponentType }>): ComponentType {
  const Component = lazy(load);
  return function LazySimulation(): ReactNode {
    return (
      <Suspense fallback={<p>{es.sim.loading}</p>}>
        <Component />
      </Suspense>
    );
  };
}

/** Every simulation a lesson can use, by the name used in MDX (`<PromptBuilderSim />`). */
export const simulations = {
  AutomationBuilderSim: lazySim(() => import("./curso/AutomationBuilderSim")),
  ConnectorsSim: lazySim(() => import("./curso/ConnectorsSim")),
  ContextWindowSim: lazySim(() => import("./curso/ContextWindowSim")),
  CoworkSim: lazySim(() => import("./curso/CoworkSim")),
  PromptBuilderSim: lazySim(() => import("./curso/PromptBuilderSim")),
  SkillTriggerSim: lazySim(() => import("./curso/SkillTriggerSim")),
} satisfies Record<string, ComponentType>;
