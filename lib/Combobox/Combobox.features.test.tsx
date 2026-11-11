import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { MalbecLabelsProvider } from "../i18n/MalbecLabelsProvider";
import { Combobox, type ComboboxProps } from "./Combobox";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

type Venue = { value: string; label: string; keywords?: string[] };
const venues: Venue[] = [
  { value: "movistar", label: "Movistar Arena", keywords: ["Buenos Aires", "Villa Crespo"] },
  { value: "metro", label: "Metropolitano", keywords: ["Rosario"] },
];

function Venues(rest: Partial<ComboboxProps>) {
  return (
    <MalbecLabelsProvider locale="es">
      <Combobox items={venues} {...rest}>
        <Combobox.Input aria-label="Venue" />
        <Combobox.Content>
          <Combobox.List>
            {(item) => <Combobox.Item value={item} />}
          </Combobox.List>
          <Combobox.Empty>Sin resultados</Combobox.Empty>
        </Combobox.Content>
      </Combobox>
    </MalbecLabelsProvider>
  );
}

const type = (text: string) =>
  fireEvent.change(screen.getByRole("combobox", { name: "Venue" }), { target: { value: text } });

describe("Combobox search", () => {
  it("matches an item's keywords, not only its label", () => {
    render(<Venues />);
    type("rosario");
    expect(screen.getByRole("option", { name: "Metropolitano" })).toBeTruthy();
    expect(screen.queryByRole("option", { name: "Movistar Arena" })).toBeNull();
  });

  it("filter={null} leaves filtering to the server and reports the query", () => {
    const onInputValueChange = vi.fn();
    render(<Venues filter={null} onInputValueChange={onInputValueChange} />);
    type("zzz");
    expect(onInputValueChange).toHaveBeenLastCalledWith("zzz");
    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

});
