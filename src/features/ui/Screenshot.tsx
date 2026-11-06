import type { ReactNode } from "react";

import { es } from "@/i18n/es";

import styles from "./Ui.module.css";

/** A highlighted zone, in pixels of the original image (read straight off the capture). */
export interface ScreenshotMark {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Number shown on the badge; the caption or the text explains what each number is. */
  n?: number;
}

interface Props {
  /** Path inside `public/capturas/`, e.g. `claude/inicio.jpg`. */
  src: string;
  /** What the capture shows, for screen readers. Mention the marked zones. */
  alt: string;
  width: number;
  height: number;
  /** When it was taken ("noviembre de 2026"): interfaces change, the reader should know. */
  date: string;
  marks?: readonly ScreenshotMark[];
  caption?: ReactNode;
}

const BADGE_RADIUS = 20;

/** Resolves a capture under the deploy base (GitHub Pages serves the app from a sub-path). */
export function captureUrl(src: string, base: string): string {
  return `${base.replace(/\/?$/, "/")}capturas/${src.replace(/^\/+/, "")}`;
}

/** Keeps the badge inside the image when a mark touches the top or left edge. */
export function badgeCentre(mark: ScreenshotMark): { cx: number; cy: number } {
  return { cx: Math.max(mark.x, BADGE_RADIUS), cy: Math.max(mark.y, BADGE_RADIUS) };
}

function MarkShape({ mark }: { mark: ScreenshotMark }): ReactNode {
  const { cx, cy } = badgeCentre(mark);
  return (
    <g>
      <rect
        className={styles.shotRect}
        x={mark.x}
        y={mark.y}
        width={mark.w}
        height={mark.h}
        rx={8}
        vectorEffect="non-scaling-stroke"
      />
      {mark.n !== undefined && (
        <g className={styles.shotBadge}>
          <circle cx={cx} cy={cy} r={BADGE_RADIUS} />
          <text x={cx} y={cy} dominantBaseline="central" textAnchor="middle">
            {mark.n}
          </text>
        </g>
      )}
    </g>
  );
}

/**
 * A real capture of the interface a lesson talks about, with the relevant zones boxed and
 * numbered. The boxes are drawn over the image (not baked in) so they can be moved when the
 * capture is retaken, and the image links to its full size because it is shown scaled down.
 */
export function Screenshot({
  src,
  alt,
  width,
  height,
  date,
  marks = [],
  caption,
}: Props): ReactNode {
  const url = captureUrl(src, import.meta.env.BASE_URL);
  return (
    <figure className={styles.shot}>
      <a className={styles.shotLink} href={url} target="_blank" rel="noreferrer">
        <img src={url} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
        <svg
          className={styles.shotMarks}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {marks.map((mark) => (
            <MarkShape key={`${mark.x}-${mark.y}-${mark.n ?? ""}`} mark={mark} />
          ))}
        </svg>
        <span className={styles.shotZoom}>{es.screenshot.openFull}</span>
      </a>
      <figcaption>
        {caption}
        <span className={styles.shotDate}>{es.screenshot.taken(date)}</span>
      </figcaption>
    </figure>
  );
}
