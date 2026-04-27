import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Tooltip } from "./Tooltip";

/**
 * Wrap the tree in `Tooltip.Provider` when you use more than one tooltip. Use `Tooltip.Trigger` + `Tooltip.Content`.
 *
 * ```tsx
 * <Tooltip.Provider>
 *   <Tooltip>
 *     <Tooltip.Trigger asChild>
 *       <Button variant="outline">…</Button>
 *     </Tooltip.Trigger>
 *     <Tooltip.Content>Add to library</Tooltip.Content>
 *   </Tooltip>
 * </Tooltip.Provider>
 * ```
 */
const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip defaultOpen>
        <Tooltip.Trigger asChild>
          <Button variant="outline" size="md">
            <Button.Text>Hover</Button.Text>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Add to library</Tooltip.Content>
      </Tooltip>
    </Tooltip.Provider>
  ),
};
