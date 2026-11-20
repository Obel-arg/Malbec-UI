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
  parameters: {
    docs: {
      source: {
        code: `import { Popover, Button } from "@obel-arg/malbec-ui";

<Popover>
  <Popover.Trigger asChild>
    <Button variant="outline" size="md">
      <Button.Text>Open</Button.Text>
    </Button>
  </Popover.Trigger>
  <Popover.Content align="start">
    <p className="text-sm text-text-default">
      Popover panel content. Font and chrome match design tokens.
    </p>
  </Popover.Content>
</Popover>`,
      },
    },
  },
};

export const PlainSurface: Story = {
  name: "Plain surface (own chrome)",
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="outline" size="md">
          <Button.Text>Notificaciones</Button.Text>
        </Button>
      </Popover.Trigger>
      <Popover.Content
        align="start"
        surface="plain"
        className="ui:w-72 ui:rounded-[10px] ui:border ui:border-background-300 ui:bg-background-100 ui:p-4"
      >
        <p className="ui:text-sm ui:text-text-default">
          The panel draws its own frame. It still opens and closes with the popover motion and
          sits on the floating layer.
        </p>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      source: {
        code: `// \`surface="plain"\` drops the popover frame (border, fill, padding) so the content draws
// its own. Motion and stacking stay.
<Popover>
  <Popover.Trigger asChild>
    <Button variant="outline" size="md">
      <Button.Text>Notificaciones</Button.Text>
    </Button>
  </Popover.Trigger>
  <Popover.Content align="start" surface="plain" className="ui:w-72 ui:rounded-[10px] ui:border …">
    …
  </Popover.Content>
</Popover>`,
      },
    },
  },
};
