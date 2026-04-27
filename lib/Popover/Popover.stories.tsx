import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Popover } from "./Popover";

/**
 * ```tsx
 * <Popover>
 *   <Popover.Trigger asChild>
 *     <Button variant="outline">…</Button>
 *   </Popover.Trigger>
 *   <Popover.Content>…</Popover.Content>
 * </Popover>
 * ```
 */
const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger asChild>
        <Button variant="outline" size="md">
          <Button.Text>Open</Button.Text>
        </Button>
      </Popover.Trigger>
      <Popover.Content align="start">
        <p className="ui:text-sm ui:text-text-default">
          Popover panel content. Font and chrome match design tokens.
        </p>
      </Popover.Content>
    </Popover>
  ),
};
