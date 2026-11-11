import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileText, Plus } from "lucide-react";
import { Button } from "../Button/Button";
import { EmptyState } from "./EmptyState";

/**
 * The empty state of a section: icon in a 44px tile, one line of text and **the action that gets
 * out of the empty state, right there**. If the action lives here, the toolbar button shows up
 * once there is at least one item.
 *
 * ```tsx
 * <EmptyState
 *   icon={<FileText />}
 *   title="Todavía no hay contratos"
 *   description="Subí el primero para empezar a liquidar."
 *   action={<Button size="md">…</Button>}
 * />
 * ```
 */
const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { title: "Todavía no hay contratos" },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button, EmptyState } from "@obel-arg/malbec-ui";
import { FileText, Plus } from "lucide-react";

<EmptyState
  icon={<FileText />}
  title="Todavía no hay contratos"
  description="Subí el primero para empezar a liquidar."
  action={
    <Button size="md">
      <Button.Icon><Plus /></Button.Icon>
      <Button.Text>Subir contrato</Button.Text>
    </Button>
  }
/>`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[560px]">
      <EmptyState
        icon={<FileText />}
        title="Todavía no hay contratos"
        description="Subí el primero para empezar a liquidar."
        action={
          <Button size="md">
            <Button.Icon>
              <Plus />
            </Button.Icon>
            <Button.Text>Subir contrato</Button.Text>
          </Button>
        }
      />
    </div>
  ),
};
