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
  marks?: readonly ScreenshotMark[];
  caption?: ReactNode;
}

/*
 * Badge and box geometry, in pixels of the original capture: the SVG shares the image's viewBox,
 * so these scale down with the image (a 1512 px capture in a 720 px column halves them).
 */
const BADGE_RADIUS = 24;
const BADGE_GAP = 4;
const BADGE_FONT_SIZE = 28;
const BOX_CORNER = 8;

/** Resolves a capture under the deploy base (GitHub Pages serves the app from a sub-path). */
export function captureUrl(src: string, base: string): string {
  return `${base.replace(/\/?$/, "/")}capturas/${src.replace(/^\/+/, "")}`;
}

function clamp(value: number, max: number): number {
  return Math.min(Math.max(value, BADGE_RADIUS), max - BADGE_RADIUS);
}

/**
 * Where the badge goes: just outside the chosen side of the box (top by default), so it never
 * covers the button it points at, and always inside the image.
 */
export function badgeCentre(
  mark: ScreenshotMark,
  size: { width: number; height: number },
): { cx: number; cy: number } {
  const offset = BADGE_RADIUS + BADGE_GAP;
  const side = mark.badge ?? "top";
  const centre = (() => {
    switch (side) {
      case "top":
        return { cx: mark.x + BADGE_RADIUS, cy: mark.y - offset };
      case "bottom":
        return { cx: mark.x + BADGE_RADIUS, cy: mark.y + mark.h + offset };
      case "left":
        return { cx: mark.x - offset, cy: mark.y + mark.h / 2 };
      case "right":
        return { cx: mark.x + mark.w + offset, cy: mark.y + mark.h / 2 };
      default: {
        const unreachable: never = side;
        return unreachable;
      }
    }
  })();
  return { cx: clamp(centre.cx, size.width), cy: clamp(centre.cy, size.height) };
}

interface MarkShapeProps {
  mark: ScreenshotMark;
  size: { width: number; height: number };
}

function MarkShape({ mark, size }: MarkShapeProps): ReactNode {
  const { cx, cy } = badgeCentre(mark, size);
  return (
    <g>
      <rect
        className={styles.shotRect}
        x={mark.x}
        y={mark.y}
        width={mark.w}
        height={mark.h}
        rx={BOX_CORNER}
        vectorEffect="non-scaling-stroke"
      />
      {mark.n !== undefined && (
        <g className={styles.shotBadge}>
          <circle cx={cx} cy={cy} r={BADGE_RADIUS} />
          <text
            x={cx}
            y={cy}
            fontSize={BADGE_FONT_SIZE}
            dominantBaseline="central"
            textAnchor="middle"
          >
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
          {marks.map((mark, index) => (
            <MarkShape
              // The marks of a capture are a fixed list written in the lesson: the index is stable.
              key={index}
              mark={mark}
              size={{ width, height }}
            />
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
