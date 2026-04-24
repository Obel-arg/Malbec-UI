import * as React from "react";
import * as RechartsPrimitive from "recharts";
import type {
  DefaultLegendContentProps,
  LegendPayload,
  TooltipContentProps,
  TooltipPayload,
  TooltipProps,
} from "recharts";

import { cn } from "../utils/cn";
import { chartContainerVariants } from "./chart-variants";

/** Maps theme name → CSS selector prefix for scoped chart color variables. */
const THEMES = { light: "", dark: ".dark " } as const;

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextValue = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChart(component: string): ChartContextValue {
  const ctx = React.useContext(ChartContext);
  if (!ctx) {
    throw new Error(
      `<${component}> must be used within <Chart> (ChartContainer).`,
    );
  }
  return ctx;
}

export type ChartContainerProps = React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
};

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  function ChartContainer({ id, className, children, config, ...props }, ref) {
    const uniqueId = React.useId();
    const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          ref={ref}
          data-slot="chart"
          data-chart={chartId}
          className={cn(chartContainerVariants(), className)}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  },
);

ChartContainer.displayName = "Chart";

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(
    ([, item]) => item.theme ?? item.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  const css = (Object.entries(THEMES) as [keyof typeof THEMES, string][])
    .map(([theme, prefix]) => {
      const rules = colorConfig
        .map(([key, itemConfig]) => {
          const color = itemConfig.theme?.[theme] ?? itemConfig.color;
          return color ? `  --color-${key}: ${color};` : null;
        })
        .filter(Boolean)
        .join("\n");
      if (!rules) return "";
      return `${prefix}[data-chart=${id}] {\n${rules}\n}`;
    })
    .filter(Boolean)
    .join("\n");

  if (!css) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: css,
      }}
    />
  );
}

/** Recharts’ BarChart cursor injects `fill: #ccc` in JS; pair with `styles.css` `.recharts-tooltip-cursor` for real transparency. */
const defaultChartTooltipCursor = {
  fill: "var(--color-foreground)",
  fillOpacity: "var(--malbec-chart-tooltip-cursor-fill-opacity)",
  stroke: "none",
} as const satisfies React.SVGProps<SVGRectElement>;

function mergeTooltipCursor(
  cursor: TooltipProps["cursor"] | undefined,
): TooltipProps["cursor"] {
  if (cursor === false) {
    return false;
  }
  if (cursor === true || cursor === undefined) {
    return { ...defaultChartTooltipCursor };
  }
  if (React.isValidElement(cursor)) {
    return cursor;
  }
  if (typeof cursor === "object" && cursor !== null) {
    return { ...defaultChartTooltipCursor, ...cursor };
  }
  return cursor;
}

function ChartTooltip(props: TooltipProps) {
  const { cursor, ...rest } = props;
  return (
    <RechartsPrimitive.Tooltip
      cursor={mergeTooltipCursor(cursor)}
      {...rest}
    />
  );
}

ChartTooltip.displayName = "ChartTooltip";

