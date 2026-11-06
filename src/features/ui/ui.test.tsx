import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Chat } from "./Chat";
import { dedent } from "./dedent";
import { MenuPath } from "./MenuPath";
import { Prompt, splitPlaceholders } from "./Prompt";
import { Screenshot, badgeCentre, captureUrl } from "./Screenshot";

describe("dedent", () => {
  it("removes the first newline and the common indentation", () => {
    expect(dedent("\n    x = 1\n      y = 2\n  ")).toBe("x = 1\n  y = 2");
  });
});

describe("splitPlaceholders", () => {
  it("marks only the bracketed parts as placeholders", () => {
    expect(splitPlaceholders("Hola [NOMBRE], nos vemos el [DÍA].")).toEqual([
      { text: "Hola ", isPlaceholder: false },
      { text: "[NOMBRE]", isPlaceholder: true },
      { text: ", nos vemos el ", isPlaceholder: false },
      { text: "[DÍA]", isPlaceholder: true },
      { text: ".", isPlaceholder: false },
    ]);
  });

  it("does not treat a bracket that spans lines as a placeholder", () => {
    expect(splitPlaceholders("[a\nb]").every((p) => !p.isPlaceholder)).toBe(true);
  });
});

describe("Prompt", () => {
  it("shows the dedented text and the placeholder note", () => {
    render(<Prompt text={"\n      Resume [DOCUMENTO].\n    "} />);
    expect(screen.getByText("[DOCUMENTO]").tagName).toBe("MARK");
    expect(screen.getByText(/ENTRE CORCHETES/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copiar" })).toBeInTheDocument();
  });
});

describe("Chat", () => {
  it("labels who says what", () => {
    render(
      <Chat
        messages={[
          { from: "tu", text: "Hola" },
          { from: "ia", text: "¿En qué te ayudo?", note: "usa Gmail" },
        ]}
      />,
    );
    expect(screen.getByText("Tú")).toBeInTheDocument();
    expect(screen.getByText("Claude")).toBeInTheDocument();
    expect(screen.getByText("usa Gmail")).toBeInTheDocument();
  });
});

describe("MenuPath", () => {
  it("reads the whole path to screen readers", () => {
    render(<MenuPath to={["Ajustes", "Conectores"]} />);
    expect(screen.getByLabelText("Dónde está: Ajustes, Conectores")).toBeInTheDocument();
  });
});

describe("captureUrl", () => {
  it("resolves a capture under the deploy base", () => {
    expect(captureUrl("claude/inicio.jpg", "/")).toBe("/capturas/claude/inicio.jpg");
    expect(captureUrl("claude/inicio.jpg", "/tutorial-ia/")).toBe(
      "/tutorial-ia/capturas/claude/inicio.jpg",
    );
    expect(captureUrl("/claude/inicio.jpg", "/tutorial-ia")).toBe(
      "/tutorial-ia/capturas/claude/inicio.jpg",
    );
  });
});

describe("badgeCentre", () => {
  const size = { width: 1000, height: 500 };

  it("sits just above the box by default, aligned with its left edge", () => {
    expect(badgeCentre({ x: 100, y: 200, w: 50, h: 30 }, size)).toEqual({ cx: 124, cy: 172 });
  });

  it("can sit on any side, outside the box", () => {
    const mark = { x: 100, y: 200, w: 50, h: 30 };
    expect(badgeCentre({ ...mark, badge: "bottom" }, size)).toEqual({ cx: 124, cy: 258 });
    expect(badgeCentre({ ...mark, badge: "left" }, size)).toEqual({ cx: 72, cy: 215 });
    expect(badgeCentre({ ...mark, badge: "right" }, size)).toEqual({ cx: 178, cy: 215 });
  });

  it("stays inside the image when the box touches an edge", () => {
    expect(badgeCentre({ x: 0, y: 4, w: 10, h: 10 }, size)).toEqual({ cx: 24, cy: 24 });
    expect(badgeCentre({ x: 990, y: 490, w: 10, h: 10, badge: "right" }, size)).toEqual({
      cx: 976,
      cy: 476,
    });
  });
});

describe("Screenshot", () => {
  it("shows the capture with its alt text, numbered marks and the date", () => {
    const { container } = render(
      <Screenshot
        src="claude/inicio.jpg"
        alt="Pantalla de inicio de Claude"
        width={1512}
        height={716}
        date="noviembre de 2026"
        marks={[
          { x: 10, y: 10, w: 100, h: 40, n: 1 },
          { x: 200, y: 300, w: 50, h: 50, n: 2 },
        ]}
        caption="La barra lateral (1) y el cuadro de texto (2)."
      />,
    );
    expect(screen.getByRole("img", { name: "Pantalla de inicio de Claude" })).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /Pantalla de inicio de Claude.*otra pestaña/ });
    expect(link).toHaveAttribute("href", "/capturas/claude/inicio.jpg");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("svg")?.textContent).toBe("12");
    expect(screen.getByText(/noviembre de 2026/)).toBeInTheDocument();
  });

  it("draws a box without a badge when the mark has no number", () => {
    const { container } = render(
      <Screenshot
        src="claude/inicio.jpg"
        alt="Pantalla de inicio de Claude"
        width={100}
        height={100}
        date="noviembre de 2026"
        marks={[{ x: 10, y: 10, w: 20, h: 20 }]}
      />,
    );
    expect(container.querySelectorAll("rect")).toHaveLength(1);
    expect(container.querySelectorAll("circle")).toHaveLength(0);
  });
});
