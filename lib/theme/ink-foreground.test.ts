import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import * as presets from "./presets";

const INK = "#1a1a1f";

describe("Light foreground (2.0)", () => {
  it("uses ink, not black, as the light foreground in every preset", () => {
    for (const preset of Object.values(presets)) {
      expect(preset.light.foreground?.toLowerCase()).toBe(INK);
    }
  });

  it("uses ink as the light foreground in styles.css", () => {
    const css = readFileSync("lib/styles.css", "utf8");
    const root = css.slice(0, css.indexOf("}"));
    expect(root).toContain(`--color-foreground: ${INK};`);
  });
});
