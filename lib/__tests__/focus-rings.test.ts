import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sources(path);
    return /\.(ts|tsx)$/.test(name) && !/\.(test|stories)\.tsx?$/.test(name) ? [path] : [];
  });
}

describe("focus rings (malbec-ux-ui: brand colour only for CTA and state)", () => {
  it("never paint the focus ring in the brand colour", () => {
    const offenders = sources("lib").filter((file) =>
      /focus(-visible)?:ring-primary|focus(-visible)?:ring-offset-white/.test(readFileSync(file, "utf8")),
    );
    expect(offenders).toEqual([]);
  });
});

describe("--color-focus", () => {
  const css = readFileSync("lib/styles.css", "utf8");
  const root = css.slice(css.indexOf(":root"), css.indexOf("}", css.indexOf(":root")));
  const dark = css.slice(css.indexOf(".dark {"), css.indexOf("}", css.indexOf(".dark {")));

  it("is the neutral icon grey in light mode", () => {
    expect(root).toContain("--color-focus: #3f3f46;");
  });

  it("has a light value in dark mode, so the ring stays visible on dark surfaces", () => {
    expect(dark).toContain("--color-focus: #a8a29e;");
  });

  it("is what every focus ring uses", () => {
    const rings = sources("lib")
      .map((file) => readFileSync(file, "utf8"))
      .flatMap((src) => src.match(/focus(-visible|-within)?:ring-(?!\d|offset|inset)[\w-]+/g) ?? []);
    expect(new Set(rings.map((r) => r.replace(/^.*:ring-/, "")))).toEqual(
      new Set(["focus", "background-300"]),
    );
  });
});
