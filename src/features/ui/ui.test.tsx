import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Chat } from "./Chat";
import { dedent } from "./dedent";
import { MenuPath } from "./MenuPath";
import { Prompt, splitPlaceholders } from "./Prompt";

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
