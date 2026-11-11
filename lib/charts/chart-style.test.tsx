import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  AREA_ALPHAS,
  ChartCard,
  ChartMarkDefs,
  CrosshairCursor,
  DottedGridLine,
  areaColor,
  makeStackedBarShape,
  seriesPaint,
  snapDotRowStart,
  snapToDotGrid,
  topCapPath,
} from "./chart-style";

const svg = (el: React.ReactElement | null) =>
  render(<svg>{el}</svg>).container.querySelector("svg")!.firstElementChild;

describe("chart palette (charts.md §3)", () => {
  it("starts at the deepest tone and keeps the dark → light ranking", () => {
    expect(AREA_ALPHAS[0]).toBe(0.92);
    for (let i = 1; i < AREA_ALPHAS.length; i++) expect(AREA_ALPHAS[i]).toBeLessThan(AREA_ALPHAS[i - 1]);
  });

  it("uses the warm SERIES_INK for data and cycles by entity index", () => {
    expect(areaColor(0)).toBe("rgba(72, 67, 61, 0.92)");
    expect(areaColor(AREA_ALPHAS.length)).toBe(areaColor(0));
    expect(seriesPaint(AREA_ALPHAS.length + 1)).toBe(seriesPaint(1));
  });

  it("ChartMarkDefs ships one gradient per step plus the single-series one", () => {
    const { container } = render(<ChartMarkDefs />);
    expect(container.querySelectorAll("linearGradient")).toHaveLength(AREA_ALPHAS.length + 1);
  });
});

describe("dot grid (charts.md §5)", () => {
  it("snaps to the field's rows (phase 4, step 8)", () => {
    expect(snapToDotGrid(13)).toBe(12);
    expect(snapToDotGrid(17)).toBe(20);
    expect(snapDotRowStart(13)).toBe(20);
  });

  it("skips the baseline and dots the other guides", () => {
    expect(svg(<DottedGridLine x1={0} x2={100} y1={100} y2={100} x={0} y={0} width={100} height={100} />)!.tagName).toBe("g");
    const line = svg(<DottedGridLine x1={0} x2={100} y1={50} y2={50} x={0} y={0} width={100} height={100} />)!;
    expect(line.getAttribute("stroke-dasharray")).toBe("0 8");
    expect(line.getAttribute("y1")).toBe("52");
  });

  it("ChartCard paints the dot field", () => {
    const { container } = render(<ChartCard />);
    expect((container.firstChild as HTMLElement).style.backgroundSize).toBe("8px 8px");
  });
});

describe("marks (charts.md §4, §8)", () => {
  it("topCapPath is a plain rectangle without radius", () => {
    expect(topCapPath(0, 0, 10, 20, 0)).toBe("M0 0 h10 v20 h-10 Z");
  });

  it("rounds only the top segment with a value, even when the last series is 0", () => {
    const keys = ["a", "b", "c"];
    const props = { x: 0, y: 0, width: 48, height: 20, fill: "x", payload: { a: 3, b: 2, c: 0 } };
    const capped = (key: string) => (svg(makeStackedBarShape(keys, key)(props))!.getAttribute("d") ?? "").includes("Q");
    expect(capped("b")).toBe(true);
    expect(capped("a")).toBe(false);
    expect(capped("c")).toBe(false);
  });

  it("CrosshairCursor accepts a bar band and line points", () => {
    expect(svg(<CrosshairCursor x={10} y={0} width={20} height={100} />)!.getAttribute("x1")).toBe("20");
    expect(svg(<CrosshairCursor points={[{ x: 5, y: 0 }, { x: 5, y: 90 }]} />)!.getAttribute("y2")).toBe("90");
  });
});
