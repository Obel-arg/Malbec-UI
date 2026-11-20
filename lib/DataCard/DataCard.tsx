import * as React from "react";
import { cn } from "../utils/cn";

export interface DataCardProps extends Omit<React.ComponentProps<"div">, "title"> {
  /** The figure ("US$ 8.802", "3"). */
  value: React.ReactNode;
  /** What the figure is ("Gasto total"). Goes on the frame, under the block. */
  label: React.ReactNode;
  /** One short line under the figure ("6 costos"). Not shown in `count`. */
  sub?: React.ReactNode;
  /** Icon of the label (lucide). In `count` it moves into the block, next to the figure. */
  icon?: React.ReactNode;
  /**
   * - `amount` (default): long figures (amounts). Figure 17px at the top left, icon in the title.
   * - `count`: short counts (1–2 digits), which would leave the block empty across. Icon 28px and
   *   figure 28px side by side, block and label centred.
   */
  variant?: "amount" | "count";
  /**
   * Goes at the end of the title row. For a variation ("-85 %") use `<Badge variant="neutral">`:
   * a variation is data, not a verdict, so it carries no green or red (chosen with Isa, 2.1).
   */
  titleAside?: React.ReactNode;
}

/** Frame: background-200 with the embossed edge (1px white light + a 1.5px warm ring outside). */
const frameClass =
  "malbec-font-sans ui:flex ui:flex-col ui:rounded-[14px] ui:border ui:border-white ui:bg-background-200 ui:p-1 ui:shadow-[0_0_0_1.5px_var(--color-background-200)]";
/** Block: background-100 with a bevel (white light on top, warm edge below). Stretches so a strip lines up. */
const blockClass =
  "ui:flex ui:flex-1 ui:flex-col ui:rounded-[10px] ui:bg-background-100 ui:px-4 ui:py-3 ui:shadow-[inset_0_1.5px_0_white,inset_0_-1px_0_var(--color-embossed-edge)]";
const titleClass =
  "ui:flex ui:min-w-0 ui:items-center ui:gap-1.5 ui:px-4 ui:pt-2 ui:pb-1 ui:text-[12px] ui:font-medium ui:text-text-default-muted";
const figureClass =
  "ui:block ui:whitespace-nowrap ui:font-semibold ui:tabular-nums ui:text-malbec-ink";

export type DataCardFrameProps = React.ComponentProps<"div">;
export type DataCardBlockProps = React.ComponentProps<"div">;
export interface DataCardTitleProps extends React.ComponentProps<"div"> {
  /** Goes at the end of the row and never truncates, e.g. a variation chip. */
  aside?: React.ReactNode;
}

/**
 * The outer frame of the data card, for panels with the same anatomy but free content (a list,
 * three figures, a small chart). Put a `DataCard.Title` and a `DataCard.Block` inside, in the
 * order the panel needs.
 */
const DataCardFrame = React.forwardRef<HTMLDivElement, DataCardFrameProps>(function DataCardFrame(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} data-slot="data-card-frame" className={cn(frameClass, className)} {...rest} />;
});
DataCardFrame.displayName = "DataCard.Frame";

/** The bevelled inner block of the data card. */
const DataCardBlock = React.forwardRef<HTMLDivElement, DataCardBlockProps>(function DataCardBlock(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} data-slot="data-card-block" className={cn(blockClass, className)} {...rest} />;
});
DataCardBlock.displayName = "DataCard.Block";

/** The title row on the frame, outside the block: 12px muted, with an optional `aside` at the end. */
const DataCardTitle = React.forwardRef<HTMLDivElement, DataCardTitleProps>(function DataCardTitle(
  { aside, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} data-slot="data-card-title" className={cn(titleClass, className)} {...rest}>
      {children}
      {aside ? (
        <span data-slot="data-card-title-aside" className="ui:ml-auto ui:flex ui:shrink-0 ui:items-center">
          {aside}
        </span>
      ) : null}
    </div>
  );
});
DataCardTitle.displayName = "DataCard.Title";

/**
 * The data card of the suite (malbec-ux-ui `data-card.md`): an embossed frame, a bevelled block
 * with the figure, and the label on the frame below. Concentric radii (14 outside, 10 inside).
 * No brand colour: the figure is the point. Put several in a grid with `items-stretch`; one card
 * per figure, never N figures in one card.
 */
const DataCardRoot = React.forwardRef<HTMLDivElement, DataCardProps>(function DataCard(
  { value, label, sub, icon, variant = "amount", titleAside, className, ...rest },
  ref,
) {
  const count = variant === "count";
  return (
    <DataCardFrame ref={ref} data-slot="data-card" data-variant={variant} className={className} {...rest}>
      <DataCardBlock className={cn(count && "ui:flex-row ui:items-center ui:justify-center ui:gap-3.5")}>
        {count && icon ? (
          <span aria-hidden className="ui:flex ui:text-malbec-icon/75 ui:[&_svg]:size-7 ui:[&_svg]:shrink-0">
            {icon}
          </span>
        ) : null}
        <span
          className={cn(
            figureClass,
            count ? "ui:text-[28px] ui:tracking-[-0.9px]" : "ui:text-[17px] ui:tracking-[-0.5px]",
          )}
        >
          {value}
        </span>
        {!count && sub ? (
          <span className="ui:block ui:truncate ui:text-[12px] ui:text-text-default-muted">{sub}</span>
        ) : null}
      </DataCardBlock>
      <DataCardTitle aside={titleAside} className={cn(count && "ui:justify-center")}>
        {!count && icon ? (
          <span aria-hidden className="ui:flex ui:text-malbec-icon ui:[&_svg]:size-3.5 ui:[&_svg]:shrink-0">
            {icon}
          </span>
        ) : null}
        <span className="ui:truncate">{label}</span>
      </DataCardTitle>
    </DataCardFrame>
  );
});
DataCardRoot.displayName = "DataCard";

type DataCardComponent = typeof DataCardRoot & {
  Frame: typeof DataCardFrame;
  Block: typeof DataCardBlock;
  Title: typeof DataCardTitle;
};

export const DataCard = DataCardRoot as DataCardComponent;
DataCard.Frame = DataCardFrame;
DataCard.Block = DataCardBlock;
DataCard.Title = DataCardTitle;
