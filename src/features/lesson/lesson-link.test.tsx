import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LessonLink, withBase } from "./LessonLink";

describe("withBase", () => {
  it("prefixes only root-relative paths", () => {
    expect(withBase("/descargas/a.zip", "/tutorial-ia/")).toBe("/tutorial-ia/descargas/a.zip");
    expect(withBase("/descargas/a.zip", "/")).toBe("/descargas/a.zip");
    expect(withBase("https://claude.ai", "/tutorial-ia/")).toBe("https://claude.ai");
    expect(withBase("#seccion", "/tutorial-ia/")).toBe("#seccion");
    expect(withBase("//cdn.example.com/x", "/tutorial-ia/")).toBe("//cdn.example.com/x");
  });
});

describe("LessonLink", () => {
  it("marks downloads and opens external links in a new tab", () => {
    render(
      <>
        <LessonLink href="/descargas/acta-de-reunion.zip">zip</LessonLink>
        <LessonLink href="https://support.claude.com">ayuda</LessonLink>
      </>,
    );
    expect(screen.getByRole("link", { name: "zip" })).toHaveAttribute("download");
    expect(screen.getByRole("link", { name: "ayuda" })).toHaveAttribute("target", "_blank");
  });
});
