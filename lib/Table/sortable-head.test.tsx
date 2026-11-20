import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MalbecLabelsProvider } from "../i18n/MalbecLabelsProvider";
import { Table } from "./Table";

function renderHead(props: Partial<React.ComponentProps<typeof Table.SortableHead>> = {}) {
  const onSort = vi.fn();
  render(
    <MalbecLabelsProvider locale="es">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.SortableHead sort={null} onSort={onSort} {...props}>
              Fecha
            </Table.SortableHead>
          </Table.Row>
        </Table.Header>
      </Table>
    </MalbecLabelsProvider>,
  );
  return { onSort, th: screen.getByRole("columnheader"), button: screen.getByRole("button") };
}

describe("Table.SortableHead", () => {
  it("puts aria-sort on the th, not on an inner element", () => {
    const { th } = renderHead({ sort: "desc" });
    expect(th.getAttribute("aria-sort")).toBe("descending");
    expect(th.querySelector("[aria-sort]")).toBeNull();
  });

  it("leaves aria-sort off while another column sorts the table", () => {
    const { th } = renderHead({ sort: null });
    expect(th.hasAttribute("aria-sort")).toBe(false);
  });

  it("names the button after what the click does, in the app's language", () => {
    expect(renderHead({ sort: "asc" }).button.getAttribute("aria-label")).toBe("Ordenar descendente");
  });

  it("can announce that the next click clears the sort", () => {
    expect(renderHead({ sort: "desc", nextSort: null }).button.getAttribute("aria-label")).toBe("Quitar orden");
  });

  it("calls onSort on click", () => {
    const { onSort, button } = renderHead();
    fireEvent.click(button);
    expect(onSort).toHaveBeenCalledTimes(1);
  });
});
