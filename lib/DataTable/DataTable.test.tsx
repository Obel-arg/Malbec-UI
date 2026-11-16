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
      emptyLabel="Sin resultados"
    />,
  );
  return onRowClick;
}

describe("DataTable onRowClick", () => {
  it("fires when a cell is clicked", () => {
    const onRowClick = renderTable();
    fireEvent.click(screen.getByText("Rosario · Metropolitano"));
    expect(onRowClick).toHaveBeenCalledWith(
      "0",
      { id: "1", venue: "Rosario · Metropolitano" },
      expect.objectContaining({ type: "click" }),
    );
  });

  it("fires on Enter with the row focused", () => {
    const onRowClick = renderTable();
    const row = screen.getByText("Rosario · Metropolitano").closest("tr")!;
    fireEvent.keyDown(row, { key: "Enter" });
    expect(onRowClick).toHaveBeenCalledTimes(1);
  });

  it("passes the event, so cmd/ctrl+click can open the row elsewhere", () => {
    const onRowClick = renderTable();
    fireEvent.click(screen.getByText("Rosario · Metropolitano"), { metaKey: true });
    const event = onRowClick.mock.calls[0][2];
    expect(event.type).toBe("click");
    expect(event.metaKey).toBe(true);
  });

  it("passes the keyboard event on Enter", () => {
    const onRowClick = renderTable();
    const row = screen.getByText("Rosario · Metropolitano").closest("tr")!;
    fireEvent.keyDown(row, { key: "Enter", ctrlKey: true });
    const event = onRowClick.mock.calls[0][2];
    expect(event.type).toBe("keydown");
    expect(event.ctrlKey).toBe(true);
  });

  it("fires on middle-click with the event, but not on other aux buttons", () => {
    const onRowClick = renderTable();
    const cell = screen.getByText("Rosario · Metropolitano");
    fireEvent(cell, new MouseEvent("auxclick", { bubbles: true, button: 2 }));
    expect(onRowClick).not.toHaveBeenCalled();
    fireEvent(cell, new MouseEvent("auxclick", { bubbles: true, button: 1 }));
    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick.mock.calls[0][2].button).toBe(1);
  });

  it("ignores middle-clicks on interactive elements inside the row", () => {
    const onRowClick = renderTable();
    fireEvent(
      screen.getByRole("button", { name: "Edit" }),
      new MouseEvent("auxclick", { bubbles: true, button: 1 }),
    );
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it("ignores clicks on interactive elements inside the row", () => {
    const onRowClick = renderTable();
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    expect(onRowClick).not.toHaveBeenCalled();
  });
});
