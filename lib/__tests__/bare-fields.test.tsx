import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DatePicker } from "../DatePicker/DatePicker";
import { Select } from "../Select/Select";
import { Textarea } from "../Textarea/Textarea";

// With the 2.1 border, `shadow-none` no longer drops a field's box. `variant="bare"` is the
// declared way to render Select, Textarea and DatePicker inline, like Input already does.
type Variant = "default" | "bare";

const fields: Record<string, (variant: Variant) => Element | null> = {
  "Select.Trigger": (variant) =>
    render(
      <Select>
        <Select.Trigger variant={variant}>
          <Select.Value placeholder="ARS" />
        </Select.Trigger>
      </Select>,
    ).container.querySelector('[data-slot="select-trigger"]'),
  Textarea: (variant) =>
    render(<Textarea variant={variant} />).container.querySelector('[data-slot="textarea"]'),
  "DatePicker.Trigger": (variant) =>
    render(
      <DatePicker>
        <DatePicker.Trigger variant={variant} />
      </DatePicker>,
    ).container.querySelector('[data-slot="date-picker-trigger"]'),
};

const classesOf = (el: Element | null) => el?.className.split(" ") ?? [];

describe('variant="bare"', () => {
  it.each(Object.entries(fields))("%s drops the box: no border, background or padding", (_name, renderField) => {
    const el = renderField("bare");
    const classes = classesOf(el);
    expect(el?.getAttribute("data-variant")).toBe("bare");
    expect(classes).toEqual(expect.arrayContaining(["ui:border-0", "ui:bg-transparent", "ui:p-0", "ui:rounded-none"]));
    expect(classes).not.toContain("ui:border");
    expect(classes).not.toContain("ui:bg-background-100");
    expect(classes).not.toContain("ui:px-3");
  });

  it.each(Object.entries(fields))("%s keeps the box by default", (_name, renderField) => {
    expect(classesOf(renderField("default"))).toEqual(
      expect.arrayContaining(["ui:border", "ui:border-malbec-field-border", "ui:bg-background-100"]),
    );
  });
});
