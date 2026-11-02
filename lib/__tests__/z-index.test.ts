import { globSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Overlays (50), floating surfaces (100) and nested submenus (110) stack across
// components, so apps must be able to move them. They go through --ui-z-* vars.
const GLOBAL_LAYER = /ui:(?:[a-z-]+:)*z-(?:50|100|110)\b/g;

describe("z-index layers", () => {
  it("uses the --ui-z-* variables instead of fixed numbers", () => {
    const offenders = globSync("lib/**/*.{ts,tsx}")
      .filter((f) => !/\.(test|stories)\.tsx?$/.test(f))
      .flatMap((f) => [...readFileSync(f, "utf8").matchAll(GLOBAL_LAYER)].map((m) => `${f} ${m[0]}`));
    expect(offenders).toEqual([]);
  });

  it("keeps the same values", () => {
    const css = readFileSync("lib/styles.css", "utf8");
    expect(css).toMatch(/--ui-z-overlay:\s*50;/);
    expect(css).toMatch(/--ui-z-floating:\s*100;/);
    expect(css).toMatch(/--ui-z-floating-nested:\s*110;/);
  });
});
