import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MalbecLabelsProvider } from "../i18n/MalbecLabelsProvider";
import { DataTable } from "./DataTable";

type Row = { id: string; name: string };
const columns = [{ accessorKey: "name", header: "Nombre" }];

describe("DataTable labels", () => {
  it("renders the emptyLabel it is given, never a built-in English text", () => {
    render(<DataTable<Row, unknown> columns={columns} data={[]} emptyLabel="Sin resultados" />);
    expect(screen.getByText("Sin resultados")).toBeTruthy();
    expect(screen.queryByText("No results.")).toBeNull();
  });

  it("requires emptyLabel", () => {
    // @ts-expect-error emptyLabel is required: there is no English fallback.
    const el = <DataTable<Row, unknown> columns={columns} data={[]} />;
    expect(el).toBeTruthy();
  });

  it("labels the selection checkboxes from MalbecLabelsProvider", () => {
    render(
      <MalbecLabelsProvider locale="es">
        <DataTable<Row, unknown>
          columns={columns}
          data={[{ id: "1", name: "Rosario" }]}
          emptyLabel="Sin resultados"
          rowSelection
        />
      </MalbecLabelsProvider>,
    );
    expect(screen.getByRole("checkbox", { name: "Seleccionar todas" })).toBeTruthy();
    expect(screen.getByRole("checkbox", { name: "Seleccionar fila" })).toBeTruthy();
  });
});
