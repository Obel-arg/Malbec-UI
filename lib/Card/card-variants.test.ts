import { describe, expect, it } from "vitest";
import { cardRootVariants } from "./card-variants";

describe("Card root (2.0)", () => {
  it("has no shadow by default: the border carries the edge", () => {
    expect(cardRootVariants()).not.toMatch(/shadow/);
    expect(cardRootVariants()).toContain("ui:border-background-300");
  });
});
