import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MalbecLabelsProvider } from "../i18n/MalbecLabelsProvider";
import { DataTable } from "./DataTable";

type Row = { id: string; name: string; city: string };
const columns = [
  { accessorKey: "name", header: "Nombre", enableHiding: false },
  { accessorKey: "city", header: "Ciudad" },
  { id: "net", accessorFn: () => "US$ 1", header: () => "Neto", meta: { label: "Neto" } },
];
const data: Row[] = [{ id: "1", name: "Rosario", city: "Rosario" }];

describe("DataTable.ColumnsToggle", () => {
  it("lists the hideable columns and toggles their visibility", () => {
    render(
      <MalbecLabelsProvider locale="es">
        <DataTable<Row, unknown>
          columns={columns}
          data={data}
          emptyLabel="Sin shows"
          toolbar={({ table }) => <DataTable.ColumnsToggle table={table} />}
        />
      </MalbecLabelsProvider>,
    );
    expect(screen.getByRole("columnheader", { name: "Ciudad" })).toBeTruthy();

    fireEvent.keyDown(screen.getByRole("button", { name: "Columnas" }), { key: "Enter" });
    const items = screen.getAllByRole("menuitemcheckbox");
    expect(items.map((i) => i.textContent)).toEqual(["Ciudad", "Neto"]);
    expect(items[0].getAttribute("aria-checked")).toBe("true");

    fireEvent.click(items[0]);
    expect(screen.queryByRole("columnheader", { name: "Ciudad" })).toBeNull();
    expect(screen.getByRole("menuitemcheckbox", { name: "Ciudad" }).getAttribute("aria-checked")).toBe(
      "false",
    );
  });
});
