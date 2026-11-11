import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Notice } from "./Notice";

const root = () => screen.getByRole("status");

describe("Notice", () => {
  it("is a status card with title, description and action", () => {
    render(
      <Notice
        tone="pending"
        icon={<svg data-testid="icon" />}
        title="Falta el CUIT"
        description="Sin el CUIT no se puede facturar."
        action={<button type="button">Completar</button>}
      />,
    );
    expect(root().textContent).toContain("Falta el CUIT");
    expect(screen.getByText("Sin el CUIT no se puede facturar.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Completar" })).toBeTruthy();
    expect(screen.getByTestId("icon")).toBeTruthy();
  });

  it('tone="pending" tints the whole card yellow, never red', () => {
    render(<Notice tone="pending" title="Pendiente" />);
    const classes = root().className;
    expect(classes).toContain("ui:bg-pending-surface");
    expect(classes).not.toMatch(/destructive|red/);
  });

  it('tone="info" (the default) is the neutral embossed card', () => {
    render(<Notice title="El módulo está apagado" />);
    const classes = root().className;
    expect(classes).toContain("ui:bg-background-100");
    expect(classes).not.toContain("pending");
  });

  it("centres the icon against the text block", () => {
    render(<Notice title="x" />);
    expect(root().className).toContain("ui:items-center");
  });
});
