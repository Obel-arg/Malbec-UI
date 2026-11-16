import { describe, expect, it } from "vitest";
import { popoverContentVariants } from "./popover-variants";

describe("Popover content (2.0)", () => {
  it("sits on background-100, not pure white", () => {
    expect(popoverContentVariants()).toContain("ui:bg-background-100");
    expect(popoverContentVariants()).not.toContain("bg-white");
  });
});
