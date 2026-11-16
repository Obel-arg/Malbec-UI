import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataTable } from "../DataTable/DataTable";
import { EmptyState } from "./EmptyState";

const classesOf = (el: Element) => el.className.split(/\s+/);

describe("EmptyState", () => {
  it('variant="row" (default) is one quiet line with the action as a link, left-aligned', () => {
    const { container } = render(
      <EmptyState title="Todavía no hay proveedores." action={<a href="#new">Agregar el primero</a>} />,
    );
    const root = container.querySelector('[data-slot="empty-state"]')!;
    expect(root.getAttribute("data-variant")).toBe("row");
    expect(classesOf(root)).toContain("ui:text-left");
    expect(root.textContent).toBe("Todavía no hay proveedores. Agregar el primero");
    expect(container.querySelector('[data-slot="empty-state-ghost"]')).toBeNull();
  });

  it('variant="ghost" draws faded placeholder rows behind the text, hidden from screen readers', () => {
    const { container } = render(
      <EmptyState
        variant="ghost"
        columns={4}
        rows={3}
        title="Todavía no hay proveedores"
        description="Cargá el primero para poder asignarle costos."
        action={<button type="button">Agregar proveedor</button>}
      />,
    );
    const ghost = container.querySelector('[data-slot="empty-state-ghost"]')!;
    expect(ghost.getAttribute("aria-hidden")).toBe("true");
    expect(ghost.children).toHaveLength(3);
    expect(ghost.children[0].children).toHaveLength(4);
    expect(screen.getByRole("button", { name: "Agregar proveedor" })).toBeTruthy();
  });

  it('variant="page" sits left under an embossed divider with the actions to the right', () => {
    const { container } = render(
      <EmptyState
        variant="page"
        title="Todavía no hay proveedores"
        description="Cargá el primero para poder asignarle costos."
        action={<button type="button">Agregar proveedor</button>}
      />,
    );
    const root = container.querySelector('[data-slot="empty-state"]')!;
    expect(classesOf(root)).toEqual(expect.arrayContaining(["ui:border-t", "ui:border-embossed-edge", "ui:justify-between"]));
    expect(container.querySelector('[data-slot="empty-state-actions"]')!.textContent).toBe(
      "Agregar proveedor",
    );
  });
});

describe("DataTable empty row", () => {
  type Row = { id: string; name: string };
  const columns = [{ accessorKey: "name", header: "Proveedor" }];

  it("shows a plain emptyLabel as the quiet, left-aligned row (variant A)", () => {
    render(<DataTable<Row, unknown> columns={columns} data={[]} emptyLabel="Todavía no hay proveedores." />);
    const cell = screen.getByText("Todavía no hay proveedores.").closest("td")!;
    expect(classesOf(cell)).toContain("ui:text-left");
    expect(classesOf(cell)).not.toContain("ui:text-center");
  });
});

describe('EmptyState variant="ghost" text', () => {
  it("sits on the plain surface: no box of its own behind the text", () => {
    const { container } = render(<EmptyState variant="ghost" title="Todavía no hay proveedores" />);
    const title = screen.getByText("Todavía no hay proveedores");
    const holder = title.closest('[data-slot="empty-state"] > div:last-child')!;
    expect(holder.querySelector(".ui\\:bg-background-100")).toBeNull();
    expect(container.querySelector('[data-slot="empty-state-ghost"]')!.className).toContain("mask-composite:intersect");
  });
});
