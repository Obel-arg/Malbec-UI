import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MalbecLabelsProvider } from "../i18n/MalbecLabelsProvider";
import { DataTable } from "./DataTable";

type Row = { id: string; name: string };
const columns = [{ accessorKey: "name", header: "Nombre" }];
const rows = (n: number): Row[] =>
  Array.from({ length: n }, (_, i) => ({ id: String(i + 1), name: `Show ${i + 1}` }));

const names = () => screen.queryAllByText(/^Show \d+$/).map((el) => el.textContent);

describe("DataTable pagination", () => {
  it("pageSize paginates on the client and DataTable.Pagination moves between pages", () => {
    render(
      <MalbecLabelsProvider locale="es">
        <DataTable<Row, unknown>
          columns={columns}
          data={rows(25)}
          emptyLabel="Sin shows"
          pageSize={10}
          footer={({ table }) => <DataTable.Pagination table={table} />}
        />
      </MalbecLabelsProvider>,
    );
    expect(names()).toHaveLength(10);
    expect(names()[0]).toBe("Show 1");
    fireEvent.click(screen.getByRole("link", { name: "Ir a la página siguiente" }));
    expect(names()[0]).toBe("Show 11");
    fireEvent.click(screen.getByRole("link", { name: "3" }));
    expect(names()).toEqual(["Show 21", "Show 22", "Show 23", "Show 24", "Show 25"]);
    expect(screen.getByRole("link", { name: "3" }).getAttribute("aria-current")).toBe("page");
  });

  it("hides the pagination when everything fits in one page", () => {
    render(
      <DataTable<Row, unknown>
        columns={columns}
        data={rows(4)}
        emptyLabel="Sin shows"
        pageSize={10}
        footer={({ table }) => <DataTable.Pagination table={table} />}
      />,
    );
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("server mode: rowCount + controlled pagination renders data as-is and reports page changes", () => {
    const onPaginationChange = vi.fn();
    render(
      <DataTable<Row, unknown>
        columns={columns}
        data={rows(10)}
        emptyLabel="Sin shows"
        rowCount={95}
        pagination={{ pageIndex: 0, pageSize: 10 }}
        onPaginationChange={onPaginationChange}
        footer={({ table }) => <DataTable.Pagination table={table} />}
      />,
    );
    expect(names()).toHaveLength(10);
    expect(screen.getByRole("link", { name: "10" })).toBeTruthy();
    fireEvent.click(screen.getByRole("link", { name: "Go to next page" }));
    expect(onPaginationChange).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 10 });
  });

  it("does not paginate without pageSize, pagination or rowCount", () => {
    render(<DataTable<Row, unknown> columns={columns} data={rows(25)} emptyLabel="Sin shows" />);
    expect(names()).toHaveLength(25);
  });
});
