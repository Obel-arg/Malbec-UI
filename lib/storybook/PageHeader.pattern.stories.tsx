import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { Tabs } from "../Tabs/Tabs";

/**
 * A page header is not a component: it is a composition of primitives. This is the layout chosen
 * in the header workshop (version D): an 18px bold ink `h1` with its status chip on the same line,
 * the main action on the right, a one-sentence 13px subtitle, the section tabs attached below,
 * and 8px of air before the content.
 */
const meta = {
  title: "Patterns/Page header",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Detail: Story = {
  name: "Detail with tabs",
  parameters: {
    docs: {
      source: {
        code: `import { Badge, Button, Tabs } from "@obel-arg/malbec-ui";

<Tabs variant="underline" defaultValue="resumen">
  <header className="flex flex-col pb-2">
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
      <div className="flex min-w-0 flex-wrap items-center gap-2.5">
        <h1 className="m-0 text-[18px] leading-[1.15] font-bold tracking-[-0.02em] text-malbec-ink">
          Rosario · Metropolitano
        </h1>
        <Badge variant="yellow">Faltan datos</Badge>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button variant="outline"><Button.Text>Editar</Button.Text></Button>
        <Button><Button.Text>Generar liquidación</Button.Text></Button>
      </div>
    </div>
    <p className="m-0 mt-1 max-w-[640px] text-[13px] text-text-default-muted">
      13/11/2026 · 4.200 entradas vendidas
    </p>
    <Tabs.List className="mt-3.5">
      <Tabs.Trigger value="resumen">Resumen</Tabs.Trigger>
      <Tabs.Trigger value="costos">Costos</Tabs.Trigger>
      <Tabs.Trigger value="ticketing">Ticketing</Tabs.Trigger>
    </Tabs.List>
  </header>
  <Tabs.Content value="resumen">…</Tabs.Content>
</Tabs>`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[760px]">
      <Tabs variant="underline" defaultValue="resumen">
        <header className="malbec-font-sans ui:flex ui:flex-col ui:pb-2">
          <div className="ui:flex ui:flex-wrap ui:items-center ui:justify-between ui:gap-x-4 ui:gap-y-3">
            <div className="ui:flex ui:min-w-0 ui:flex-wrap ui:items-center ui:gap-2.5">
              <h1 className="ui:m-0 ui:text-[18px] ui:leading-[1.15] ui:font-bold ui:tracking-[-0.02em] ui:text-malbec-ink">
                Rosario · Metropolitano
              </h1>
              <Badge variant="yellow">Faltan datos</Badge>
            </div>
            <div className="ui:flex ui:shrink-0 ui:items-center ui:gap-2">
              <Button variant="outline">
                <Button.Text>Editar</Button.Text>
              </Button>
              <Button>
                <Button.Text>Generar liquidación</Button.Text>
              </Button>
            </div>
          </div>
          <p className="ui:m-0 ui:mt-1 ui:max-w-[640px] ui:text-[13px] ui:text-text-default-muted">
            13/11/2026 · 4.200 entradas vendidas
          </p>
          <Tabs.List className="ui:mt-3.5">
            <Tabs.Trigger value="resumen">Resumen</Tabs.Trigger>
            <Tabs.Trigger value="costos">Costos</Tabs.Trigger>
            <Tabs.Trigger value="ticketing">Ticketing</Tabs.Trigger>
          </Tabs.List>
        </header>
        <Tabs.Content value="resumen" className="ui:text-sm ui:text-text-default-muted">
          Contenido del resumen.
        </Tabs.Content>
      </Tabs>
    </div>
  ),
};
