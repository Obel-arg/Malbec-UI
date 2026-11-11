import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { MalbecLabelsProvider } from "../i18n/MalbecLabelsProvider";
import { Combobox } from "./Combobox";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const fruits = ["Banana", "Manzana", "Pera"];

function Chips({ disabled = false }: { disabled?: boolean }) {
  return (
    <Combobox items={fruits} multiple disabled={disabled} defaultValue={["Banana"]}>
      <Combobox.Chips>
        <Combobox.Chip value="Banana">Banana</Combobox.Chip>
        <Combobox.ChipsInput aria-label="Frutas" />
      </Combobox.Chips>
    </Combobox>
  );
}

const chipsBox = () => document.querySelector<HTMLElement>('[data-slot="combobox-chips"]')!;

describe("Combobox defects reported by Live", () => {
  it("the chips box dims when the combobox is disabled", () => {
    render(<Chips disabled />);
    expect(chipsBox().hasAttribute("data-disabled")).toBe(true);
  });

  it("the chips box packs chips at the start instead of spreading them", () => {
    render(<Chips />);
    const classes = chipsBox().className.split(/\s+/);
    expect(classes).toContain("ui:justify-start");
    expect(classes).not.toContain("ui:justify-between");
  });

  it("the list takes the anchor's width, not the combobox root's", () => {
    render(
      <Combobox items={fruits} defaultOpen>
        <Combobox.Input aria-label="Fruta" />
        <Combobox.Content>
          <Combobox.List>{(item) => <Combobox.Item value={item} />}</Combobox.List>
        </Combobox.Content>
      </Combobox>,
    );
    const content = document.querySelector<HTMLElement>('[data-slot="combobox-content"]')!;
    expect(content.style.width).toBe("var(--radix-popover-trigger-width)");
  });

  it("a selected option looks selected, not only hovered", () => {
    render(
      <Combobox items={fruits} defaultOpen defaultValue="Pera">
        <Combobox.Input aria-label="Fruta" />
        <Combobox.Content>
          <Combobox.List>{(item) => <Combobox.Item value={item} />}</Combobox.List>
        </Combobox.Content>
      </Combobox>,
    );
    const option = screen.getByRole("option", { name: "Pera" });
    expect(option.getAttribute("aria-selected")).toBe("true");
    expect(option.className).toContain("ui:aria-selected:bg-background-200");
  });

  it("the list scrolls with the wheel even when a modal blocks page scroll", () => {
    render(
      <Combobox items={fruits} defaultOpen>
        <Combobox.Input aria-label="Fruta" />
        <Combobox.Content>
          <Combobox.List>{(item) => <Combobox.Item value={item} />}</Combobox.List>
        </Combobox.Content>
      </Combobox>,
    );
    const list = screen.getByRole("listbox");
    Object.defineProperty(list, "scrollHeight", { value: 600 });
    Object.defineProperty(list, "clientHeight", { value: 280 });
    const wheel = new WheelEvent("wheel", { deltaY: 120, bubbles: true, cancelable: true });
    fireEvent(list, wheel);
    expect(list.scrollTop).toBe(120);
    expect(wheel.defaultPrevented).toBe(true);
  });
});

describe("Combobox labels", () => {
  it("names the open/close toggle from MalbecLabelsProvider", () => {
    render(
      <MalbecLabelsProvider locale="es">
        <Combobox items={fruits}>
          <Combobox.Input aria-label="Fruta" />
        </Combobox>
      </MalbecLabelsProvider>,
    );
    expect(screen.getByRole("button", { name: "Abrir" })).toBeTruthy();
  });
});

describe("Combobox chips box padding", () => {
  it("has the same padding on every side (6px), not the 16px of the trigger row", () => {
    render(<Chips />);
    const classes = chipsBox().className.split(/\s+/);
    expect(classes).toEqual(expect.arrayContaining(["ui:px-1.5", "ui:py-1.5"]));
    expect(classes).not.toContain("ui:px-4");
  });
});
