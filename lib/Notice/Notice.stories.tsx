import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info, TriangleAlert } from "lucide-react";
import { Button } from "../Button/Button";
import { Notice } from "./Notice";

/**
 * A status notice that is **not an error**: a setting that is missing, a module that is off. The
 * card keeps the suite's embossed edge; `pending` tints the whole card in the one yellow of the
 * suite, `info` stays neutral. Real errors keep using `Alert variant="destructive"`.
 *
 * ```tsx
 * <Notice
 *   tone="pending"
 *   icon={<TriangleAlert />}
 *   title="Falta el CUIT de la empresa"
 *   description="Sin el CUIT las facturas salen sin datos fiscales."
 *   action={<Button variant="outline" size="md">Completar</Button>}
 * />
 * ```
 */
const meta = {
  title: "Components/Notice",
  component: Notice,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { title: "Falta el CUIT de la empresa" },
  argTypes: {
    tone: { control: "inline-radio", options: ["pending", "info"] },
  },
} satisfies Meta<typeof Notice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Button, Notice } from "@obel-arg/malbec-ui";
import { TriangleAlert } from "lucide-react";

<Notice
  tone="pending"
  icon={<TriangleAlert />}
  title="Falta el CUIT de la empresa"
  description="Sin el CUIT las facturas salen sin datos fiscales."
  action={
    <Button variant="outline" size="md">
      <Button.Text>Completar</Button.Text>
    </Button>
  }
/>`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[560px]">
      <Notice
        tone="pending"
        icon={<TriangleAlert />}
        title="Falta el CUIT de la empresa"
        description="Sin el CUIT las facturas salen sin datos fiscales."
        action={
          <Button variant="outline" size="md">
            <Button.Text>Completar</Button.Text>
          </Button>
        }
      />
    </div>
  ),
};

export const InfoTone: Story = {
  name: "Info",
  parameters: {
    docs: {
      source: {
        code: `import { Notice } from "@obel-arg/malbec-ui";
import { Info } from "lucide-react";

<Notice
  tone="info"
  icon={<Info />}
  title="El módulo de ticketing está apagado"
  description="Lo prende un administrador desde Configuración."
/>`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[560px]">
      <Notice
        tone="info"
        icon={<Info />}
        title="El módulo de ticketing está apagado"
        description="Lo prende un administrador desde Configuración."
      />
    </div>
  ),
};
