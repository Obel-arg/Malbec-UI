import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Table } from "./Table";

function Shows({ stackOnMobile = false, stickyHeader = false }) {
  return (
    <Table
      stackOnMobile={stackOnMobile}
      stickyHeader={stickyHeader}
      containerClassName="ui:max-h-[320px]"
    >
      <Table.Header>
        <Table.Row>
          <Table.Head>Show</Table.Head>
          <Table.Head>Fecha</Table.Head>
          <Table.Head className="ui:text-right">Neto</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Rosario · Metropolitano</Table.Cell>
          <Table.Cell>12/11</Table.Cell>
          <Table.Cell>US$ 8.802</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell colSpan={3}>Total</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

describe("Table stackOnMobile", () => {
  it("labels every body cell with its column name, skipping cells that span columns", () => {
    const { container } = render(<Shows stackOnMobile />);
    expect(container.querySelector("[data-stack-on-mobile]")).not.toBeNull();
    expect(screen.getByText("12/11").getAttribute("data-label")).toBe("Fecha");
    expect(screen.getByText("US$ 8.802").getAttribute("data-label")).toBe("Neto");
    expect(screen.getByText("Total").hasAttribute("data-label")).toBe(false);
  });

  it("leaves cells alone without the prop", () => {
    const { container } = render(<Shows />);
    expect(container.querySelector("[data-stack-on-mobile]")).toBeNull();
    expect(screen.getByText("12/11").hasAttribute("data-label")).toBe(false);
  });

  it("ships the phone-only card layout in styles.css", () => {
    const css = readFileSync("lib/styles.css", "utf8");
    expect(css).toMatch(/@media \(max-width: 639px\) \{\s*\[data-stack-on-mobile\]/);
  });
});
describe("Table stickyHeader", () => {
  it("makes the container scroll and pins the header cells", () => {
    const { container } = render(<Shows stickyHeader />);
    const shell = container.firstElementChild as HTMLElement;
    expect(shell.className).toContain("ui:overflow-y-auto");
    expect(shell.className).toContain("ui:max-h-[320px]");
    expect(container.querySelector("thead")!.className).toContain("ui:[&_th]:sticky");
  });
});
