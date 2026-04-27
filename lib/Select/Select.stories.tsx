import type { Meta, StoryObj } from "@storybook/react-vite";
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
