import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MalbecLabelsProvider } from "../i18n/MalbecLabelsProvider";
import { AREA_ALPHAS, OVER_BUDGET } from "./chart-style";
import { Donut, foldDonutData } from "./Donut";
import { PctBlocks, pctBlocksFilled } from "./PctBlocks";

const items = (n: number) => Array.from({ length: n }, (_, i) => ({ label: `P${i}`, value: 100 - i }));

describe("Donut", () => {
  it("keeps up to one slice per palette step", () => {
    expect(foldDonutData(items(AREA_ALPHAS.length), "Otros")).toHaveLength(AREA_ALPHAS.length);
  });

  it("folds the long tail into a last slice so 'Other' never takes the deepest tone", () => {
    const folded = foldDonutData(items(12), "Otros");
    expect(folded).toHaveLength(AREA_ALPHAS.length);
    expect(folded.at(-1)).toEqual({ label: "Otros", value: 93 + 92 + 91 + 90 + 89 });
  });

  it("renders the total in the centre", () => {
    render(
      <MalbecLabelsProvider locale="es">
        <Donut data={items(12)} total="US$ 8.802" caption="Gastos" />
      </MalbecLabelsProvider>,
    );
    expect(screen.getByText("US$ 8.802")).toBeTruthy();
    expect(screen.getByText("Gastos")).toBeTruthy();
  });
});

describe("PctBlocks", () => {
  it("lights one block per 10%", () => {
    expect(pctBlocksFilled(0)).toBe(0);
    expect(pctBlocksFilled(44)).toBe(4);
    expect(pctBlocksFilled(100)).toBe(10);
    expect(pctBlocksFilled(140)).toBe(10);
  });

  it("turns all 10 blocks into the over-budget state above 100%", () => {
    const { container } = render(<PctBlocks value={130} />);
    const blocks = container.querySelectorAll<HTMLElement>("[data-slot=pct-blocks] > span");
    expect(blocks).toHaveLength(10);
    blocks.forEach((block) => expect(block.style.backgroundColor).toBe(OVER_BUDGET));
    expect(screen.getByRole("img", { name: "130%" })).toBeTruthy();
  });
});
