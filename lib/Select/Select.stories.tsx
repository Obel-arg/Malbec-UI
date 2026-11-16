import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fragment } from "react";
import { Select, type SelectProps } from "./Select";

/**
 * [Radix Select](https://www.radix-ui.com/primitives/docs/components/select) with Malbec styling.
 *
 * ```tsx
 * <Select defaultValue="a">
 *   <Select.Trigger aria-label="Example">
 *     <Select.Value placeholder="Choose an option" />
 *   </Select.Trigger>
 *   <Select.Content>
 *     <Select.Item value="a">Option A</Select.Item>
 *   </Select.Content>
 * </Select>
 * ```
 */
const meta: Meta<SelectProps> = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Select } from "@obel-arg/malbec-ui";

<Select defaultValue="a">
  <Select.Trigger aria-label="Example select">
    <Select.Value placeholder="Choose an option" />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="a">Option A</Select.Item>
    <Select.Item value="b">Option B</Select.Item>
    <Select.Item value="c">Option C</Select.Item>
  </Select.Content>
</Select>`,
      },
    },
  },
  render: () => (
    <div className="ui:w-72">
      <Select defaultValue="a">
        <Select.Trigger aria-label="Example select">
          <Select.Value placeholder="Choose an option" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="a">Option A</Select.Item>
          <Select.Item value="b">Option B</Select.Item>
          <Select.Item value="c">Option C</Select.Item>
        </Select.Content>
      </Select>
    </div>
  ),
};

const statesGrid =
  "malbec-font-sans ui:grid ui:grid-cols-[auto_18rem] ui:items-center ui:gap-x-6 ui:gap-y-4";
const stateCaption = "ui:text-muted-medium ui:text-text-default-muted";

export const States: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Select } from "@obel-arg/malbec-ui";

<Select defaultValue="a">
  <Select.Trigger aria-label="Example select">
    <Select.Value placeholder="Choose an option" />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="a">Option A</Select.Item>
    <Select.Item value="b">Option B</Select.Item>
    <Select.Item value="c">Option C</Select.Item>
  </Select.Content>
</Select>

<Select>
  <Select.Trigger aria-label="Example select">
    <Select.Value placeholder="Choose an option" />
  </Select.Trigger>
  …
</Select>

<Select disabled>
  <Select.Trigger aria-label="Example select">
    <Select.Value placeholder="Choose an option" />
  </Select.Trigger>
  …
</Select>

<Select>
  <Select.Trigger aria-invalid aria-label="Example select">
    <Select.Value placeholder="Choose an option" />
  </Select.Trigger>
  …
</Select>`,
      },
    },
  },
  render: () => (
    <div className={statesGrid}>
      {(
        [
          ["Selected", { defaultValue: "a" }, false],
          ["Placeholder", {}, false],
          ["Disabled", { disabled: true }, false],
          ["Invalid", {}, true],
        ] as const
      ).map(([label, rootProps, invalid]) => (
        <Fragment key={label}>
          <span className={stateCaption}>{label}</span>
          <Select {...rootProps}>
            <Select.Trigger aria-invalid={invalid || undefined} aria-label={label}>
              <Select.Value placeholder="Choose an option" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="a">Option A</Select.Item>
              <Select.Item value="b">Option B</Select.Item>
              <Select.Item value="c">Option C</Select.Item>
            </Select.Content>
          </Select>
        </Fragment>
      ))}
    </div>
  ),
};

export const LongLabel: Story = {
  name: "Long label · truncates with an ellipsis",
  parameters: {
    docs: {
      description: {
        story:
          "A text value longer than the trigger ends in “…” instead of pushing the chevron out. A value with element children (icon + text) keeps its flex row instead.",
      },
      source: {
        code: `import { Select } from "@obel-arg/malbec-ui";

<Select defaultValue="movistar">
  <Select.Trigger className="w-48" aria-label="Show">
    <Select.Value placeholder="Choose a show" />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="movistar">13/11/2026 · Movistar Arena · Buenos Aires</Select.Item>
    <Select.Item value="luna">15/11/2026 · Luna Park</Select.Item>
  </Select.Content>
</Select>`,
      },
    },
  },
  render: () => (
    <Select defaultValue="movistar">
      <Select.Trigger className="ui:w-48" aria-label="Show">
        <Select.Value placeholder="Choose a show" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="movistar">13/11/2026 · Movistar Arena · Buenos Aires</Select.Item>
        <Select.Item value="luna">15/11/2026 · Luna Park</Select.Item>
      </Select.Content>
    </Select>
  ),
};
