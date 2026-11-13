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

function Venues(props: Partial<ComboboxProps> & { onLoadMore?: () => void }) {
  const { onLoadMore, ...rest } = props;
  return (
    <MalbecLabelsProvider locale="es">
      <Combobox items={venues} {...rest}>
        <Combobox.Input aria-label="Venue" />
        <Combobox.Content>
          <Combobox.List onLoadMore={onLoadMore}>
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

  it("shows a loading row instead of the empty state while loading", () => {
    render(<Venues items={[]} loading defaultOpen />);
    expect(screen.getByRole("status").textContent).toBe("Cargando…");
    expect(screen.queryByText("Sin resultados")).toBeNull();
  });
});

describe("Combobox onCreate", () => {
  it("offers to create the query when nothing matches", () => {
    const onCreate = vi.fn();
    render(<Venues onCreate={onCreate} />);
    type("Teatro Colón");
    expect(screen.queryByText("Sin resultados")).toBeNull();
    fireEvent.click(screen.getByRole("option", { name: "Crear “Teatro Colón”" }));
    expect(onCreate).toHaveBeenCalledWith("Teatro Colón");
  });

  it("Enter creates when there is no match", () => {
    const onCreate = vi.fn();
    render(<Venues onCreate={onCreate} />);
    type("Luna Park");
    fireEvent.keyDown(screen.getByRole("combobox", { name: "Venue" }), { key: "Enter" });
    expect(onCreate).toHaveBeenCalledWith("Luna Park");
  });

  it("does not offer to create without onCreate", () => {
    render(<Venues />);
    type("Luna Park");
    expect(screen.queryByRole("option")).toBeNull();
    expect(screen.getByText("Sin resultados")).toBeTruthy();
  });
});

describe("Combobox.List onLoadMore", () => {
  it("fires once when the list is scrolled near its end", () => {
    const onLoadMore = vi.fn();
    render(<Venues defaultOpen onLoadMore={onLoadMore} />);
    const list = screen.getByRole("listbox");
    Object.defineProperty(list, "scrollHeight", { value: 600 });
    Object.defineProperty(list, "clientHeight", { value: 280 });
    list.scrollTop = 100;
    fireEvent.scroll(list);
    expect(onLoadMore).not.toHaveBeenCalled();
    list.scrollTop = 300;
    fireEvent.scroll(list);
    fireEvent.scroll(list);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });
});
