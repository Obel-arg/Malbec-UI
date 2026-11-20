import { act, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { DataTable } from "./DataTable";

type Row = { id: string; artist: string };
const columns = [{ accessorKey: "artist", header: "Artist" }];
const page2: Row[] = [
  { id: "3", artist: "Mendoza · Arena Maipú" },
  { id: "4", artist: "La Plata · Estadio Único" },
];

function rowCheckbox(artist: string) {
  return screen.getByText(artist).closest("tr")!.querySelector<HTMLElement>("[role=checkbox]")!;
}

describe("DataTable controlled selection", () => {
  it("checks the rows listed in selectedRowIds", () => {
    render(
      <DataTable<Row, unknown>
        columns={columns}
        data={page2}
        getRowId={(r) => r.id}
        emptyLabel="Sin resultados"
        rowSelection
        selectedRowIds={["4"]}
      />,
    );
    expect(rowCheckbox("La Plata · Estadio Único").getAttribute("aria-checked")).toBe("true");
    expect(rowCheckbox("Mendoza · Arena Maipú").getAttribute("aria-checked")).toBe("false");
  });

  it("reports the next ids, keeping ids of rows on other pages", () => {
    const onChange = vi.fn();
    render(
      <DataTable<Row, unknown>
        columns={columns}
        data={page2}
        getRowId={(r) => r.id}
        emptyLabel="Sin resultados"
        rowSelection
        selectedRowIds={["1"]}
        onSelectedRowIdsChange={onChange}
      />,
    );
    fireEvent.click(rowCheckbox("Mendoza · Arena Maipú"));
    expect(onChange).toHaveBeenLastCalledWith(["1", "3"]);
  });

  it("select all only toggles the rows on screen", () => {
    const onChange = vi.fn();
    render(
      <DataTable<Row, unknown>
        columns={columns}
        data={page2}
        getRowId={(r) => r.id}
        emptyLabel="Sin resultados"
        rowSelection
        selectedRowIds={["1"]}
        onSelectedRowIdsChange={onChange}
      />,
    );
    fireEvent.click(screen.getAllByRole("checkbox")[0]!);
    expect(onChange).toHaveBeenLastCalledWith(["1", "3", "4"]);
  });

  it("can be cleared from outside", () => {
    function Harness() {
      const [ids, setIds] = useState<string[]>(["3", "4"]);
      return (
        <>
          <button type="button" onClick={() => setIds([])}>
            Clear
          </button>
          <DataTable<Row, unknown>
            columns={columns}
            data={page2}
            getRowId={(r) => r.id}
            emptyLabel="Sin resultados"
            rowSelection
            selectedRowIds={ids}
            onSelectedRowIdsChange={setIds}
          />
        </>
      );
    }
    render(<Harness />);
    expect(rowCheckbox("Mendoza · Arena Maipú").getAttribute("aria-checked")).toBe("true");
    fireEvent.click(screen.getByText("Clear"));
    expect(rowCheckbox("Mendoza · Arena Maipú").getAttribute("aria-checked")).toBe("false");
  });

  it("keeps both changes when two rows toggle before the parent re-renders", () => {
    function Harness() {
      const [ids, setIds] = useState<string[]>([]);
      return (
        <>
          <span data-testid="count">{ids.length}</span>
          <DataTable<Row, unknown>
            columns={columns}
            data={page2}
            getRowId={(r) => r.id}
            emptyLabel="Sin resultados"
            rowSelection
            selectedRowIds={ids}
            onSelectedRowIdsChange={setIds}
          />
        </>
      );
    }
    render(<Harness />);
    act(() => {
      rowCheckbox("Mendoza · Arena Maipú").click();
      rowCheckbox("La Plata · Estadio Único").click();
    });
    expect(screen.getByTestId("count").textContent).toBe("2");
  });
});
