import * as React from "react";
import { cn } from "../utils/cn";

export type EmptyStateVariant = "row" | "ghost" | "page";

export interface EmptyStateProps extends Omit<React.ComponentProps<"div">, "title"> {
  /**
   * - `row` (default): one quiet line inside a table or list, the action as a link. The table keeps
   *   its header, search and columns, so nothing jumps when the first item arrives.
   * - `ghost`: faded placeholder rows with the text and action on top; shows the shape of what will
   *   arrive without inventing data. Put it where the table body goes.
   * - `page`: a whole screen with nothing yet. Left-aligned under an embossed divider, actions on
   *   the right, where they will stay once there is data.
   */
  variant?: EmptyStateVariant;
  title: React.ReactNode;
  /** One line that says what goes here. Not shown in `row`. */
  description?: React.ReactNode;
  /**
   * The way out of the empty state, right here (a link in `row`, buttons in `ghost` and `page`).
   * While it lives in the empty state, don't repeat it in the toolbar above.
   */
  action?: React.ReactNode;
  /** `ghost` only: placeholder columns (match the real table). @default 4 */
  columns?: number;
  /** `ghost` only: placeholder rows. @default 3 */
  rows?: number;
}

/** Bar widths for the ghost rows: varied but deterministic, so SSR and client match. */
const GHOST_WIDTHS = [60, 45, 55, 40, 70, 50, 65, 35];

function GhostRows({ columns, rows }: { columns: number; rows: number }) {
  return (
    <div
      aria-hidden
      data-slot="empty-state-ghost"
      // Fades out downwards and clears an ellipse in the middle, so the text sits on the plain
      // surface without a box of its own behind it.
      className="ui:[mask-composite:intersect] ui:[mask-image:radial-gradient(ellipse_42%_60%_at_50%_50%,transparent_55%,black_100%),linear-gradient(rgb(0_0_0/0.9),transparent)]"
    >
      {Array.from({ length: rows }, (_, r) => (
        <div
          key={r}
          className="ui:grid ui:h-[46px] ui:items-center ui:gap-4 ui:border-t ui:border-background-300 ui:px-3.5 ui:first:border-t-0"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: columns }, (_, c) => (
            <span
              key={c}
              className={cn(
                "ui:h-2 ui:rounded-[4px] ui:bg-background-300",
                c === columns - 1 && columns > 1 && "ui:justify-self-end",
              )}
              style={{ width: `${GHOST_WIDTHS[(r * 3 + c) % GHOST_WIDTHS.length]}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * The empty state of a list, a table or a screen. Three forms, from quietest to most present:
 * `row`, `ghost` and `page`. None of them uses an illustration or brand colour: the way out
 * (the action) is what matters.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { variant = "row", title, description, action, columns = 4, rows = 3, className, ...rest },
  ref,
) {
  if (variant === "row") {
    return (
      <div
        ref={ref}
        data-slot="empty-state"
        data-variant="row"
        className={cn(
          "malbec-font-sans ui:text-left ui:text-[13px] ui:leading-5 ui:text-text-default-muted ui:[&_a]:font-medium ui:[&_a]:text-malbec-ink ui:[&_a]:underline ui:[&_a]:decoration-background-300 ui:[&_a]:underline-offset-[3px] ui:[&_button]:font-medium ui:[&_button]:text-malbec-ink",
          className,
        )}
        {...rest}
      >
        {title}
        {action ? <> {action}</> : null}
      </div>
    );
  }

  const text = (
    <div className="ui:flex ui:flex-col ui:gap-0.5">
      <p
        className={cn(
          "ui:m-0 ui:text-sm ui:font-medium",
          variant === "page" ? "ui:text-malbec-ink" : "ui:text-text-default",
        )}
      >
        {title}
      </p>
      {description ? (
        <p className="ui:m-0 ui:max-w-sm ui:text-xs ui:text-text-default-muted">{description}</p>
      ) : null}
    </div>
  );

  if (variant === "ghost") {
    return (
      <div
        ref={ref}
        data-slot="empty-state"
        data-variant="ghost"
        className={cn("malbec-font-sans ui:relative", className)}
        {...rest}
      >
        <GhostRows columns={Math.max(1, columns)} rows={Math.max(1, rows)} />
        <div className="ui:absolute ui:inset-0 ui:flex ui:flex-col ui:items-center ui:justify-center ui:gap-2.5 ui:text-center">
          {text}
          {action ? <div data-slot="empty-state-actions">{action}</div> : null}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-slot="empty-state"
      data-variant="page"
      className={cn(
        "malbec-font-sans ui:flex ui:flex-wrap ui:items-center ui:justify-between ui:gap-4 ui:border-t ui:border-embossed-edge ui:py-5 ui:shadow-[inset_0_1.5px_0_white]",
        className,
      )}
      {...rest}
    >
      {text}
      {action ? (
        <div data-slot="empty-state-actions" className="ui:flex ui:shrink-0 ui:items-center ui:gap-2">
          {action}
        </div>
      ) : null}
    </div>
  );
});
EmptyState.displayName = "EmptyState";
