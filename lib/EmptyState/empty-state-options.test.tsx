import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

// Live feedback on 2.1.0-rc.5: `row` needs padding inside a table frame or a tray, and `ghost`
// needs a frame and a shorter row when it sits inside a dialog or a sheet. All opt-in.
const classesOf = (el: Element | null) => el?.className.split(/\s+/) ?? [];
const root = (c: HTMLElement) => c.querySelector('[data-slot="empty-state"]');

describe("EmptyState options", () => {
  it("row: inset pads it to the height of a table row; without it there is no padding", () => {
    const plain = render(<EmptyState title="Todavía no hay costos." />).container;
    expect(classesOf(root(plain)).some((c) => /^ui:p[xy]?-/.test(c))).toBe(false);

    const inset = render(<EmptyState inset title="Todavía no hay costos." />).container;
    expect(root(inset)?.getAttribute("data-inset")).toBe("true");
    expect(classesOf(root(inset))).toEqual(expect.arrayContaining(["ui:px-3.5", "ui:py-[13px]"]));
  });

  it("ghost: framed draws the Table frame around the placeholder", () => {
    const framed = render(<EmptyState variant="ghost" framed title="Sin facturas" />).container;
    expect(classesOf(root(framed))).toEqual(
      expect.arrayContaining(["ui:border", "ui:border-background-300", "ui:rounded-[10px]", "ui:overflow-hidden"]),
    );
    const plain = render(<EmptyState variant="ghost" title="Sin facturas" />).container;
    expect(classesOf(root(plain))).not.toContain("ui:border");
  });

  it('ghost: size="sm" makes the placeholder rows 36px instead of 46px', () => {
    const rowsOf = (c: HTMLElement) => [...(c.querySelector('[data-slot="empty-state-ghost"]')?.children ?? [])];
    const md = render(<EmptyState variant="ghost" title="Sin facturas" />).container;
    expect(rowsOf(md).every((r) => classesOf(r).includes("ui:h-[46px]"))).toBe(true);
    const sm = render(<EmptyState variant="ghost" size="sm" rows={2} title="Sin facturas" />).container;
    expect(rowsOf(sm)).toHaveLength(2);
    expect(rowsOf(sm).every((r) => classesOf(r).includes("ui:h-9"))).toBe(true);
  });

  it("ghost: the text stacks on the rows instead of floating, so a short placeholder grows to fit it", () => {
    const { container } = render(
      <EmptyState variant="ghost" size="sm" rows={1} title="Sin facturas" action={<button type="button">Cargar</button>} />,
    );
    expect(classesOf(root(container))).toContain("ui:grid");
    const overlay = container.querySelector('[data-slot="empty-state-content"]');
    expect(classesOf(overlay)).toContain("ui:[grid-area:1/1]");
    expect(classesOf(overlay)).not.toContain("ui:absolute");
  });
});

describe("EmptyState page divider", () => {
  it("draws the embossed divider by default and drops it with divider={false}", () => {
    const withLine = render(<EmptyState variant="page" title="Sin shows" />).container;
    expect(classesOf(root(withLine))).toContain("ui:border-t");
    const plain = render(<EmptyState variant="page" divider={false} title="Sin shows" />).container;
    expect(classesOf(root(plain))).not.toContain("ui:border-t");
    expect(classesOf(root(plain)).some((c) => c.startsWith("ui:shadow-"))).toBe(false);
  });
});
