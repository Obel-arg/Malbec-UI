import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("shows the icon tile, the text and the action to leave the empty state", () => {
    render(
      <EmptyState
        icon={<svg data-testid="icon" />}
        title="Todavía no hay contratos"
        description="Subí el primero para empezar a liquidar."
        action={<button type="button">Subir contrato</button>}
      />,
    );
    expect(screen.getByText("Todavía no hay contratos")).toBeTruthy();
    expect(screen.getByText("Subí el primero para empezar a liquidar.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Subir contrato" })).toBeTruthy();
    const tile = screen.getByTestId("icon").parentElement!;
    expect(tile.getAttribute("aria-hidden")).toBe("true");
    // 44px tile, rounded-xl, background-200 with a border (malbec-ux-ui §7).
    expect(tile.className.split(/\s+/)).toEqual(
      expect.arrayContaining(["ui:size-11", "ui:rounded-xl", "ui:border", "ui:bg-background-200"]),
    );
  });

  it("renders without icon, description or action", () => {
    const { container } = render(<EmptyState title="Sin resultados" />);
    expect(container.querySelector('[data-slot="empty-state-icon"]')).toBeNull();
    expect(screen.getByText("Sin resultados")).toBeTruthy();
  });
});
