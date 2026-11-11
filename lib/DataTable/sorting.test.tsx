import type { ColumnDef } from "@tanstack/react-table";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MalbecLabelsProvider } from "../i18n/MalbecLabelsProvider";
import { DataTable } from "./DataTable";
import { SortableColumnHeader } from "./sortable-column-header";

type Row = { id: string; name: string };
const columns: ColumnDef<Row>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableColumnHeader column={column} icon={<svg data-testid="venue-icon" />}>
        Venue
      </SortableColumnHeader>
    ),
  },
];
const data: Row[] = [
  { id: "1", name: "Rosario" },
  { id: "2", name: "Córdoba" },
];
const names = () => screen.getAllByRole("cell").map((c) => c.textContent);

describe("SortableColumnHeader", () => {
  it("labels the sort button from MalbecLabelsProvider and renders the leading icon", () => {
    render(
      <MalbecLabelsProvider locale="es">
        <DataTable<Row, unknown> columns={columns} data={data} emptyLabel="Sin venues" />
      </MalbecLabelsProvider>,
    );
    expect(screen.getByTestId("venue-icon")).toBeTruthy();
    const button = screen.getByRole("button", { name: "Ordenar ascendente" });
    fireEvent.click(button);
    expect(names()).toEqual(["Córdoba", "Rosario"]);
    expect(screen.getByRole("button", { name: "Ordenar descendente" })).toBeTruthy();
  });

  it("server mode: controlled sorting + manualSorting keeps the server order and reports clicks", () => {
    const onSortingChange = vi.fn();
    render(
      <DataTable<Row, unknown>
        columns={columns}
        data={data}
        emptyLabel="No venues"
        sorting={[{ id: "name", desc: true }]}
        onSortingChange={onSortingChange}
        manualSorting
      />,
    );
    expect(names()).toEqual(["Rosario", "Córdoba"]);
    expect(screen.getByRole("columnheader").getAttribute("aria-sort")).toBe("descending");
    fireEvent.click(screen.getByRole("button", { name: "Clear sort" }));
    expect(onSortingChange).toHaveBeenCalledWith([]);
  });
});
