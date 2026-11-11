import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

/**
 * Heading of a numbered section in a flat form (no cards). The embossed line goes on top: it
 * divides sections, it doesn't underline the title. Pass `toggle` to make the row fold the section.
 *
 * ```tsx
 * <SectionHeading number="01" title="Identidad" />
 * ```
 */
const meta = {
  title: "Components/SectionHeading",
  component: SectionHeading,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: { number: "01", title: "Identidad" },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { SectionHeading } from "@obel-arg/malbec-ui";

<SectionHeading number="01" title="Identidad" />
{/* fields */}
<SectionHeading number="02" title="Presupuesto" />`,
      },
    },
  },
  render: () => (
    <div className="ui:flex ui:w-[640px] ui:flex-col ui:gap-4">
      <SectionHeading number="01" title="Identidad" />
      <p className="ui:m-0 ui:text-sm ui:text-text-default-muted">Campos de la sección…</p>
      <SectionHeading number="02" title="Presupuesto" />
      <p className="ui:m-0 ui:text-sm ui:text-text-default-muted">Campos de la sección…</p>
    </div>
  ),
};

function CollapsibleExample() {
  const [open, setOpen] = useState(true);
  return (
    <div className="ui:flex ui:w-[640px] ui:flex-col ui:gap-4">
      <SectionHeading
        number="03"
        title="Distribución entre shows"
        trailing={
          <ChevronDown
            aria-hidden
            className={`ui:ml-auto ui:size-4 ui:text-malbec-icon ui:transition-transform ${open ? "ui:rotate-180" : ""}`}
          />
        }
        toggle={{ open, controls: "allocation", onToggle: () => setOpen((v) => !v) }}
      />
      {open ? (
        <p id="allocation" className="ui:m-0 ui:text-sm ui:text-text-default-muted">
          Campos de la sección…
        </p>
      ) : null}
    </div>
  );
}

export const Collapsible: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { SectionHeading } from "@obel-arg/malbec-ui";
import { ChevronDown } from "lucide-react";

const [open, setOpen] = useState(true);

<SectionHeading
  number="03"
  title="Distribución entre shows"
  trailing={<ChevronDown aria-hidden className="ml-auto size-4" />}
  toggle={{ open, controls: "allocation", onToggle: () => setOpen((v) => !v) }}
/>
{open ? <div id="allocation">{/* fields */}</div> : null}`,
      },
    },
  },
  render: () => <CollapsibleExample />,
};
