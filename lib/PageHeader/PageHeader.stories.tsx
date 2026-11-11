import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { Tabs } from "../Tabs/Tabs";
import { PageHeader } from "./PageHeader";

/**
 * Page header (version D of the header workshop): title with its status on one line, the main
 * action on the right, a one-sentence subtitle and the section tabs attached below.
 *
 * ```tsx
 * <Tabs variant="underline" defaultValue="resumen">
 *   <PageHeader
 *     title="Rosario · Metropolitano"
 *     titleAddon={<Badge variant="yellow">Faltan datos</Badge>}
 *     description="13/11/2026 · 4.200 entradas vendidas"
 *     actions={<Button>…</Button>}
 *     tabs={<Tabs.List>…</Tabs.List>}
 *   />
 *   <Tabs.Content value="resumen">…</Tabs.Content>
 * </Tabs>
 * ```
 */
const meta = {
  title: "Components/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  args: { title: "Proveedores" },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Detail: Story = {
  name: "Detail with tabs",
  parameters: {
    docs: {
      source: {
        code: `import { Badge, Button, PageHeader, Tabs } from "@obel-arg/malbec-ui";

<Tabs variant="underline" defaultValue="resumen">
  <PageHeader
    title="Rosario · Metropolitano"
    titleAddon={<Badge variant="yellow">Faltan datos</Badge>}
    description="13/11/2026 · 4.200 entradas vendidas"
    actions={
      <>
        <Button variant="outline"><Button.Text>Editar</Button.Text></Button>
        <Button><Button.Text>Generar liquidación</Button.Text></Button>
      </>
    }
    tabs={
      <Tabs.List>
        <Tabs.Trigger value="resumen">Resumen</Tabs.Trigger>
        <Tabs.Trigger value="costos">Costos</Tabs.Trigger>
        <Tabs.Trigger value="ticketing">Ticketing</Tabs.Trigger>
        <Tabs.Trigger value="documentos">Documentos</Tabs.Trigger>
      </Tabs.List>
    }
  />
  <Tabs.Content value="resumen">…</Tabs.Content>
</Tabs>`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[760px]">
      <Tabs variant="underline" defaultValue="resumen">
        <PageHeader
          title="Rosario · Metropolitano"
          titleAddon={<Badge variant="yellow">Faltan datos</Badge>}
          description="13/11/2026 · 4.200 entradas vendidas"
          actions={
            <>
              <Button variant="outline">
                <Button.Text>Editar</Button.Text>
              </Button>
              <Button>
                <Button.Text>Generar liquidación</Button.Text>
              </Button>
            </>
          }
          tabs={
            <Tabs.List>
              <Tabs.Trigger value="resumen">Resumen</Tabs.Trigger>
              <Tabs.Trigger value="costos">Costos</Tabs.Trigger>
              <Tabs.Trigger value="ticketing">Ticketing</Tabs.Trigger>
              <Tabs.Trigger value="documentos">Documentos</Tabs.Trigger>
            </Tabs.List>
          }
        />
        <Tabs.Content value="resumen" className="ui:text-sm ui:text-text-default-muted">
          Contenido del resumen.
        </Tabs.Content>
      </Tabs>
    </div>
  ),
};

export const List: Story = {
  name: "List (no tabs)",
  parameters: {
    docs: {
      source: {
        code: `import { Badge, Button, PageHeader } from "@obel-arg/malbec-ui";

<PageHeader
  title="Proveedores"
  titleAddon={<Badge>12 proveedores</Badge>}
  description="Los proveedores de tus shows, con su saldo pendiente."
  actions={<Button><Button.Text>+ Agregar proveedor</Button.Text></Button>}
/>`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[760px]">
      <PageHeader
        title="Proveedores"
        titleAddon={<Badge>12 proveedores</Badge>}
        description="Los proveedores de tus shows, con su saldo pendiente."
        actions={
          <Button>
            <Button.Text>+ Agregar proveedor</Button.Text>
          </Button>
        }
      />
    </div>
  ),
};
