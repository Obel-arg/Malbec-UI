import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

type Row = { id: string; artist: string; amount: number };
const data: Row[] = [{ id: "1", artist: "Rosario · Metropolitano", amount: 1200 }];

describe("DataTable column meta classes", () => {
  it("applies meta.tdClassName to every body cell of that column", () => {
    const columns: ColumnDef<Row, unknown>[] = [
      { accessorKey: "artist", header: "Artist" },
      { accessorKey: "amount", header: "Amount", meta: { tdClassName: "ui:text-right" } },
    ];
    render(<DataTable<Row, unknown> columns={columns} data={data} emptyLabel="Sin resultados" />);

    expect(screen.getByText("1200").closest("td")!.className).toContain("ui:text-right");
    expect(screen.getByText("Rosario · Metropolitano").closest("td")!.className).not.toContain("ui:text-right");
  });

  it("keeps applying meta.thClassName to the header cell", () => {
    const columns: ColumnDef<Row, unknown>[] = [
      { accessorKey: "amount", header: "Amount", meta: { thClassName: "ui:text-right" } },
    ];
    render(<DataTable<Row, unknown> columns={columns} data={data} emptyLabel="Sin resultados" />);

    expect(screen.getByRole("columnheader", { name: "Amount" }).className).toContain("ui:text-right");
  });
});
