import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
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
});
