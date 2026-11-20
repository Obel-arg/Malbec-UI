import { describe, expect, it } from "vitest";
import { tabsListVariants, tabsTriggerVariants } from "./tabs-variants";

// 3.0 workshop: the active tab is marked by opacity, with no rail and no indicator.
describe('Tabs variant="underline" (3.0)', () => {
  it("renders exactly like opacity", () => {
    expect(tabsListVariants({ variant: "underline" })).toBe(tabsListVariants({ variant: "opacity" }));
    expect(tabsTriggerVariants({ variant: "underline" })).toBe(tabsTriggerVariants({ variant: "opacity" }));
  });

  it("draws no rail and no indicator line", () => {
    expect(tabsListVariants({ variant: "underline" })).not.toContain("border-b");
    expect(tabsTriggerVariants({ variant: "underline" })).not.toContain("ui:after:");
  });
});
