import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { withAlpha } from "../utils/with-alpha";

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sources(path);
    return /\.(ts|tsx|css)$/.test(name) && !/\.(test|stories)\.tsx?$/.test(name) ? [path] : [];
  });
}

describe("no color-mix() in lib (CLAUDE.md)", () => {
  it("no source uses color-mix(): browsers without it drop the whole declaration", () => {
    expect(sources("lib").filter((f) => readFileSync(f, "utf8").includes("color-mix("))).toEqual([]);
  });

  it("withAlpha equals mixing X with transparent in srgb", () => {
    expect(withAlpha("#8a862f", 0.6)).toBe("rgba(138, 134, 47, 0.6)");
    expect(withAlpha("#602A2A", 0.08)).toBe("rgba(96, 42, 42, 0.08)");
  });
});
