import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("lib/styles.css", "utf8");
const chartVars = [...css.matchAll(/--chart-\d:\s*([^;]+);/g)].map((m) => m[1]);

describe("--chart-* tokens (malbec-ux-ui charts.md)", () => {
  it("defines five series in light and five in dark", () => {
    expect(chartVars).toHaveLength(10);
  });

  it("never use the brand colour as data", () => {
    for (const value of chartVars) expect(value).not.toMatch(/primary|accent/);
  });

  it("do not depend on color-mix", () => {
    for (const value of chartVars) expect(value).not.toContain("color-mix");
  });

  it("start at the deepest SERIES_INK step (rgba(72,67,61,.92) over #f8f8f8)", () => {
    expect(chartVars[0]).toBe("#56514c");
  });
});

describe("styles.css", () => {
  it("does not use color-mix() anywhere (CLAUDE.md: it splits under @supports)", () => {
    expect(css).not.toContain("color-mix(");
  });
});
