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
  parameters: {
    docs: {
      source: {
        code: `import { Button, Tooltip } from "@obel-arg/malbec-ui";

<Tooltip.Provider>
  <Tooltip>
    <Tooltip.Trigger asChild>
      <Button variant="outline" size="md">
        <Button.Text>Hover</Button.Text>
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>Add to library</Tooltip.Content>
  </Tooltip>
</Tooltip.Provider>`,
      },
    },
  },
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

export const Dark: Story = {
  name: "Dark (icon actions)",
  parameters: {
    docs: {
      source: {
        code: `import { Button, Tooltip } from "@obel-arg/malbec-ui";

<Tooltip.Provider>
  <Tooltip>
    <Tooltip.Trigger asChild>
      <Button variant="ghost" tone="neutral" size="icon" aria-label="Descargar PDF">
        <Button.Icon><DownloadIcon /></Button.Icon>
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content variant="dark">Descargar PDF</Tooltip.Content>
  </Tooltip>
</Tooltip.Provider>`,
      },
    },
  },
  render: () => (
    <Tooltip.Provider>
      <Tooltip defaultOpen>
        <Tooltip.Trigger asChild>
          <Button variant="ghost" tone="neutral" size="icon" aria-label="Descargar PDF">
            <Button.Text>↓</Button.Text>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content variant="dark">Descargar PDF</Tooltip.Content>
      </Tooltip>
    </Tooltip.Provider>
  ),
};
