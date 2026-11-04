import { Check, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";

import { dedent } from "./dedent";
import { es } from "@/i18n/es";

import styles from "./Ui.module.css";

interface Props {
  /** The prompt, as a template literal; common indentation is removed. */
  text: string;
  title?: string;
}

/** Splits the text so `[PLACEHOLDERS]` can be highlighted as "fill this in". */
export function splitPlaceholders(text: string): { text: string; isPlaceholder: boolean }[] {
  return text
    .split(/(\[[^\]\n]+\])/g)
    .filter((part) => part !== "")
    .map((part) => ({ text: part, isPlaceholder: /^\[[^\]\n]+\]$/.test(part) }));
}

/** A ready-to-copy prompt, with its placeholders highlighted. */
export function Prompt({ text, title = es.prompt.label }: Props): ReactNode {
  const clean = dedent(text);
  const parts = splitPlaceholders(clean);
  const hasPlaceholders = parts.some((p) => p.isPlaceholder);
  const [isCopied, setIsCopied] = useState(false);

  async function copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(clean);
      setIsCopied(true);
      window.setTimeout(() => {
        setIsCopied(false);
      }, 1800);
    } catch {
      // Clipboard blocked (permissions, insecure origin): the text can still be selected.
    }
  }

  return (
    <figure className={styles.prompt}>
      <figcaption className={styles.promptHead}>
        <span>{title}</span>
        <button
          type="button"
          className={styles.promptCopy}
          onClick={() => {
            void copy();
          }}
        >
          {isCopied ? (
            <Check size={14} aria-hidden="true" />
          ) : (
            <Copy size={14} aria-hidden="true" />
          )}
          {isCopied ? es.prompt.copied : es.prompt.copy}
        </button>
      </figcaption>
      <pre className={styles.promptBody}>
        {parts.map((part, i) =>
          part.isPlaceholder ? (
            <mark key={i} className={styles.placeholder}>
              {part.text}
            </mark>
          ) : (
            <span key={i}>{part.text}</span>
          ),
        )}
      </pre>
      {hasPlaceholders && <p className={styles.promptNote}>{es.prompt.placeholders}</p>}
    </figure>
  );
}
