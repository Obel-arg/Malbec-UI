import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "../Card/Card";
import { Chart, type ChartContainerProps } from "./Chart";

const lineData = [
  { x: 0, series1: 52, series2: 48 },
  { x: 1, series1: 45, series2: 44 },
  { x: 2, series1: 72, series2: 38 },
  { x: 3, series1: 48, series2: 42 },
  { x: 4, series1: 55, series2: 50 },
  { x: 5, series1: 50, series2: 58 },
  { x: 6, series1: 54, series2: 62 },
];

const chartConfig = {
  series1: {
    label: "This week",
    color: "var(--chart-1)",
  },
  series2: {
    label: "Typical",
    color: "var(--chart-2)",
  },
} satisfies ChartContainerProps["config"];

const barMonthly = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const barChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartContainerProps["config"];

const areaMonthly = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const areaChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartContainerProps["config"];

const pieSegments = [
  { name: "chrome", value: 275, fill: "var(--color-chrome)" },
  { name: "safari", value: 200, fill: "var(--color-safari)" },
  { name: "firefox", value: 120, fill: "var(--color-firefox)" },
  { name: "edge", value: 88, fill: "var(--color-edge)" },
];

const pieChartConfig = {
  visitors: { label: "Visitors" },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
} satisfies ChartContainerProps["config"];

function lineDots(seriesVar: "--color-series1" | "--color-series2") {
  const v = `var(${seriesVar})`;
  return {
    r: 3,
    fill: v,
    stroke: "var(--color-background-100)",
    strokeWidth: 1,
  } as const;
}

function lineActiveDots(seriesVar: "--color-series1" | "--color-series2") {
  const v = `var(${seriesVar})`;
  return {
    r: 4,
    fill: "var(--color-background-100)",
    stroke: v,
    strokeWidth: 2,
  } as const;
}

/**
 * `Chart` is a `ChartContainer` wrapper: pass a `config` map and compose Recharts primitives (`LineChart`, `BarChart`, …) as children.
 *
 * ```tsx
 * <Chart config={chartConfig} className="ui:h-[200px] ui:w-full">
 *   <LineChart data={data}>…</LineChart>
 * </Chart>
 * ```
 */
const meta = {
  title: "Components/Chart",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TwoSeriesLines: Story = {
  name: "Line chart",
  render: () => (
    <Chart config={chartConfig} className="ui:h-[200px] ui:w-[669px] ui:max-w-full">
      <RechartsLineChart
        accessibilityLayer
        data={lineData}
        margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
      >
        <Line
          type="monotone"
          dataKey="series1"
          stroke="var(--color-series1)"
          strokeWidth={2}
          dot={lineDots("--color-series1")}
          activeDot={lineActiveDots("--color-series1")}
        />
        <Line
          type="monotone"
          dataKey="series2"
          stroke="var(--color-series2)"
          strokeWidth={2}
          dot={lineDots("--color-series2")}
          activeDot={lineActiveDots("--color-series2")}
        />
      </RechartsLineChart>
    </Chart>
  ),
};

export const WithTooltip: Story = {
  name: "Line chart with tooltip",
  render: () => (
    <Chart config={chartConfig} className="ui:h-[200px] ui:w-[669px] ui:max-w-full">
      <RechartsLineChart
        accessibilityLayer
        data={lineData}
        margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
      >
        <Chart.Tooltip
          content={<Chart.TooltipContent indicator="dot" hideLabel />}
        />
        <Line
          type="monotone"
          dataKey="series1"
          stroke="var(--color-series1)"
          strokeWidth={2}
          dot={lineDots("--color-series1")}
          activeDot={lineActiveDots("--color-series1")}
        />
        <Line
          type="monotone"
          dataKey="series2"
          stroke="var(--color-series2)"
          strokeWidth={2}
          dot={lineDots("--color-series2")}
          activeDot={lineActiveDots("--color-series2")}
        />
      </RechartsLineChart>
    </Chart>
  ),
};

export const InCard: Story = {
  name: "Line chart in card",
  render: () => (
    <Card className="ui:max-w-[717px] ui:gap-0 ui:rounded-xl ui:border-background-300 ui:p-0 ui:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]">
      <Card.Header className="ui:px-4 ui:pb-4 ui:pt-4">
        <Card.Title className="ui:text-sm ui:leading-5 ui:font-semibold ui:tracking-normal">
          Exercise minutes
        </Card.Title>
        <Card.Description className="ui:tracking-normal">
          Your exercise minutes are ahead of where you normally are.
        </Card.Description>
      </Card.Header>
      <Card.Content className="ui:px-6 ui:pb-2 ui:pt-0">
        <Chart config={chartConfig} className="ui:h-[200px] ui:w-full">
          <RechartsLineChart
            accessibilityLayer
            data={lineData}
            margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
          >
            <Line
              type="monotone"
              dataKey="series1"
              stroke="var(--color-series1)"
              strokeWidth={2}
              dot={lineDots("--color-series1")}
              activeDot={lineActiveDots("--color-series1")}
            />
            <Line
              type="monotone"
              dataKey="series2"
              stroke="var(--color-series2)"
              strokeWidth={2}
              dot={lineDots("--color-series2")}
              activeDot={lineActiveDots("--color-series2")}
            />
          </RechartsLineChart>
        </Chart>
      </Card.Content>
    </Card>
  ),
};

export const BarGrouped: Story = {
  name: "Bar chart (grouped)",
  render: () => (
    <Chart
      config={barChartConfig}
      className="ui:h-[280px] ui:w-full ui:min-w-[560px] ui:max-w-[720px]"
    >
      <BarChart accessibilityLayer data={barMonthly} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
        <Chart.Tooltip content={<Chart.TooltipContent />} />
        <Chart.Legend content={<Chart.LegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </Chart>
  ),
};

export const AreaStacked: Story = {
  name: "Area chart (stacked)",
  render: () => (
    <Chart
      config={areaChartConfig}
      className="ui:h-[280px] ui:w-full ui:min-w-[560px] ui:max-w-[720px]"
    >
      <AreaChart accessibilityLayer data={areaMonthly} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Chart.Tooltip content={<Chart.TooltipContent />} />
        <Chart.Legend content={<Chart.LegendContent />} />
        <Area
          type="monotone"
          dataKey="mobile"
          stackId="1"
          stroke="var(--color-mobile)"
          fill="var(--color-mobile)"
        />
        <Area
          type="monotone"
          dataKey="desktop"
          stackId="1"
          stroke="var(--color-desktop)"
          fill="var(--color-desktop)"
        />
      </AreaChart>
    </Chart>
  ),
};

export const PieDonut: Story = {
  name: "Pie chart (donut)",
  render: () => (
    <Chart
      config={pieChartConfig}
      className="ui:mx-auto ui:aspect-square ui:h-[280px] ui:max-w-[320px]"
    >
      <PieChart>
        <Chart.Tooltip
          content={<Chart.TooltipContent hideLabel nameKey="name" />}
        />
        <Pie
          data={pieSegments}
          dataKey="value"
          nameKey="name"
          innerRadius={56}
          strokeWidth={2}
          stroke="var(--color-background-100)"
        >
          {pieSegments.map((entry) => (
            <Cell key={entry.name} fill={entry.fill} />
          ))}
        </Pie>
        <Chart.Legend
          content={<Chart.LegendContent nameKey="name" />}
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </Chart>
  ),
};
