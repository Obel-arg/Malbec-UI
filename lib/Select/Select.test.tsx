import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Select } from "./Select";

describe("Select.Value", () => {
  it("can shrink and truncate a long label inside the trigger", () => {
    const { container } = render(
      <Select defaultValue="a">
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="a">A very long option label that should not push the chevron out</Select.Item>
        </Select.Content>
      </Select>,
    );
    // Radix ignores className on Select.Value, so the trigger styles its value slot.
    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger?.querySelector(':scope > [data-slot="select-value"]')).not.toBeNull();
    expect(trigger?.className.split(" ")).toEqual(
      expect.arrayContaining([
        "ui:[&>[data-slot=select-value]]:flex",
        "ui:[&>[data-slot=select-value]]:min-w-0",
        "ui:[&>[data-slot=select-value]]:truncate",
      ]),
    );
  });
});
