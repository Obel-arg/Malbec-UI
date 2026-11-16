import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Table } from "./Table";

/** Selectors with a `:has()` inside another `:has()`, which browsers drop. */
function nestedHas(css: string): string[] {
  const bad: string[] = [];
  for (const selector of css.split(/[{}]/).filter((_, i) => i % 2 === 0)) {
    const open: boolean[] = []; // per paren: is it a :has(
    for (let i = 0; i < selector.length; i++) {
      if (selector[i] === "(") {
        const isHas = selector.slice(i - 4, i) === ":has";
        if (isHas && open.includes(true)) bad.push(selector.trim());
        open.push(isHas);
      } else if (selector[i] === ")") open.pop();
    }
  }
  return bad;
}

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

  it("keeps the header's controls (sort, select all) as a row of chips on a phone", () => {
    // Hiding the whole <thead> took sorting and "select all" away on a phone.
    const css = readFileSync("lib/styles.css", "utf8");
    const phone = css.slice(css.indexOf("@media (max-width: 639px) {\n  [data-stack-on-mobile]"));
    expect(phone).not.toMatch(/\[data-stack-on-mobile\] table > thead,\s*\[data-stack-on-mobile\] table > colgroup \{\s*display: none;/);
    expect(phone).toMatch(/\[data-stack-on-mobile\] table > thead > tr \{[^}]*display: flex;[^}]*flex-wrap: wrap;/);
    // Header cells without a control (plain column names) stay hidden.
    expect(phone).toMatch(/\[data-stack-on-mobile\] table > thead > tr > th:not\(:has\(button, input\)\) \{\s*display: none;/);
  });

  it("lays out the card: checkbox and actions in the top corners, words never split", () => {
    // On a phone the checkbox sat alone on its own line, the ••• sat centred with an
    // "Acciones" label under it, and "13/02/2026" split into "13/02/2" + "026".
    const css = readFileSync("lib/styles.css", "utf8");
    const phone = css.slice(css.indexOf("@media (max-width: 639px) {\n  [data-stack-on-mobile]"));
    const select = /\[data-stack-on-mobile\] table > tbody > tr > :has\(\[role="checkbox"\]\) \{[^}]*position: absolute !important;[^}]*left: 12px;/;
    expect(phone).toMatch(select);
    const actions = /\[data-stack-on-mobile\] table > tbody > tr > :last-child:has\(button\):not\(:has\(\[role="checkbox"\]\)\) \{[^}]*position: absolute !important;[^}]*right: 8px;/;
    expect(phone).toMatch(actions);
    expect(phone).not.toContain("overflow-wrap: anywhere;");
    expect(phone).toContain("overflow-wrap: break-word;");
    // `:has()` inside `:has()` is invalid CSS and drops the whole rule.
    expect(nestedHas(phone.slice(0, phone.indexOf("\n}\n")))).toEqual([]);
  });
});
