import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  CHART_TICK,
  ChartCard,
  ChartMarkDefs,
  CrosshairCursor,
  DottedGridLine,
  TOOLTIP_CARD_CLASS,
  legendSwatchStyle,
  makeDottedAxisTick,
  makeStackedBarShape,
  seriesPaint,
} from "./chart-style";
import { Donut } from "./Donut";
import { PctBlocks } from "./PctBlocks";

/**
 * Chart primitives of malbec-ux-ui (`references/charts.md`): two greys (warm for data, cold for
 * chrome), the dot-field card with an embossed edge, the sheen on every mark, the dotted grid and
 * the dotted crosshair. Brand colour is never data.
 *
 * ```tsx
 * <ChartMarkDefs /> // once per screen
 * <ChartCard>
 *   <ResponsiveContainer width="100%" height={240}>
 *     <BarChart data={data}>
 *       <CartesianGrid vertical={false} horizontal={DottedGridLine} />
 *       <Bar dataKey="tickets" fill={seriesPaint(0)} />
 *     </BarChart>
 *   </ResponsiveContainer>
 * </ChartCard>
 * ```
 */
const meta = {
  title: "Components/Charts",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SERIES = ["Venta general", "Preventa", "Invitaciones"] as const;
const data = [
  { mes: "Jul", "Venta general": 4200, Preventa: 1800, Invitaciones: 300 },
  { mes: "Ago", "Venta general": 5100, Preventa: 2100, Invitaciones: 0 },
  { mes: "Sep", "Venta general": 3900, Preventa: 2600, Invitaciones: 450 },
  { mes: "Oct", "Venta general": 6100, Preventa: 1200, Invitaciones: 380 },
];
const formatK = (value: number) => (value >= 1000 ? `${value / 1000}k` : String(value));

export const StackedBars: Story = {
  name: "Stacked bars",
  parameters: {
    docs: {
      source: {
        code: `import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  CHART_TICK, ChartCard, ChartMarkDefs, CrosshairCursor, DottedGridLine, TOOLTIP_CARD_CLASS,
  legendSwatchStyle, makeDottedAxisTick, makeStackedBarShape, seriesPaint,
} from "@obel-arg/malbec-ui";

const SERIES = ["Venta general", "Preventa", "Invitaciones"];

<>
  <ChartMarkDefs />
  <ChartCard className="w-[640px]">
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} horizontal={DottedGridLine} />
        <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={CHART_TICK} />
        <YAxis axisLine={false} tickLine={false} tick={makeDottedAxisTick(formatK)} />
        <Tooltip cursor={<CrosshairCursor />} content={<TooltipCard />} />
        {SERIES.map((key, i) => (
          <Bar key={key} dataKey={key} stackId="a" barSize={48} fill={seriesPaint(i)}
            shape={makeStackedBarShape(SERIES, key)} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </ChartCard>
</>`,
      },
    },
  },
  render: () => (
    <>
      <ChartMarkDefs />
      <ChartCard className="ui:w-[640px]">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} horizontal={DottedGridLine} />
            <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={CHART_TICK} />
            <YAxis axisLine={false} tickLine={false} tick={makeDottedAxisTick(formatK)} />
            <Tooltip
              cursor={<CrosshairCursor />}
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className={TOOLTIP_CARD_CLASS}>
                    <p className="ui:mb-1.5 ui:text-[12px] ui:font-semibold ui:text-malbec-ink">{label}</p>
                    {payload.map((entry) => (
                      <p key={String(entry.dataKey)} className="ui:flex ui:items-center ui:gap-2 ui:text-[12px] ui:text-malbec-icon">
                        <span
                          className="ui:size-2 ui:rounded-[2px]"
                          style={legendSwatchStyle(SERIES.indexOf(entry.dataKey as (typeof SERIES)[number]))}
                        />
                        {String(entry.dataKey)}: {entry.value}
                      </p>
                    ))}
                  </div>
                ) : null
              }
            />
            {SERIES.map((key, i) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                barSize={48}
                fill={seriesPaint(i)}
                shape={makeStackedBarShape(SERIES, key)}
                isAnimationActive={false}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div className="ui:mt-4 ui:flex ui:gap-4">
          {SERIES.map((key, i) => (
            <span key={key} className="ui:flex ui:items-center ui:gap-2 ui:text-[12px] ui:text-malbec-icon">
              <span className="ui:size-2.5 ui:rounded-[2px]" style={legendSwatchStyle(i)} />
              {key}
            </span>
          ))}
        </div>
      </ChartCard>
    </>
  ),
};

const vendors = [
  { label: "Producción", value: 4200 },
  { label: "Sonido", value: 2100 },
  { label: "Seguridad", value: 1300 },
  { label: "Catering", value: 700 },
  { label: "Transporte", value: 500 },
];

export const DonutChart: Story = {
  name: "Donut",
  parameters: {
    docs: {
      source: {
        code: `import { ChartCard, ChartMarkDefs, Donut, legendSwatchStyle } from "@obel-arg/malbec-ui";

<>
  <ChartMarkDefs />
  <ChartCard className="flex items-center gap-6">
    <Donut data={vendors} total="US$ 8.800" caption="Gastos" />
    <ul>
      {vendors.map((v, i) => (
        <li key={v.label}>
          <span style={legendSwatchStyle(i)} /> {v.label}
        </li>
      ))}
    </ul>
  </ChartCard>
</>`,
      },
    },
  },
  render: () => (
    <>
      <ChartMarkDefs />
      <ChartCard className="ui:flex ui:items-center ui:gap-6">
        <Donut data={vendors} total="US$ 8.800" caption="Gastos" />
        <ul className="ui:space-y-2">
          {vendors.map((vendor, i) => (
            <li key={vendor.label} className="ui:flex ui:items-center ui:gap-2 ui:text-[12px] ui:text-malbec-icon">
              <span className="ui:size-2.5 ui:rounded-[3px]" style={legendSwatchStyle(i)} />
              {vendor.label}
            </li>
          ))}
        </ul>
      </ChartCard>
    </>
  ),
};

export const PercentBlocks: Story = {
  name: "PctBlocks",
  parameters: {
    docs: {
      source: {
        code: `import { PctBlocks } from "@obel-arg/malbec-ui";

<PctBlocks value={44} />
<PctBlocks value={100} />
<PctBlocks value={130} /> // over budget: all 10 blocks in red (state)`,
      },
    },
  },
  render: () => (
    <div className="ui:flex ui:flex-col ui:gap-3 ui:text-[12px] ui:text-malbec-icon">
      {[0, 44, 100, 130].map((value) => (
        <div key={value} className="ui:flex ui:items-center ui:gap-3">
          <PctBlocks value={value} />
          <span className="ui:tabular-nums">{value}%</span>
        </div>
      ))}
    </div>
  ),
};
