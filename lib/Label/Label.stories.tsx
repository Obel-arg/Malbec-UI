import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label, type LabelProps } from "./Label";

/**
 * Wrap fields with a parent that has the `group` class so the label can reflect
 * a disabled control via `group-has-[:disabled]`.
 *
 * See [shadcn/ui Label](https://ui.shadcn.com/docs/components/label) for
 * pairing with form controls and accessibility.
 *
 * ```tsx
 * <Label htmlFor="email" weight="regular">Email</Label>
 * <Input id="email" type="email" />
 * ```
 */
const meta = {
  title: "Components/Label",
  component: Label,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    weight: {
      control: "select",
      options: ["regular", "semibold"] as const,
    },
  },
} satisfies Meta<LabelProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "Label",
    weight: "regular",
  },
  render: (args) => <Label {...args} />,
};

export const Regular: Story = {
  name: "Weight · regular",
  args: { weight: "regular", children: "Label" },
  render: (args) => <Label {...args} />,
};

export const Semibold: Story = {
  name: "Weight · semibold",
  args: { weight: "semibold", children: "Label" },
  render: (args) => <Label {...args} />,
};

const inputClass =
  "ui:w-full ui:rounded-md ui:border ui:border-background-300 ui:bg-white ui:px-3 ui:py-2 ui:text-sm";

export const WithInput: Story = {
  name: "With control",
  render: () => (
    <div className="malbec-font-sans ui:group ui:flex ui:w-[280px] ui:flex-col ui:gap-1.5">
      <Label htmlFor="label-story-email">Email</Label>
      <input
        id="label-story-email"
        type="email"
        placeholder="name@example.com"
        className={inputClass}
      />
    </div>
  ),
};
