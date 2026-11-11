import * as React from "react";
import { cn } from "../utils/cn";

export interface EmptyStateProps extends Omit<React.ComponentProps<"div">, "title"> {
  /** Icon of the section, shown in a 44px tile (20px glyph). */
  icon?: React.ReactNode;
  title: React.ReactNode;
  /** One line that says what goes here. */
  description?: React.ReactNode;
  /**
   * The action that gets out of the empty state, right here. When it lives in the empty state,
   * don't repeat it in the toolbar above until there is at least one item (malbec-ux-ui).
   */
  action?: React.ReactNode;
}

/**
 * The empty state of a section: the icon in its tile, the text and the action to leave the empty
 * state, centred. Section scale on purpose: it shouldn't weigh more than the content that will
 * replace it (malbec-ux-ui, armar-una-pantalla §7).
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { icon, title, description, action, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="empty-state"
      className={cn(
        "malbec-font-sans ui:flex ui:flex-col ui:items-center ui:justify-center ui:gap-3 ui:py-16 ui:text-center",
        className,
      )}
      {...rest}
    >
      {icon ? (
        <span
          aria-hidden
          data-slot="empty-state-icon"
          className="ui:flex ui:size-11 ui:items-center ui:justify-center ui:rounded-xl ui:border ui:border-background-300 ui:bg-background-200 ui:text-text-default-muted ui:[&_svg]:size-5"
        >
          {icon}
        </span>
      ) : null}
      <div className="ui:flex ui:flex-col ui:gap-1">
        <p className="ui:m-0 ui:text-sm ui:font-medium ui:text-text-default">{title}</p>
        {description ? (
          <p className="ui:m-0 ui:mx-auto ui:max-w-sm ui:text-xs ui:text-text-default-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="ui:mt-1">{action}</div> : null}
    </div>
  );
});
EmptyState.displayName = "EmptyState";
