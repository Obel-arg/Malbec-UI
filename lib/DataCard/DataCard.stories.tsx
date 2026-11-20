import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarDays, Ticket, Wallet } from "lucide-react";
import { Badge } from "../Badge/Badge";
import { DataCard } from "./DataCard";

/**
 * The data card of the suite (malbec-ux-ui `data-card.md`): embossed frame, bevelled block with
 * the figure, label on the frame below. One card per figure; in a strip, a grid with
 * `items-stretch` keeps every block the same height even when one has no `sub`.
 *
 * ```tsx
 * <DataCard value="US$ 8.802" sub="6 costos" label="Gasto total" icon={<Wallet />} />
 * ```
 */
const meta = {
  title: "Components/DataCard",
  component: DataCard,
  tags: ["autodocs"],
  args: { value: "US$ 8.802", sub: "6 costos", label: "Gasto total" },
} satisfies Meta<typeof DataCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Amount: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Wallet } from "lucide-react";
import { DataCard } from "@obel-arg/malbec-ui";

<DataCard value="US$ 8.802" sub="6 costos" label="Gasto total" icon={<Wallet />} />`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[300px]">
      <DataCard value="US$ 8.802" sub="6 costos" label="Gasto total" icon={<Wallet />} />
    </div>
  ),
};

export const Strip: Story = {
  name: "Strip (one without sub)",
  parameters: {
    docs: {
      source: {
        code: `import { Ticket, Wallet } from "lucide-react";
import { DataCard } from "@obel-arg/malbec-ui";

<div className="grid grid-cols-3 items-stretch gap-3">
  <DataCard value="US$ 8.802" sub="6 costos" label="Gasto total" icon={<Wallet />} />
  <DataCard value="US$ 64.000" sub="4.200 entradas" label="Venta total" icon={<Ticket />} />
  <DataCard value="87%" label="Ocupación" icon={<Ticket />} />
</div>`,
      },
    },
  },
  render: () => (
    <div className="ui:grid ui:w-[760px] ui:grid-cols-3 ui:items-stretch ui:gap-3">
      <DataCard value="US$ 8.802" sub="6 costos" label="Gasto total" icon={<Wallet />} />
      <DataCard value="US$ 64.000" sub="4.200 entradas" label="Venta total" icon={<Ticket />} />
      <DataCard value="87%" label="Ocupación" icon={<Ticket />} />
    </div>
  ),
};

export const Count: Story = {
  name: "Count (short figure)",
  parameters: {
    docs: {
      source: {
        code: `import { CalendarDays } from "lucide-react";
import { DataCard } from "@obel-arg/malbec-ui";

<DataCard variant="count" value="3" label="Shows esta semana" icon={<CalendarDays />} />`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[240px]">
      <DataCard variant="count" value="3" label="Shows esta semana" icon={<CalendarDays />} />
    </div>
  ),
};

export const TitleAside: Story = {
  name: "Title aside (variation chip)",
  parameters: {
    docs: {
      source: {
        code: `import { Badge, DataCard } from "@obel-arg/malbec-ui";

<DataCard value="US$ 1,20" label="CPA" titleAside={<Badge variant="neutral">-85 %</Badge>} />`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[240px]">
      <DataCard value="US$ 1,20" label="CPA" titleAside={<Badge variant="neutral">-85 %</Badge>} />
    </div>
  ),
};

export const FreeContent: Story = {
  name: "Parts (free content)",
  parameters: {
    docs: {
      source: {
        code: `import { DataCard } from "@obel-arg/malbec-ui";

<DataCard.Frame>
  <DataCard.Title>Próximos shows</DataCard.Title>
  <DataCard.Block>
    <ul>
      <li>Selena Quintanilla · Movistar Arena · 13/11</li>
      <li>Edith Piaf · Teatro Colón · 06/11</li>
    </ul>
  </DataCard.Block>
</DataCard.Frame>`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[360px]">
      <DataCard.Frame>
        <DataCard.Title>Próximos shows</DataCard.Title>
        <DataCard.Block>
          <ul className="ui:m-0 ui:flex ui:list-none ui:flex-col ui:gap-1.5 ui:p-0 ui:text-sm ui:text-text-default">
            <li>Selena Quintanilla · Movistar Arena · 13/11</li>
            <li>Edith Piaf · Teatro Colón · 06/11</li>
          </ul>
        </DataCard.Block>
      </DataCard.Frame>
    </div>
  ),
};
