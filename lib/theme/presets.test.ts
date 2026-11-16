import { describe, expect, it } from "vitest";
import * as presets from "./presets";
import * as theme from "./index";

describe("theme presets", () => {
  it("names the green preset after the product that uses it: Artist", () => {
    expect(presets).toHaveProperty("artist");
    expect(presets.artist).toMatchObject({
      name: "Artist",
      light: { primary: "#0A3D2F" },
    });
  });

  it("no longer exports the old management name", () => {
    expect(presets).not.toHaveProperty("management");
    expect(theme).not.toHaveProperty("management");
  });
});
