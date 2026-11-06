import type { ReactNode } from "react";

import type { SubjectSlug } from "@/content/types";

/** One small drawing per module, made of what the module is about. */
export function SubjectIcon({ slug, size = 56 }: { slug: SubjectSlug; size?: number }): ReactNode {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 56 56",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (slug) {
    case "fundamentos":
      // A chat bubble: where everything starts.
      return (
        <svg {...common}>
          <path d="M8 12 H48 V36 H24 L14 45 V36 H8 Z" />
          <path d="M16 21 H40 M16 28 H32" opacity={0.55} />
        </svg>
      );
    case "claude":
      // A starburst, the shape people associate with an assistant "thinking".
      return (
        <svg {...common}>
          {[0, 45, 90, 135].map((angle) => (
            <path key={angle} d="M28 8 V48" transform={`rotate(${angle} 28 28)`} />
          ))}
          <circle cx="28" cy="28" r="6" fill="var(--color-surface)" />
        </svg>
      );
    case "superpoderes":
      // A plug: connectors, skills and automations plug things into the assistant.
      return (
        <svg {...common}>
          <path d="M20 8 V18 M36 8 V18" />
          <path d="M14 18 H42 V28 C42 36, 36 40, 28 40 C20 40, 14 36, 14 28 Z" />
          <path d="M28 40 V48 C28 51, 31 52, 34 52 H46" opacity={0.6} />
        </svg>
      );
    case "chatgpt":
      // Two speech bubbles: a conversation in another assistant.
      return (
        <svg {...common}>
          <path d="M6 10 H34 V28 H18 L11 34 V28 H6 Z" />
          <path d="M22 32 H50 V48 H45 V53 L39 48 H22 Z" opacity={0.6} />
        </svg>
      );
    case "gemini":
      // A four-pointed sparkle over a document: an assistant inside your office files.
      return (
        <svg {...common}>
          <rect x="8" y="14" width="28" height="36" rx="4" opacity={0.55} />
          <path d="M14 26 H30 M14 33 H30 M14 40 H24" opacity={0.55} />
          <path d="M42 6 C43 13, 45 15, 52 16 C45 17, 43 19, 42 26 C41 19, 39 17, 32 16 C39 15, 41 13, 42 6 Z" />
        </svg>
      );
    case "otras-herramientas":
      // Three overlapping windows: other assistants side by side.
      return (
        <svg {...common}>
          <rect x="6" y="8" width="26" height="20" rx="4" opacity={0.45} />
          <rect x="15" y="18" width="26" height="20" rx="4" opacity={0.7} />
          <rect x="24" y="28" width="26" height="20" rx="4" fill="var(--color-surface)" />
        </svg>
      );
    case "un-paso-mas":
      // A terminal prompt: the optional part with a little code.
      return (
        <svg {...common}>
          <rect x="5" y="9" width="46" height="38" rx="6" />
          <path d="M5 18 H51" opacity={0.45} />
          <path d="M13 27 L19 31 L13 35" />
          <path d="M23 36 H33" />
        </svg>
      );
    default: {
      const unreachable: never = slug;
      return unreachable;
    }
  }
}
