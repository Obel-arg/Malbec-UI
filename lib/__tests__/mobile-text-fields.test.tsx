import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Calendar } from "../Calendar/Calendar";
import { comboboxFilterInputVariants } from "../Combobox/combobox-variants";
import { dialogInlineInputVariants } from "../Dialog/dialog-variants";
import { Input } from "../Input/Input";
import { inputVariants } from "../Input/input-variants";
import { sheetInlineInputVariants } from "../Sheet/sheet-variants";
import { textareaVariants } from "../Textarea/textarea-variants";

const classes = (s: string) => s.split(/\s+/);

/**
 * iOS Safari zooms the page when a field with text under 16px gets focus. On a phone the
 * fields render at 16px; from `sm` (640px) up they keep their 14px.
 */
describe("text fields don't trigger the iOS focus zoom", () => {
  const fields: Array<[string, string]> = [
    ["Input", inputVariants()],
    ["Textarea", textareaVariants()],
    ["Combobox input", comboboxFilterInputVariants()],
    ["Dialog.InlineInput", dialogInlineInputVariants()],
    ["Sheet.InlineInput", sheetInlineInputVariants()],
  ];

  it.each(fields)("%s is 16px on a phone and 14px from sm", (_name, cls) => {
    const c = classes(cls);
    expect(c).toContain("ui:text-[16px]");
    expect(c).toContain("ui:sm:text-[14px]");
  });

  it("the inner <input> of an Input with an icon is 16px on a phone too", () => {
    const { container } = render(
      <Input aria-label="Search">
        <Input.Icon side="start">
          <svg />
        </Input.Icon>
      </Input>,
    );
    const input = container.querySelector("input")!;
    expect(classes(input.className)).toContain("ui:text-[16px]");
    expect(classes(input.className)).toContain("ui:sm:text-[14px]");
  });

  it("the Calendar month/year <select> is 16px (it is invisible, so nothing changes on screen)", () => {
    const { container } = render(<Calendar mode="single" defaultMonth={new Date(2026, 10, 1)} />);
    const selects = container.querySelectorAll("select");
    expect(selects.length).toBeGreaterThan(0);
    for (const s of selects) expect(classes(s.className)).toContain("ui:text-[16px]");
  });
});
