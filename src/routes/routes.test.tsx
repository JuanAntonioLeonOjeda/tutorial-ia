import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { extras, subjects } from "@/content/catalog";

import { routes } from "./routes";

function renderAt(path: string): void {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
}

describe("routes", () => {
  it("home lists every module", () => {
    renderAt("/");
    for (const subject of subjects) {
      expect(screen.getByRole("link", { name: new RegExp(subject.title) })).toBeInTheDocument();
    }
  });

  it("home lists the extras under their own heading", () => {
    renderAt("/");
    expect(
      screen.getByRole("heading", { name: "Un paso más (con un poco de código)" }),
    ).toBeInTheDocument();
    for (const extra of extras) {
      expect(screen.getByRole("link", { name: new RegExp(extra.title) })).toBeInTheDocument();
    }
  });

  it("a lesson that moved to its own module redirects to the new path", async () => {
    renderAt("/otras-herramientas/chatgpt");
    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "La interfaz, los modelos y los planes",
      }),
    ).toBeInTheDocument();
  });

  it("an extra is browsed like a subject", () => {
    renderAt("/un-paso-mas");
    expect(screen.getByRole("heading", { level: 1, name: "Un paso más" })).toBeInTheDocument();
  });

  it("a module page lists its lessons in order", () => {
    renderAt("/fundamentos");
    expect(screen.getByRole("heading", { level: 1, name: "Fundamentos" })).toBeInTheDocument();
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Qué hay detrás del chat");
  });

  it("an unknown subject shows the not-found page", () => {
    renderAt("/no-existe");
    expect(screen.getByRole("heading", { name: "Página no encontrada" })).toBeInTheDocument();
  });
});
