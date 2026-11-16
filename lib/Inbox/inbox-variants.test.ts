import { describe, expect, it } from "vitest";
import {
  inboxItemVariants,
  inboxTabCountVariants,
  inboxTabTriggerVariants,
} from "./inbox-variants";

const brand = /primary|color-mix/;

describe("Inbox carries no brand tint (malbec-ux-ui: brand only for CTA and state)", () => {
  it("tab count is a grey chip", () => {
    const classes = inboxTabCountVariants();
    expect(classes).not.toMatch(brand);
    expect(classes).toContain("ui:bg-background-300");
    expect(classes).toContain("ui:text-malbec-icon");
  });

  it("unread rows are not tinted with the brand colour", () => {
    expect(inboxItemVariants({ unread: true })).not.toMatch(brand);
  });

  it("the active tab underline is neutral", () => {
    expect(inboxTabTriggerVariants({ active: true })).not.toMatch(/after:bg-primary/);
  });
});
