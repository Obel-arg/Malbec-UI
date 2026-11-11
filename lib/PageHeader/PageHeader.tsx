import * as React from "react";
import { cn } from "../utils/cn";

export interface PageHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
  title: React.ReactNode;
  /** One sentence. Text, or a composed line (subtitle + a link). */
  description?: React.ReactNode;
  /** Next to the title, on its line: a scope chip, a status. A chip below would push the layout. */
  titleAddon?: React.ReactNode;
  /** The main action, on the right of the title row. */
  actions?: React.ReactNode;
}

/**
 * Page title row (malbec-ux-ui, patrones §4 and armar-una-pantalla §9): ink `h1`, the scope chip
 * on the same line, a one-sentence subtitle below and the main action on the right of the title
 * row — not above the table nor inside it.
 */
export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  { title, description, titleAddon, actions, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="page-header"
      className={cn("malbec-font-sans ui:flex ui:items-start ui:justify-between ui:gap-4", className)}
      {...rest}
    >
      <div className="ui:flex ui:min-w-0 ui:flex-col">
        <div className="ui:flex ui:flex-wrap ui:items-center ui:gap-3">
          <h1 className="ui:m-0 ui:text-2xl ui:font-bold ui:tracking-tight ui:text-malbec-ink">
            {title}
          </h1>
          {titleAddon}
        </div>
        {description ? (
          <div className="ui:mt-2 ui:max-w-[640px] ui:text-sm ui:leading-relaxed ui:text-text-default-muted">
            {description}
          </div>
        ) : null}
      </div>
      {actions ? (
        <div data-slot="page-header-actions" className="ui:flex ui:shrink-0 ui:items-center ui:gap-2">
          {actions}
        </div>
      ) : null}
    </div>
  );
});
PageHeader.displayName = "PageHeader";
