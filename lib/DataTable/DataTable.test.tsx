import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DataTable } from "./DataTable";

type Show = { id: string; venue: string };

const columns = [
  { accessorKey: "venue", header: "Venue" },
  {
    id: "actions",
    header: "",
    cell: () => <button type="button">Edit</button>,
  },
];

function renderTable(onRowClick = vi.fn()) {
  render(
    <DataTable<Show, unknown>
      columns={columns}
      data={[{ id: "1", venue: "Rosario · Metropolitano" }]}
      onRowClick={onRowClick}
    />,
  );
  return onRowClick;
}

describe("DataTable onRowClick", () => {
  it("fires when a cell is clicked", () => {
    const onRowClick = renderTable();
    fireEvent.click(screen.getByText("Rosario · Metropolitano"));
    expect(onRowClick).toHaveBeenCalledWith("0", { id: "1", venue: "Rosario · Metropolitano" });
  });

  it("fires on Enter with the row focused", () => {
    const onRowClick = renderTable();
    const row = screen.getByText("Rosario · Metropolitano").closest("tr")!;
    fireEvent.keyDown(row, { key: "Enter" });
    expect(onRowClick).toHaveBeenCalledTimes(1);
  });

  it("ignores clicks on interactive elements inside the row", () => {
    const onRowClick = renderTable();
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    expect(onRowClick).not.toHaveBeenCalled();
  });
});
