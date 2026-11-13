import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataCard } from "./DataCard";

const classesOf = (el: Element) => el.className.split(/\s+/);

describe("DataCard (malbec-ux-ui data-card.md)", () => {
  it("is three layers: embossed frame, bevelled block with the figure, title on the frame below", () => {
    const { container } = render(
      <DataCard value="US$ 8.802" sub="6 costos" label="Gasto total" icon={<svg data-testid="icon" />} />,
    );
    const frame = container.querySelector('[data-slot="data-card"]')!;
    expect(classesOf(frame)).toEqual(
      expect.arrayContaining(["ui:rounded-[14px]", "ui:border-white", "ui:bg-background-200", "ui:p-1"]),
    );
    const block = frame.querySelector('[data-slot="data-card-block"]')!;
    expect(classesOf(block)).toEqual(expect.arrayContaining(["ui:flex-1", "ui:rounded-[10px]", "ui:bg-background-100"]));
    expect(classesOf(screen.getByText("US$ 8.802"))).toEqual(
      expect.arrayContaining(["ui:text-[17px]", "ui:font-semibold", "ui:tabular-nums", "ui:text-malbec-ink"]),
    );
    expect(block.textContent).toBe("US$ 8.802" + "6 costos");
    const title = frame.querySelector('[data-slot="data-card-title"]')!;
    expect(frame.lastElementChild).toBe(title);
    expect(title.textContent).toBe("Gasto total");
    expect(title.contains(screen.getByTestId("icon"))).toBe(true);
  });

  it('variant="count" moves the icon into the block, next to a 28px figure, everything centred', () => {
    const { container } = render(
      <DataCard variant="count" value="3" label="Shows esta semana" icon={<svg data-testid="icon" />} />,
    );
    const block = container.querySelector('[data-slot="data-card-block"]')!;
    expect(block.contains(screen.getByTestId("icon"))).toBe(true);
    expect(classesOf(block)).toContain("ui:justify-center");
    expect(classesOf(screen.getByText("3"))).toContain("ui:text-[28px]");
    const title = container.querySelector('[data-slot="data-card-title"]')!;
    expect(title.querySelector("svg")).toBeNull();
    expect(classesOf(title)).toContain("ui:justify-center");
  });

  it("uses no brand colour anywhere (rule 1)", () => {
    const { container } = render(<DataCard value="US$ 1" label="Total" />);
    expect(container.innerHTML).not.toMatch(/primary|accent/);
  });
});
