import { ChevronRight, MousePointerClick } from "lucide-react";
import { Fragment, type ReactNode } from "react";

import { es } from "@/i18n/es";

import styles from "./Ui.module.css";

interface Props {
  /** The clicks, in order: ["Ajustes", "Capacidades", "Skills"]. */
  to: readonly string[];
}

/** Where a setting lives in the interface, as a breadcrumb of clicks. */
export function MenuPath({ to }: Props): ReactNode {
  return (
    <span className={styles.menuPath} aria-label={`${es.path.label}: ${to.join(", ")}`}>
      <MousePointerClick size={14} aria-hidden="true" />
      {to.map((step, i) => (
        <Fragment key={step}>
          {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
          <kbd>{step}</kbd>
        </Fragment>
      ))}
    </span>
  );
}
