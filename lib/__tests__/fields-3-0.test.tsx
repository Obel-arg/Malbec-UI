import { describe, expect, it } from "vitest";
import { comboboxTriggerRowVariants } from "../Combobox/combobox-variants";
import { datePickerTriggerVariants } from "../DatePicker/date-picker-variants";
import { inputVariants } from "../Input/input-variants";
import { selectTriggerVariants } from "../Select/select-variants";
import { textareaVariants } from "../Textarea/textarea-variants";

// 3.0 workshop: fields are drawn by a background-300 border (no 2px halo) and are 32px tall.
const fields = {
  Input: inputVariants(),
  "Select.Trigger": selectTriggerVariants(),
  "Combobox row": comboboxTriggerRowVariants(),
  "DatePicker.Trigger": datePickerTriggerVariants(),
};

describe("field defaults (3.0)", () => {
  it.each(Object.entries(fields))("%s has the background-300 edge, no halo, 32px", (_name, classes) => {
    expect(classes).toContain("ui:border-background-300");
    expect(classes).not.toContain("0_0_2px");
    expect(classes).toContain("ui:h-8");
    expect(classes).not.toContain("ui:h-9");
  });

  it("Textarea shares the edge and drops the halo", () => {
    expect(textareaVariants()).toContain("ui:border-background-300");
    expect(textareaVariants()).not.toContain("0_0_2px");
  });
});
