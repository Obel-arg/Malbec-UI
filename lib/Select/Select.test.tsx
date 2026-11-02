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
    const classes = trigger?.className.split(" ") ?? [];
    // Plain text: block + truncate, so the ellipsis renders (it can't on a flex
    // container's anonymous text item). Wrapped in :where() so apps override it plainly.
    expect(classes).toEqual(
      expect.arrayContaining([
        "ui:[&>:where([data-slot=select-value])]:block",
        "ui:[&>:where([data-slot=select-value])]:min-w-0",
        "ui:[&>:where([data-slot=select-value])]:truncate",
      ]),
    );
    // Icon + text keeps the flex row it had.
    expect(classes).toContain("ui:[&>[data-slot=select-value]:has(>*)]:flex");
    // …and only then: no unconditional flex on the slot (matched by suffix so Tailwind's
    // source scan doesn't emit that dead class from this test).
    expect(classes.filter((c) => c.endsWith("=select-value]]:flex"))).toEqual([]);
  });
});
