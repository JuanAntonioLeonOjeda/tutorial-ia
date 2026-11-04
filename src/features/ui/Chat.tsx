import type { ReactNode } from "react";

import { dedent } from "./dedent";
import { es } from "@/i18n/es";

import styles from "./Ui.module.css";

export interface ChatMessage {
  from: "tu" | "ia";
  text: string;
  /** A small grey note under the bubble: "adjunta acta.pdf", "usa Gmail"… */
  note?: string;
}

interface Props {
  messages: readonly ChatMessage[];
  title?: string;
  /** Who answers, shown on the assistant's bubbles. */
  assistant?: string;
}

/** A mock conversation, to show what a good exchange looks like without a screenshot. */
export function Chat({
  messages,
  title = es.chat.label,
  assistant = es.chat.assistant,
}: Props): ReactNode {
  return (
    <figure className={styles.chat}>
      <figcaption className={styles.chatTitle}>{title}</figcaption>
      <ol className={styles.chatList}>
        {messages.map((message, i) => (
          <li key={i} className={styles.chatMessage} data-from={message.from}>
            <span className={styles.chatWho}>
              {message.from === "tu" ? es.chat.you : assistant}
            </span>
            <div className={styles.chatBubble}>{dedent(message.text)}</div>
            {message.note !== undefined && <span className={styles.chatNote}>{message.note}</span>}
          </li>
        ))}
      </ol>
    </figure>
  );
}
