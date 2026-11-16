import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { MalbecLabelsProvider } from "../i18n/MalbecLabelsProvider";
import { Command } from "./Command";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
  Element.prototype.scrollIntoView ??= () => {};
});

const classesOf = (el: Element) => el.className.split(/\s+/);

function Palette() {
  return (
    <MalbecLabelsProvider locale="es">
      <Command label="Comandos">
        <Command.Context>Show · Rosario · Metropolitano</Command.Context>
        <Command.Input placeholder="Escribí un comando o buscá…" />
        <Command.List>
          <Command.Empty />
          <Command.Group heading="Ir a">
            <Command.Item>
              Shows
              <Command.Shortcut keys={["G", "S"]} sequence />
            </Command.Item>
          </Command.Group>
        </Command.List>
        <Command.Footer />
      </Command>
    </MalbecLabelsProvider>
  );
}

describe("Command (taller: versión C)", () => {
  it("is a 600px light surface with a 12px radius", () => {
    const { container } = render(<Palette />);
    const root = container.querySelector('[data-slot="command"]')!;
    expect(classesOf(root)).toEqual(
      expect.arrayContaining(["ui:max-w-[600px]", "ui:rounded-[12px]", "ui:bg-background-100"]),
    );
  });

  it("shows the context chip above a 16px input without a search glyph", () => {
    const { container } = render(<Palette />);
    expect(screen.getByText("Show · Rosario · Metropolitano").getAttribute("data-slot")).toBe("command-context");
    expect(classesOf(screen.getByPlaceholderText("Escribí un comando o buscá…"))).toContain("ui:text-[16px]");
    expect(container.querySelector('[data-slot="command-input-shell"] svg')).toBeNull();
  });

  it("has 36px rows", () => {
    render(<Palette />);
    expect(classesOf(screen.getByText("Shows").closest('[data-slot="command-item"]')!)).toContain("ui:h-9");
  });

  it("draws shortcut keys as boxed keys, with “luego” between a sequence", () => {
    render(<Palette />);
    const shortcut = screen.getByText("Shows").closest('[data-slot="command-item"]')!.querySelector('[data-slot="command-shortcut"]')!;
    expect(shortcut.querySelectorAll("kbd")).toHaveLength(2);
    expect(shortcut.textContent).toBe("GluegoS");
  });

  it("has a footer with the keyboard hints, translated", () => {
    render(<Palette />);
    const footer = document.querySelector('[data-slot="command-footer"]')!;
    expect(footer.textContent).toContain("navegar");
    expect(footer.textContent).toContain("abrir");
    expect(footer.textContent).toContain("cerrar");
  });

  it("says what was searched when nothing matches", () => {
    render(<Palette />);
    fireEvent.change(screen.getByPlaceholderText("Escribí un comando o buscá…"), {
      target: { value: "liquidar" },
    });
    expect(screen.getByText("No hay comandos para «liquidar».")).toBeTruthy();
  });
});
