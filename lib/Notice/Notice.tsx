import * as React from "react";
import { cn } from "../utils/cn";
import { noticeIconVariants, noticeVariants, type NoticeTone } from "./notice-variants";

export type { NoticeTone } from "./notice-variants";

export interface NoticeProps extends Omit<React.ComponentProps<"div">, "title"> {
  /** `pending`: something is missing (the one yellow of the suite). `info`: neutral status. */
  tone?: NoticeTone;
  /** Icon shown in the 36px square (18px glyph). */
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** A button or link to where it gets solved, on the right. */
  action?: React.ReactNode;
}

/**
 * A status notice that is not an error: a missing setting, a module that is off. Use it instead
 * of `Alert variant="destructive"`, which reads as if the screen broke (malbec-ux-ui, NoticeCard).
 */
export const Notice = React.forwardRef<HTMLDivElement, NoticeProps>(function Notice(
  { tone = "info", icon, title, description, action, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      data-slot="notice"
      data-tone={tone}
      className={cn(noticeVariants({ tone }), className)}
      {...rest}
    >
      {icon ? (
        <span data-slot="notice-icon" className={noticeIconVariants({ tone })} aria-hidden>
          {icon}
        </span>
      ) : null}
      <div className="ui:flex ui:min-w-0 ui:flex-1 ui:flex-col ui:gap-0.5">
        <p className="ui:m-0 ui:text-[13px] ui:font-semibold ui:leading-5 ui:text-text-default">
          {title}
        </p>
        {description ? (
          <p className="ui:m-0 ui:text-xs ui:leading-[18px] ui:text-text-default-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="ui:shrink-0">{action}</div> : null}
    </div>
  );
});
Notice.displayName = "Notice";
