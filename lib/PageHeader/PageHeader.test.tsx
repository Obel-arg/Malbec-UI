import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("renders an ink h1 with the chip, subtitle and action in the title row", () => {
    const { container } = render(
      <PageHeader
        title="Usuarios"
        titleAddon={<span>Todos los sellos</span>}
        description="Quién entra y qué puede ver."
        actions={<button type="button">Agregar</button>}
      />,
    );
    const h1 = screen.getByRole("heading", { level: 1, name: "Usuarios" });
    expect(h1.className).toContain("ui:text-malbec-ink");
    expect(h1.className).not.toContain("foreground");
    // The chip sits on the title's own line.
    expect(h1.parentElement!.textContent).toContain("Todos los sellos");
    expect(screen.getByText("Quién entra y qué puede ver.")).toBeTruthy();
    // The action shares the row with the title block.
    const row = container.firstElementChild!;
    expect(row.className).toContain("ui:justify-between");
    expect(row.lastElementChild!.textContent).toBe("Agregar");
  });

  it("works with just a title", () => {
    const { container } = render(<PageHeader title="Contratos" />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Contratos");
    expect(container.querySelector('[data-slot="page-header-actions"]')).toBeNull();
  });
});
