import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataTable } from "./DataTable";

type Row = { id: string; artist: string };
const columns = [{ accessorKey: "artist", header: "Artist" }];
const data = [{ id: "1", artist: "Rosario · Metropolitano" }];

describe("DataTable defaults (2.0)", () => {
  it("has no selection column unless rowSelection is passed", () => {
    const { container } = render(<DataTable<Row, unknown> columns={columns} data={data} />);
    expect(screen.queryAllByRole("checkbox")).toHaveLength(0);
    expect(container.querySelector("[data-row-selection]")).toBeNull();
  });

  it("adds the selection column with rowSelection", () => {
    render(<DataTable<Row, unknown> columns={columns} data={data} rowSelection />);
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
  });

  it("uses the default table appearance (10px shell, bg-200 header)", () => {
    const { container } = render(<DataTable<Row, unknown> columns={columns} data={data} />);
    expect(container.querySelector(".ui\\:rounded-\\[10px\\]")).not.toBeNull();
    expect(container.querySelector("thead")!.className).toContain("ui:[&_tr]:bg-background-200");
  });

  it("keeps rows on background-100, never pure white", () => {
    const { container } = render(<DataTable<Row, unknown> columns={columns} data={data} />);
    expect(container.innerHTML).not.toContain("bg-white");
  });

  it("has no special padding for a column called artist", () => {
    render(<DataTable<Row, unknown> columns={columns} data={data} rowSelection />);
    expect(screen.getByText("Rosario · Metropolitano").closest("td")!.className).not.toContain("pl-[13px]");
  });
});
