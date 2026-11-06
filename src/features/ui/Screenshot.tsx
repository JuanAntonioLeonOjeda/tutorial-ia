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
  /** Side of the box where the badge sits, outside it so it never hides the zone. */
  badge?: BadgeSide;
}

export type BadgeSide = "top" | "bottom" | "left" | "right";

interface Props {
  /** Path inside `public/capturas/`, e.g. `claude/inicio.jpg`. */
  src: string;
  /** What the capture shows, for screen readers. Mention the marked zones. */
  alt: string;
  width: number;
  height: number;
  /** When it was taken ("noviembre de 2026"): interfaces change, the reader should know. */
  date: string;
  /** Zones to box. Every capture explains its numbers in the caption, so both are required. */
  marks: readonly ScreenshotMark[];
  caption: ReactNode;
}

interface ImageSize {
  width: number;
  height: number;
}

/* Box corner radius, in pixels of the original capture (the SVG shares the image's viewBox). */
const BOX_CORNER = 8;

/** Resolves a capture under the deploy base (GitHub Pages serves the app from a sub-path). */
export function captureUrl(src: string, base: string): string {
  return `${base.replace(/\/?$/, "/")}capturas/${src.replace(/^\/+/, "")}`;
}

/**
 * The point on the box edge the badge hangs from (top by default). CSS then pushes the badge
 * just outside that edge (`data-side`), so it never covers the zone at any image scale.
 */
export function badgeAnchor(mark: ScreenshotMark): { x: number; y: number; side: BadgeSide } {
  const side = mark.badge ?? "top";
  switch (side) {
    case "top":
      return { x: mark.x, y: mark.y, side };
    case "bottom":
      return { x: mark.x, y: mark.y + mark.h, side };
    case "left":
      return { x: mark.x, y: mark.y + mark.h / 2, side };
    case "right":
      return { x: mark.x + mark.w, y: mark.y + mark.h / 2, side };
    default: {
      const unreachable: never = side;
      return unreachable;
    }
  }
}

/** Position of a point of the image as percentages, so HTML badges follow the scaled image. */
function percentOf(value: number, total: number): string {
  return `${((value / total) * 100).toFixed(3)}%`;
}

/**
 * The numbered badges are HTML, not SVG text: they keep a readable, fixed size (and zoom with
 * the page) while the capture and its boxes scale down to the column width.
 */
function Badge({ mark, size }: { mark: ScreenshotMark; size: ImageSize }): ReactNode {
  if (mark.n === undefined) return null;
  const { x, y, side } = badgeAnchor(mark);
  return (
    <span
      className={styles.shotBadge}
      data-side={side}
      // Position comes from the capture's own coordinates, not from the design system.
      style={{ left: percentOf(x, size.width), top: percentOf(y, size.height) }}
    >
      {mark.n}
    </span>
  );
}

/**
 * A real capture of the interface a lesson talks about, with the relevant zones boxed and
 * numbered. The boxes are drawn over the image (not baked in) so they can be moved when the
 * capture is retaken. The numbers are hidden from screen readers: the caption, which explains
 * each one, is the accessible version. A visible link opens the capture at full size.
 */
export function Screenshot({ src, alt, width, height, date, marks, caption }: Props): ReactNode {
  const url = captureUrl(src, import.meta.env.BASE_URL);
  const size = { width, height };
  return (
    <figure className={styles.shot}>
      <div className={styles.shotFrame}>
        <img src={url} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
        <div className={styles.shotMarks} aria-hidden="true">
          <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
            {marks.map((mark, index) => (
              <rect
                // The marks of a capture are a fixed list written in the lesson: the index is stable.
                key={index}
                className={styles.shotRect}
                x={mark.x}
                y={mark.y}
                width={mark.w}
                height={mark.h}
                rx={BOX_CORNER}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          {marks.map((mark, index) => (
            <Badge key={index} mark={mark} size={size} />
          ))}
        </div>
      </div>
      <figcaption>
        {caption}
        <span className={styles.shotMeta}>
          {es.screenshot.taken(date)}{" "}
          <a href={url} target="_blank" rel="noreferrer">
            {es.screenshot.openFull}
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
