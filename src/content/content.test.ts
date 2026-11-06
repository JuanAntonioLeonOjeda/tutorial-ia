import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { illustrations } from "@/features/illustrations";
import { simulations } from "@/features/simulations";

import { extras, sections, subjects } from "./catalog";

const CONTENT_DIR = join(process.cwd(), "src", "content");
const CAPTURES_DIR = join(process.cwd(), "public", "capturas");

function exerciseIds(source: string): string[] {
  return [...source.matchAll(/<(?:Quiz|Predict|Practice)\b[^>]*?\bid="([^"]+)"/gs)].map(
    (m) => m[1] ?? "",
  );
}

function mdxFiles(subject: string): string[] {
  return readdirSync(join(CONTENT_DIR, subject)).filter((f) => f.endsWith(".mdx"));
}

describe("content catalog", () => {
  it("has four modules with unique slugs", () => {
    expect(subjects).toHaveLength(4);
    expect(new Set(subjects.map((s) => s.slug)).size).toBe(4);
  });

  it("has the extras as sections after the modules", () => {
    expect(sections.map((s) => s.slug)).toEqual([
      ...subjects.map((s) => s.slug),
      ...extras.map((s) => s.slug),
    ]);
    expect(extras.map((s) => s.slug)).toContain("un-paso-mas");
  });

  for (const subject of sections) {
    describe(subject.title, () => {
      // Naming convention: lesson n lives in `NN-<slug>.mdx`, so order and slug stay in sync.
      const fileOf = (slug: string, i: number): string =>
        `${String(i + 1).padStart(2, "0")}-${slug}.mdx`;

      it("has one MDX file per lesson, named NN-<slug>.mdx", () => {
        const expected = subject.lessons.map((l, i) => fileOf(l.slug, i));
        expect(mdxFiles(subject.slug).sort()).toEqual(expected.sort());
      });

      for (const [i, lesson] of subject.lessons.entries()) {
        const file = fileOf(lesson.slug, i);
        let source = "";
        try {
          source = readFileSync(join(CONTENT_DIR, subject.slug, file), "utf8");
        } catch {
          // Reported by the file-name test above.
        }

        it(`${lesson.slug}: catalog exercise ids match the lesson`, () => {
          // Progress is counted from the catalog, so it must not drift from the MDX.
          expect(lesson.exercises).toEqual(exerciseIds(source));
          expect(new Set(lesson.exercises).size).toBe(lesson.exercises.length);
        });

        it(`${lesson.slug}: every simulation and diagram it uses exists`, () => {
          const used = [...source.matchAll(/<([A-Z][A-Za-z]+(?:Sim|Diagram))\b/g)].map(
            (m) => m[1] ?? "",
          );
          const known = new Set([...Object.keys(simulations), ...Object.keys(illustrations)]);
          expect(used.filter((name) => !known.has(name))).toEqual([]);
        });

        it(`${lesson.slug}: every screenshot exists and says when it was taken`, () => {
          // Captions and alt texts are plain strings, so a block ends at the first "/>".
          const blocks = source.match(/<Screenshot\b.*?\/>/gs) ?? [];
          for (const block of blocks) {
            const src = /\bsrc="([^"]+\.(?:jpg|png|webp))"/.exec(block)?.[1] ?? "";
            expect(src, block.slice(0, 80)).not.toBe("");
            expect(existsSync(join(CAPTURES_DIR, src)), src).toBe(true);
            expect(block).toMatch(/\bdate="[^"]+"/);
            expect(block).toMatch(/\balt="[^"]{20,}"/);
            const width = Number(/\bwidth=\{(\d+)\}/.exec(block)?.[1] ?? 0);
            const height = Number(/\bheight=\{(\d+)\}/.exec(block)?.[1] ?? 0);
            expect(width * height, src).toBeGreaterThan(0);
            const marks = block.matchAll(/\{ x: (\d+), y: (\d+), w: (\d+), h: (\d+)/g);
            for (const [, x = "0", y = "0", w = "0", h = "0"] of marks) {
              expect(Number(x) + Number(w), `${src} mark at x=${x}`).toBeLessThanOrEqual(width);
              expect(Number(y) + Number(h), `${src} mark at y=${y}`).toBeLessThanOrEqual(height);
            }
          }
          if (blocks.length > 0) {
            expect(lesson.sources.some((s) => s.includes("capturada el"))).toBe(true);
          }
        });

        it(`${lesson.slug}: every practice has steps and a worked example`, () => {
          const blocks = source.match(/<Practice\b.*?<\/Practice>/gs) ?? [];
          for (const block of blocks) {
            expect(block).toMatch(/steps=\{\[/);
            expect(block).toMatch(/example=\{/);
          }
        });

        it(`${lesson.slug}: ends with "Para llevar"`, () => {
          expect(source).toMatch(/\n## Para llevar\n/);
        });

        it(`${lesson.slug}: every source is a link or a named document`, () => {
          for (const src of lesson.sources) expect(src).toMatch(/^(https:\/\/|[A-Za-z.])/);
        });
      }
    });
  }
});
