"use client";

import * as React from "react";
import { Info } from "lucide-react";
import { Popover } from "../Popover/Popover";
import { cn } from "../utils/cn";

export interface FieldInfoProps {
  /** Short accessible name of the button ("Cómo se calcula"), not the explanation itself. */
  label: string;
  /** The explanation: a paragraph or a short block (paragraphs, a list). */
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  /**
   * Also opens on mouse hover (after a short pause) and closes on leave, unless it was clicked:
   * then it stays until a click outside or Escape. For long explanations read without hunting
   * for the button.
   */
  openOnHover?: boolean;
  /** Extra classes for the bubble (e.g. another max width for a list). */
  className?: string;
}

const HOVER_OPEN_MS = 150;
const HOVER_CLOSE_MS = 200;

/**
 * The "i" next to a field label (`Field.Label info`) with the explanation of the field. It opens on click, tap or keyboard: a
 * hover tooltip never opens on a tablet, and screen readers heard whole paragraphs as the
 * button's name. The button is 24px (WCAG 2.5.8) with a short `label`; Escape closes it.
 * Base: Records info-popover. Internal: consumers use `Field.Label info`.
 */
export function FieldInfo({
  label,
  content,
  side = "bottom",
  align = "start",
  openOnHover = false,
  className,
}: FieldInfoProps) {
  const [open, setOpen] = React.useState(false);
  // Opened by hover (closes on leave) or pinned by a click (doesn't).
  const pinned = React.useRef(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  React.useEffect(() => clear, []);

  const onOpenChange = (next: boolean) => {
    clear();
    pinned.current = next;
    setOpen(next);
  };

  const hover = openOnHover
    ? {
        onPointerEnter: (e: React.PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          clear();
          timer.current = setTimeout(() => setOpen(true), HOVER_OPEN_MS);
        },
        onPointerLeave: (e: React.PointerEvent) => {
          if (e.pointerType !== "mouse" || pinned.current) return;
          clear();
          timer.current = setTimeout(() => setOpen(false), HOVER_CLOSE_MS);
        },
      }
    : {};

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>
        <button
          {...hover}
          type="button"
          aria-label={label}
          data-slot="info-popover-trigger"
          onClick={(e) => {
            // Opened by hover, the click pins it instead of closing it.
            if (openOnHover && open && !pinned.current) {
              e.preventDefault();
              clear();
              pinned.current = true;
            }
          }}
          className="ui:inline-flex ui:size-6 ui:shrink-0 ui:items-center ui:justify-center ui:rounded-full ui:border-0 ui:bg-transparent ui:p-0 ui:text-malbec-icon ui:outline-none ui:transition-colors ui:hover:bg-background-200 ui:hover:text-malbec-ink ui:focus-visible:ring-2 ui:focus-visible:ring-focus"
        >
          <Info aria-hidden className="ui:size-4" />
        </button>
      </Popover.Trigger>
      <Popover.Content
        {...hover}
        side={side}
        align={align}
        sideOffset={6}
        collisionPadding={16}
        data-slot="info-popover-content"
        className={cn(
          "ui:max-w-xs ui:rounded-lg ui:text-[12px] ui:leading-snug ui:text-malbec-ink",
          className,
        )}
      >
        {content}
      </Popover.Content>
    </Popover>
  );
}
