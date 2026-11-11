import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tabs } from "../Tabs/Tabs";
import { PageHeader } from "./PageHeader";

const classesOf = (el: Element) => el.className.split(/\s+/);

describe("PageHeader (taller del encabezado, versión D)", () => {
  it("is an 18px bold ink h1 with the status on its line and the actions on the right", () => {
    render(
      <PageHeader
        title="Rosario · Metropolitano"
        titleAddon={<span>Faltan datos</span>}
        description="13/11/2026 · 4.200 entradas vendidas"
        actions={<button type="button">Generar liquidación</button>}
      />,
    );
    const h1 = screen.getByRole("heading", { level: 1, name: "Rosario · Metropolitano" });
    expect(classesOf(h1)).toEqual(
      expect.arrayContaining(["ui:text-[18px]", "ui:font-bold", "ui:text-malbec-ink"]),
    );
    expect(h1.parentElement!.textContent).toBe("Rosario · MetropolitanoFaltan datos");
    const description = screen.getByText("13/11/2026 · 4.200 entradas vendidas");
    expect(classesOf(description)).toContain("ui:text-[13px]");
    expect(screen.getByRole("button", { name: "Generar liquidación" }).closest('[data-slot="page-header-actions"]')).not.toBeNull();
  });

  it("takes the tabs as the bottom row of the same block, 8px before the content", () => {
    const { container } = render(
      <Tabs variant="underline" defaultValue="resumen">
        <PageHeader
          title="Rosario · Metropolitano"
          tabs={
            <Tabs.List>
              <Tabs.Trigger value="resumen">Resumen</Tabs.Trigger>
              <Tabs.Trigger value="costos">Costos</Tabs.Trigger>
            </Tabs.List>
          }
        />
      </Tabs>,
    );
    const root = container.querySelector('[data-slot="page-header"]')!;
    expect(classesOf(root)).toContain("ui:pb-2");
    const tabsRow = root.querySelector('[data-slot="page-header-tabs"]')!;
    expect(tabsRow.lastElementChild).toBe(root.querySelector('[role="tablist"]'));
    expect(root.lastElementChild).toBe(tabsRow);
  });

  it("renders without description, actions or tabs", () => {
    const { container } = render(<PageHeader title="Proveedores" />);
    expect(container.querySelector('[data-slot="page-header-actions"]')).toBeNull();
    expect(container.querySelector('[data-slot="page-header-tabs"]')).toBeNull();
  });
});
