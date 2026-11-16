import type { ColumnDef } from "@tanstack/react-table";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MalbecLabelsProvider } from "../i18n/MalbecLabelsProvider";
import { DataTable } from "./DataTable";

type Show = { id: string; artist: string; venue: string; date: string; status: string };

const data: Show[] = [
  { id: "1", artist: "Rels B", venue: "Movistar Arena", date: "2026-02-13", status: "Closed" },
  { id: "2", artist: "Bad Bunny", venue: "River", date: "2026-03-20", status: "Open" },
];

const columns: ColumnDef<Show>[] = [
  { accessorKey: "artist", header: "Artista", meta: { mobile: "title" } },
  { accessorKey: "venue", header: "Venue", meta: { mobile: "subtitle" } },
  { accessorKey: "date", header: "Fecha", meta: { mobile: "subtitle" } },
  { accessorKey: "status", header: "Status", meta: { mobile: "trailing" }, enableSorting: false },
  { id: "notes", header: "Notas", cell: () => "secret", meta: { mobile: "hidden" } },
];

const list = () => document.querySelector<HTMLElement>('[data-slot="data-table-list"]')!;
const items = () => within(list()).getAllByRole("listitem");

function renderList(props: Partial<React.ComponentProps<typeof DataTable<Show, unknown>>> = {}) {
  return render(
    <MalbecLabelsProvider locale="es">
      <DataTable<Show, unknown>
        columns={columns}
        data={data}
        emptyLabel="Sin shows"
        getRowId={(r) => r.id}
        mobileLayout="list"
        {...(props as object)}
      />
    </MalbecLabelsProvider>,
  );
}

describe("DataTable mobileLayout=\"list\"", () => {
  it("renders the list below sm and keeps the table from sm up", () => {
    renderList();
    expect(list().className).toContain("ui:sm:hidden");
    // A long nowrap title can't widen a flex parent past the screen: the text column has
    // width 0 + flex-1, so it adds nothing to the list's minimum width.
    const text = list().querySelector('[data-slot="data-table-list-text"]')!;
    expect(text.className).toContain("ui:w-0");
    expect(text.className).toContain("ui:flex-1");
    const shell = document.querySelector('[data-slot="table-container"]')!;
    expect(shell.className).toContain("ui:max-sm:hidden");
    expect(items()).toHaveLength(2);
  });

  it("places each column by meta.mobile: title, subtitle joined, trailing, hidden", () => {
    renderList();
    const first = items()[0]!;
    expect(first.querySelector('[data-slot="data-table-list-title"]')!.textContent).toBe("Rels B");
    expect(first.querySelector('[data-slot="data-table-list-subtitle"]')!.textContent).toBe(
      "Movistar Arena · 2026-02-13",
    );
    expect(first.querySelector('[data-slot="data-table-list-trailing"]')!.textContent).toBe("Closed");
    expect(first.textContent).not.toContain("secret");
  });

  it("without meta.mobile: first column is the title, the next two the subtitle", () => {
    const plain: ColumnDef<Show>[] = [
      { accessorKey: "artist", header: "Artista" },
      { accessorKey: "venue", header: "Venue" },
      { accessorKey: "date", header: "Fecha" },
      { accessorKey: "status", header: "Status" },
    ];
    renderList({ columns: plain as ColumnDef<Show, unknown>[] });
    const first = items()[0]!;
    expect(first.querySelector('[data-slot="data-table-list-title"]')!.textContent).toBe("Rels B");
    expect(first.querySelector('[data-slot="data-table-list-subtitle"]')!.textContent).toBe(
      "Movistar Arena · 2026-02-13",
    );
    expect(first.querySelector('[data-slot="data-table-list-trailing"]')).toBeNull();
  });

  it("sorts from the toolbar: pick a column, then the direction", () => {
    const onSortingChange = vi.fn();
    renderList({ onSortingChange });
    const trigger = within(list()).getByRole("button", { name: /Ordenar por/ });
    fireEvent.keyDown(trigger, { key: "Enter" });
    // Only sortable columns are offered (Status has enableSorting: false).
    expect(screen.queryByRole("menuitemradio", { name: "Status" })).toBeNull();
    fireEvent.click(screen.getByRole("menuitemradio", { name: "Artista" }));
    expect(onSortingChange).toHaveBeenLastCalledWith([{ id: "artist", desc: false }]);
    expect(items().map((li) => li.querySelector('[data-slot="data-table-list-title"]')!.textContent)).toEqual([
      "Bad Bunny",
      "Rels B",
    ]);
    fireEvent.keyDown(within(list()).getByRole("button", { name: /Ordenar por/ }), { key: "Enter" });
    fireEvent.click(screen.getByRole("menuitemradio", { name: "Descendente" }));
    expect(onSortingChange).toHaveBeenLastCalledWith([{ id: "artist", desc: true }]);
  });

  it("selects rows and all rows with checkboxes", () => {
    const onRowSelectionChange = vi.fn();
    renderList({ rowSelection: true, onRowSelectionChange } as object);
    const rowBoxes = within(list()).getAllByRole("checkbox", { name: "Seleccionar fila" });
    expect(rowBoxes).toHaveLength(2);
    fireEvent.click(rowBoxes[0]!);
    expect(onRowSelectionChange).toHaveBeenLastCalledWith([data[0]]);
    fireEvent.click(within(list()).getByRole("checkbox", { name: "Seleccionar todas" }));
    expect(onRowSelectionChange).toHaveBeenLastCalledWith(data);
    expect(items()[1]!.getAttribute("data-state")).toBe("selected");
  });

  it("opens a row with onRowClick, but not from its checkbox", () => {
    const onRowClick = vi.fn();
    renderList({ onRowClick, rowSelection: true } as object);
    const row = items()[1]!.querySelector<HTMLElement>('[role="button"]')!;
    fireEvent.click(row);
    expect(onRowClick).toHaveBeenCalledWith("2", data[1], expect.anything());
    fireEvent.click(within(items()[1]!).getByRole("checkbox"));
    expect(onRowClick).toHaveBeenCalledTimes(1);
  });

  it("shows emptyLabel when there are no rows", () => {
    renderList({ data: [] });
    expect(list().textContent).toContain("Sin shows");
  });
});
