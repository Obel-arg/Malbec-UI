import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataTable } from "./DataTable";

type Row = { id: string; artist: string };
const columns = [{ accessorKey: "artist", header: "Artist" }];
const data = [{ id: "1", artist: "Rosario · Metropolitano" }];

function selectionCells() {
  const [headerBox, rowBox] = screen.getAllByRole("checkbox");
  return { th: headerBox!.closest("th")!, td: rowBox!.closest("td")! };
}

describe("DataTable stickySelectionColumn", () => {
  it("leaves the selection column in the flow by default", () => {
    render(<DataTable<Row, unknown> columns={columns} data={data} emptyLabel="Sin resultados" rowSelection />);
    const { th, td } = selectionCells();
    expect(th.className).not.toContain("ui:sticky");
    expect(td.className).not.toContain("ui:sticky");
  });

  it("pins the header and body selection cells to the left edge", () => {
    render(
      <DataTable<Row, unknown>
        columns={columns}
        data={data}
        emptyLabel="Sin resultados"
        rowSelection
        stickySelectionColumn
      />,
    );
    const { th, td } = selectionCells();
    for (const cell of [th, td]) {
      expect(cell.className).toContain("ui:sticky");
      expect(cell.className).toContain("ui:left-0");
    }
    expect(th.className).toContain("ui:z-(--ui-z-sticky-corner)!");
    expect(td.className).toContain("ui:z-(--ui-z-sticky-column)");
  });

  it("keeps the pinned cell opaque and tints it with the row's hover and selected states", () => {
    render(
      <DataTable<Row, unknown>
        columns={columns}
        data={data}
        emptyLabel="Sin resultados"
        rowSelection
        stickySelectionColumn
      />,
    );
    const { td } = selectionCells();
    expect(td.className).toContain("ui:bg-background-100");
    expect(td.className).toContain("ui:before:transition-colors");
    expect(td.className).toContain("ui:[tr:hover>&]:before:bg-background-200/50");
    expect(td.className).toContain("ui:[tr[data-state=selected]:not(:hover)>&]:before:bg-background-200/80");
  });

  it("does nothing without rowSelection", () => {
    const { container } = render(
      <DataTable<Row, unknown> columns={columns} data={data} emptyLabel="Sin resultados" stickySelectionColumn />,
    );
    expect(container.querySelector(".ui\\:sticky")).toBeNull();
  });
});
