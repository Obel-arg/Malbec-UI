import type { Meta, StoryObj } from "@storybook/react-vite";
import { Steps, type StepsProps } from "./Steps";

/**
 * Step indicator for wizards. Pass `total` and current `value` (1-based in stories).
 *
 * ```tsx
 * <div className="ui:w-[475px]">
 *   <Steps total={3} value={1} />
 * </div>
 * ```
 */
const meta = {
  title: "Components/Steps",
  component: Steps,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<StepsProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StepOne: Story = {
  args: { total: 3, value: 1 },
  render: (args) => (
    <div className="ui:w-[475px]">
      <Steps {...args} />
    </div>
  ),
};

export const StepTwo: Story = {
  args: { total: 3, value: 2 },
  render: (args) => (
    <div className="ui:w-[475px]">
      <Steps {...args} />
    </div>
  ),
};
