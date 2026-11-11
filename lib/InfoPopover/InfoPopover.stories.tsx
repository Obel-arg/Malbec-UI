import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfoPopover } from "./InfoPopover";

/**
 * The "i" with the explanation of a value or a section. Opens on click, tap or keyboard (a hover
 * tooltip never opens on a tablet). `label` is the short name screen readers hear; the text goes
 * in `content`. `openOnHover` also opens it on mouse hover for long explanations.
 *
 * ```tsx
 * <InfoPopover label="Cómo se calcula" content="Ingresos menos costos del show, en USD." />
 * ```
 */
const meta = {
  title: "Components/InfoPopover",
  component: InfoPopover,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "Cómo se calcula",
    content: "Ingresos menos costos del show, en USD al tipo de cambio del día.",
  },
} satisfies Meta<typeof InfoPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { InfoPopover } from "@obel-arg/malbec-ui";

<div className="flex items-center gap-1">
  <span className="text-sm font-medium">Neto del show</span>
  <InfoPopover
    label="Cómo se calcula"
    content="Ingresos menos costos del show, en USD al tipo de cambio del día."
  />
</div>`,
      },
    },
  },
  render: (args) => (
    <div className="ui:flex ui:items-center ui:gap-1">
      <span className="ui:text-sm ui:font-medium ui:text-text-default">Neto del show</span>
      <InfoPopover {...args} />
    </div>
  ),
};

export const OpenOnHover: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { InfoPopover } from "@obel-arg/malbec-ui";

<InfoPopover
  openOnHover
  label="Criterios"
  content={
    <ul>
      <li>Entra todo costo aprobado.</li>
      <li>Los pendientes no suman hasta aprobarse.</li>
    </ul>
  }
/>`,
      },
    },
  },
  render: () => (
    <InfoPopover
      openOnHover
      label="Criterios"
      content={
        <ul className="ui:m-0 ui:pl-4">
          <li>Entra todo costo aprobado.</li>
          <li>Los pendientes no suman hasta aprobarse.</li>
        </ul>
      }
    />
  ),
};
