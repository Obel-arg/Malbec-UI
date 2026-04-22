import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

/**
 * Use the **Theme** and **Scheme** toolbars (top bar) to preview all product palettes and light/dark without separate stories.
 */
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const LongLabel: Story = {
  args: {
    children: "Continue with selected option",
  },
};
