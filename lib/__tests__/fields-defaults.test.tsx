import { describe, expect, it } from "vitest";
import { comboboxTriggerRowVariants } from "../Combobox/combobox-variants";
import { datePickerTriggerVariants } from "../DatePicker/date-picker-variants";
import { inputVariants } from "../Input/input-variants";
import { selectTriggerVariants } from "../Select/select-variants";
import { textareaVariants } from "../Textarea/textarea-variants";

// 2.1 closing workshop: a malbec-field-border (#ebeae8) border instead of the halo, 40px tall,
// 12px side padding and the same -0.42px tracking in every field.
const fields = {
  Input: inputVariants(),
  "Select.Trigger": selectTriggerVariants(),
  "Combobox row": comboboxTriggerRowVariants(),
  "DatePicker.Trigger": datePickerTriggerVariants(),
};

describe("field defaults (2.1)", () => {
  it.each(Object.entries(fields))("%s: field-border edge, no halo, 40px, 12px sides", (_name, classes) => {
    expect(classes).toContain("ui:border-malbec-field-border");
    expect(classes).not.toContain("ui:border-background-300");
    expect(classes).not.toContain("0_0_2px");
    expect(classes).toContain("ui:h-10");
    expect(classes).not.toContain("ui:h-9");
    expect(classes).toContain("ui:px-3");
    expect(classes).not.toContain("ui:px-4");
  });

  it.each(Object.entries(fields))("%s: same tracking as the other fields", (_name, classes) => {
    expect(classes).toContain("ui:tracking-[-0.42px]");
  });

  it("Textarea shares the edge and the side padding", () => {
    expect(textareaVariants()).toContain("ui:border-malbec-field-border");
    expect(textareaVariants()).not.toContain("0_0_2px");
    expect(textareaVariants()).toContain("ui:px-3");
  });
});