export type ChartTooltipContentProps = React.ComponentProps<"div"> &
  Partial<
    Pick<
      TooltipContentProps,
      "active" | "payload" | "label" | "labelFormatter" | "formatter"
    >
  > & {
    labelClassName?: string;
    color?: string;
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  };

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(function ChartTooltipContent(
  {
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey,
    ...rest
  },
  ref,
) {
  const { config } = useChart("Chart.TooltipContent");

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload as TooltipPayload;
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? ((label in config ? config[label]?.label : undefined) ?? label)
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("ui:font-medium", labelClassName)}>
          {labelFormatter(label, payload)}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={cn("ui:font-medium", labelClassName)}>{value}</div>;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      ref={ref}
      className={cn(
        "ui:grid ui:min-w-32 ui:items-start ui:gap-1.5 ui:rounded-lg ui:border ui:border-background-300 ui:bg-background-100 ui:px-2.5 ui:py-1.5 ui:text-[12px] ui:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] ui:text-text-default",
        className,
      )}
      {...rest}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="ui:grid ui:gap-1.5">
        {(payload as TooltipPayload)
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color ?? item.payload?.fill ?? item.color;
            const rowKey =
              typeof item.dataKey === "string" ||
              typeof item.dataKey === "number"
                ? String(item.dataKey)
                : `item-${index}`;

            return (
              <div
                key={rowKey}
                className={cn(
                  "ui:flex ui:w-full ui:flex-wrap ui:items-stretch ui:gap-2 ui:[&>svg]:ui:h-2.5 ui:[&>svg]:ui:w-2.5 ui:[&>svg]:ui:text-text-default-muted",
                  indicator === "dot" && "ui:items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(
                    item.value,
                    item.name,
                    item,
                    index,
                    payload as TooltipPayload,
                  )
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "ui:shrink-0 ui:rounded-[2px] ui:border-(--color-border) ui:bg-(--color-bg)",
                            {
                              "ui:h-2.5 ui:w-2.5": indicator === "dot",
                              "ui:w-1": indicator === "line",
                              "ui:w-0 ui:border-[1.5px] ui:border-dashed ui:bg-transparent":
                                indicator === "dashed",
                              "ui:my-0.5": nestLabel && indicator === "dashed",
                            },
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "ui:flex ui:flex-1 ui:justify-between ui:leading-none",
                        nestLabel ? "ui:items-end" : "ui:items-center",
                      )}
                    >
                      <div className="ui:grid ui:gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="ui:text-text-default-muted">
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                      {item.value != null && (
                        <span className="ui:font-mono ui:font-medium ui:tabular-nums ui:text-text-default">
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : item.value}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
});

ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend = RechartsPrimitive.Legend;

export type ChartLegendContentProps = React.ComponentProps<"div"> &
  Pick<DefaultLegendContentProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
  };

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(function ChartLegendContent(
  { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
  ref,
) {
  const { config } = useChart("Chart.LegendContent");

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "ui:flex ui:items-center ui:justify-center ui:gap-4",
        verticalAlign === "top" ? "ui:pb-3" : "ui:pt-3",
        className,
      )}
    >
      {(payload as ReadonlyArray<LegendPayload>)
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={item.value}
              className={cn(
                "ui:flex ui:items-center ui:gap-1.5 ui:[&>svg]:ui:h-3 ui:[&>svg]:ui:w-3 ui:[&>svg]:ui:text-text-default-muted",
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="ui:h-2 ui:w-2 ui:shrink-0 ui:rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
});

ChartLegendContent.displayName = "ChartLegendContent";

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
): ChartConfig[keyof ChartConfig] | undefined {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadObj = payload as Record<string, unknown>;
  const payloadPayload =
    "payload" in payloadObj &&
    typeof payloadObj.payload === "object" &&
    payloadObj.payload !== null
      ? (payloadObj.payload as Record<string, unknown>)
      : undefined;

  let configLabelKey: string = key;

  if (key in payloadObj && typeof payloadObj[key] === "string") {
    configLabelKey = payloadObj[key] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key] === "string"
  ) {
    configLabelKey = payloadPayload[key] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

type ChartComponent = typeof ChartContainer & {
  Container: typeof ChartContainer;
  Style: typeof ChartStyle;
  Tooltip: typeof ChartTooltip;
  TooltipContent: typeof ChartTooltipContent;
  Legend: typeof ChartLegend;
  LegendContent: typeof ChartLegendContent;
};

export const Chart = ChartContainer as ChartComponent;
Chart.Container = ChartContainer;
Chart.Style = ChartStyle;
Chart.Tooltip = ChartTooltip;
Chart.TooltipContent = ChartTooltipContent;
Chart.Legend = ChartLegend;
Chart.LegendContent = ChartLegendContent;
