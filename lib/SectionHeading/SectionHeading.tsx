import * as React from "react";
import { cn } from "../utils/cn";

export interface SectionHeadingProps {
  title: React.ReactNode;
  /** Section number ("01"). Muted, never in the brand colour. */
  number?: React.ReactNode;
  /** Content at the end of the row (a summary, a chevron). Inside the button when `toggle` is set. */
  trailing?: React.ReactNode;
  /** Makes the whole row the control that folds the section. Absent = inert heading. */
  toggle?: {
    open: boolean;
    /** `id` of the content this heading shows or hides. */
    controls: string;
    onToggle: () => void;
  };
  className?: string;
}

/** Embossed line on top of the heading: a divider between sections, not an underline. */
const dividerClass = "ui:border-t ui:border-embossed-edge ui:shadow-[inset_0_1.5px_0_white]";
const rowClass = "ui:flex ui:w-full ui:items-center ui:gap-3 ui:pt-6";
const numberClass = "ui:text-[13px] ui:font-semibold ui:text-text-default-muted";
const titleClass = "ui:text-[20px] ui:font-semibold ui:tracking-[-0.01em] ui:text-malbec-ink";

/**
 * Heading of a numbered section in a flat form. With `toggle`, the `<button>` goes INSIDE the
 * `<h2>`: a heading inside a button is invalid HTML, and this way the whole row is clickable while
 * the heading stays a landmark for screen readers. Base: Live section-heading.
 */
export function SectionHeading({ title, number, trailing, toggle, className }: SectionHeadingProps) {
  const content = (
    <>
      {number != null ? <span className={numberClass}>{number}</span> : null}
      <span className={titleClass}>{title}</span>
      {trailing}
    </>
  );

  return (
    <h2 data-slot="section-heading" className={cn("malbec-font-sans ui:m-0", dividerClass, className)}>
      {toggle ? (
        <button
          type="button"
          aria-controls={toggle.controls}
          aria-expanded={toggle.open}
          onClick={toggle.onToggle}
          className={cn(rowClass, "ui:cursor-pointer ui:border-0 ui:bg-transparent ui:p-0 ui:pt-6 ui:text-left")}
        >
          {content}
        </button>
      ) : (
        <span className={rowClass}>{content}</span>
      )}
    </h2>
  );
}
