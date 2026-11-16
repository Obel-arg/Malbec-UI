import { describe, expect, it } from "vitest";
import { alertDialogContentVariants, alertDialogFooterVariants } from "../AlertDialog/alert-dialog-variants";
import {
  commandDialogContentVariants,
  commandFooterVariants,
  commandRootVariants,
} from "../Command/command-variants";
import { dialogContentVariants } from "../Dialog/dialog-variants";
import {
  dropdownMenuContentVariants,
  dropdownMenuSubContentVariants,
} from "../DropdownMenu/dropdown-menu-variants";
import { popoverContentVariants } from "../Popover/popover-variants";
import { sheetContentVariants } from "../Sheet/sheet-variants";

const classes = (s: string) => s.split(/\s+/);

/**
 * On a 375px phone with the keyboard open, an overlay taller than the screen hid its title and
 * actions with no way to scroll, and some overlays ran edge to edge or past the screen.
 */
describe("overlays on a phone", () => {
  it("Dialog keeps a 1rem gutter by default and scrolls when taller than the screen", () => {
    const c = classes(dialogContentVariants());
    expect(c).toContain("ui:w-[min(calc(100vw-2rem),425px)]");
    expect(c).toContain("ui:max-h-[calc(100dvh-2rem)]");
    expect(c).toContain("ui:overflow-y-auto");
  });

  it("AlertDialog keeps a gutter, scrolls, and wraps a footer that doesn't fit", () => {
    const c = classes(alertDialogContentVariants());
    expect(c).toContain("ui:w-[calc(100vw-2rem)]");
    expect(c).toContain("ui:max-h-[calc(100dvh-2rem)]");
    expect(c).toContain("ui:overflow-y-auto");
    expect(classes(alertDialogFooterVariants())).toContain("ui:flex-wrap");
  });

  it("CommandDialog keeps a gutter and lets the list shrink instead of pushing the input off", () => {
    const c = classes(commandDialogContentVariants());
    expect(c).toContain("ui:w-[calc(100vw-2rem)]");
    expect(c).toContain("ui:max-h-[calc(100dvh-2rem)]");
    expect(c).toContain("ui:flex");
    expect(classes(commandRootVariants())).toContain("ui:min-h-0");
  });

  it("Command hides the keyboard hints on touch screens", () => {
    expect(classes(commandFooterVariants())).toContain("ui:pointer-coarse:hidden");
  });

  it("DropdownMenu scrolls instead of clipping a long menu", () => {
    for (const c of [classes(dropdownMenuContentVariants()), classes(dropdownMenuSubContentVariants())]) {
      expect(c).toContain("ui:max-h-(--radix-dropdown-menu-content-available-height)");
      expect(c).toContain("ui:overflow-y-auto");
      expect(c).not.toContain("ui:overflow-hidden");
    }
  });

  it("Popover scrolls when its content is taller than the space left", () => {
    const c = classes(popoverContentVariants());
    expect(c).toContain("ui:max-h-(--radix-popover-content-available-height)");
    expect(c).toContain("ui:overflow-y-auto");
  });

  it("left/right Sheet never gets wider than the screen", () => {
    expect(classes(sheetContentVariants({ side: "right" }))).toContain("ui:w-[min(100vw,384px)]");
    expect(classes(sheetContentVariants({ side: "left" }))).toContain("ui:w-[min(100vw,384px)]");
  });

  it("top/bottom Sheet caps its height and scrolls", () => {
    for (const side of ["top", "bottom"] as const) {
      const c = classes(sheetContentVariants({ side }));
      expect(c).toContain("ui:max-h-[90dvh]");
      expect(c).toContain("ui:overflow-y-auto");
    }
  });
});
