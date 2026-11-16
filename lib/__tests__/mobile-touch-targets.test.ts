import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buttonVariants } from "../Button/button-variants";
import { calendarNavButtonVariants } from "../Calendar/calendar-variants";
import { checkboxRootVariants } from "../Checkbox/checkbox-variants";
import { comboboxItemVariants } from "../Combobox/combobox-variants";
import { commandItemVariants } from "../Command/command-variants";
import { dialogCloseVariants } from "../Dialog/dialog-variants";
import {
  dropdownMenuItemVariants,
  dropdownMenuSubTriggerVariants,
} from "../DropdownMenu/dropdown-menu-variants";
import { floatingBarCloseVariants } from "../FloatingBar/floating-bar-variants";
import { inboxIconButtonVariants, inboxItemHoverActionVariants } from "../Inbox/inbox-variants";
import { radioGroupItemVariants } from "../RadioGroup/radio-group-variants";
import { selectItemVariants } from "../Select/select-variants";
import { sheetCloseVariants } from "../Sheet/sheet-variants";
import { sidebarMenuButtonVariants, sidebarMenuSubButtonVariants } from "../Sidebar/sidebar-variants";

const css = readFileSync(resolve(__dirname, "../styles.css"), "utf8");
const classes = (s: string) => s.split(/\s+/);

/** Touch screens need about 44px to hit a control; several controls were 12–32px. */
describe("touch targets on a phone", () => {
  it("styles.css defines `hit-area`: an invisible 44px target, only on coarse pointers", () => {
    const block = css.slice(css.indexOf("@utility hit-area"));
    expect(block).toMatch(/^@utility hit-area \{/);
    expect(block.slice(0, 600)).toContain("@media (pointer: coarse)");
    expect(block.slice(0, 600)).toContain("44px");
  });

  const isolated: Array<[string, string]> = [
    ["Button icon", buttonVariants({ size: "icon" })],
    ["Button icon-sm", buttonVariants({ size: "icon-sm" })],
    ["Dialog close", dialogCloseVariants()],
    ["Sheet close", sheetCloseVariants()],
    ["FloatingBar close", floatingBarCloseVariants()],
    ["Calendar nav", calendarNavButtonVariants()],
    ["Checkbox", checkboxRootVariants()],
    ["Radio", radioGroupItemVariants()],
  ];

  it.each(isolated)("%s gets the hit area", (_name, cls) => {
    expect(classes(cls)).toContain("ui:hit-area");
  });

  const rows: Array<[string, string]> = [
    ["Select item", selectItemVariants()],
    ["DropdownMenu item", dropdownMenuItemVariants()],
    ["DropdownMenu sub-trigger", dropdownMenuSubTriggerVariants()],
    ["Combobox item", comboboxItemVariants()],
    ["Command item", commandItemVariants()],
    ["Sidebar menu button", sidebarMenuButtonVariants()],
    ["Sidebar sub-menu button", sidebarMenuSubButtonVariants()],
  ];

  it.each(rows)("%s rows are 44px tall on touch screens", (_name, cls) => {
    expect(classes(cls)).toContain("ui:pointer-coarse:min-h-11");
  });

  it("Inbox icon buttons sit close together, so they grow on touch screens instead", () => {
    expect(classes(inboxIconButtonVariants())).toContain("ui:pointer-coarse:size-9");
    expect(classes(inboxItemHoverActionVariants())).toContain("ui:pointer-coarse:size-9");
  });
});
