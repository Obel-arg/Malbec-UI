import * as React from "react";
import { cn } from "../utils/cn";

export interface PageHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
  title: React.ReactNode;
  /** Next to the title, on its line: a status or a scope chip. Nothing else goes on that line. */
  titleAddon?: React.ReactNode;
  /** One sentence under the title. It can end with the next action ("· Aprobar 3 costos →"). */
  description?: React.ReactNode;
  /** The main action (and at most a secondary one), on the right of the title row. */
  actions?: React.ReactNode;
  /**
   * The page's section tabs (`<Tabs.List>`), as the bottom row of the same block. Wrap the
   * header and the content in `<Tabs>` so the list and the panels share state.
   */
  tabs?: React.ReactNode;
}

/**
 * Page header, version D of the header workshop: title and actions on one row, a one-sentence
 * subtitle, and the section tabs attached below as one block. 18px bold ink title, 13px subtitle,
 * 8px of air before the content.
 */
export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  { title, titleAddon, description, actions, tabs, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="page-header"
      className={cn("malbec-font-sans ui:flex ui:flex-col ui:pb-2", className)}
      {...rest}
    >
      <div className="ui:flex ui:flex-wrap ui:items-center ui:justify-between ui:gap-x-4 ui:gap-y-3">
        <div className="ui:flex ui:min-w-0 ui:flex-wrap ui:items-center ui:gap-2.5">
          <h1 className="ui:m-0 ui:text-[18px] ui:leading-[1.15] ui:font-bold ui:tracking-[-0.02em] ui:text-malbec-ink">
            {title}
          </h1>
          {titleAddon}
        </div>
        {actions ? (
          <div data-slot="page-header-actions" className="ui:flex ui:shrink-0 ui:items-center ui:gap-2">
            {actions}
          </div>
        ) : null}
      </div>
      {description ? (
        <p className="ui:m-0 ui:mt-1 ui:max-w-[640px] ui:text-[13px] ui:leading-normal ui:text-text-default-muted">
          {description}
        </p>
      ) : null}
      {tabs ? (
        <div data-slot="page-header-tabs" className="ui:mt-3.5">
          {tabs}
        </div>
      ) : null}
    </div>
  );
});
PageHeader.displayName = "PageHeader";
