import { chatgpt } from "./chatgpt";
import { claude } from "./claude";
import { fundamentos } from "./fundamentos";
import { gemini } from "./gemini";
import { otrasHerramientas } from "./otras-herramientas";
import { superpoderes } from "./superpoderes";
import type { Subject } from "./types";
import { unPasoMas } from "./un-paso-mas";

/** The course modules in the order they are shown on the home page. */
export const subjects: readonly Subject[] = [
  fundamentos,
  claude,
  superpoderes,
  chatgpt,
  gemini,
  otrasHerramientas,
];

/** "Un paso más": optional lessons that need a little code, browsed like a module. */
export const extras: readonly Subject[] = [unPasoMas];

/** Every browsable section (modules and extras), for routing and progress. */
export const sections: readonly Subject[] = [...subjects, ...extras];
