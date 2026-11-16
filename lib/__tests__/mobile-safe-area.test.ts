import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { floatingBarVariants } from "../FloatingBar/floating-bar-variants";
import { sheetContentVariants } from "../Sheet/sheet-variants";
import { sidebarSheetContentVariants } from "../Sidebar/sidebar-variants";
import { sonnerMobileOffset } from "../Sonner/sonner-variants";

const css = readFileSync(resolve(__dirname, "../styles.css"), "utf8");
const classes = (s: string) => s.split(/\s+/);

/**
 * In a PWA running full screen, the notch and the home indicator cover the edges of the
 * screen. `env(safe-area-inset-*)` is 0 everywhere else, so nothing moves on desktop.
 */
describe("safe area in a full-screen PWA", () => {
  it("a bottom Sheet keeps its content above the home indicator", () => {
    expect(classes(sheetContentVariants({ side: "bottom" }))).toContain(
      "ui:pb-[max(1.5rem,env(safe-area-inset-bottom))]",
    );
  });

  it("a top Sheet keeps its content below the notch", () => {
    expect(classes(sheetContentVariants({ side: "top" }))).toContain(
      "ui:pt-[max(1.5rem,env(safe-area-inset-top))]",
    );
  });

  it("left/right Sheets clear both the notch and the home indicator", () => {
    for (const side of ["left", "right"] as const) {
      const c = classes(sheetContentVariants({ side }));
      expect(c).toContain("ui:pt-[max(1.5rem,env(safe-area-inset-top))]");
      expect(c).toContain("ui:pb-[max(1.5rem,env(safe-area-inset-bottom))]");
    }
  });

  it("the mobile Sidebar drawer pads for the notch and the home indicator", () => {
    const c = classes(sidebarSheetContentVariants({ side: "left" }));
    expect(c).toContain("ui:pt-[env(safe-area-inset-top)]");
    expect(c).toContain("ui:pb-[env(safe-area-inset-bottom)]");
  });

  it("the bottom FloatingBar stays 1rem above the home indicator", () => {
    expect(classes(floatingBarVariants({ placement: "bottom" }))).toContain(
      "ui:bottom-[max(2.5rem,calc(env(safe-area-inset-bottom)+1rem))]",
    );
  });

  it("Sonner keeps toasts clear of the notch and the home indicator on a phone", () => {
    expect(sonnerMobileOffset).toEqual({
      top: "max(16px, env(safe-area-inset-top))",
      bottom: "max(16px, env(safe-area-inset-bottom))",
    });
  });
});

describe("Sonner toast width on a phone", () => {
  it("the fixed 384px width applies only above Sonner's 600px mobile breakpoint", () => {
    const at = css.indexOf("width: 384px !important;");
    expect(at).toBeGreaterThan(-1);
    const before = css.slice(0, at);
    const media = before.lastIndexOf("@media (min-width: 601px)");
    expect(media).toBeGreaterThan(-1);
    // No block closes between the media query and the width: the width is inside it.
    expect(before.slice(media).split("{").length - 1).toBeGreaterThan(before.slice(media).split("}").length - 1);
  });
});
