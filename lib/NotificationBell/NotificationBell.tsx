"use client";

import * as React from "react";
import { Button, type ButtonProps } from "../Button/Button";
import { useMalbecLabels } from "../i18n/MalbecLabelsProvider";
import { cn } from "../utils/cn";

/*
 * Lucide's bell and bell-ring paths, untouched. Own SVG because the fill goes on some paths and not
 * others: the sound waves are open arcs and a filled icon would close them into solid half moons.
 */
const BODY =
  "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326";
const CLAPPER = "M10.268 21a2 2 0 0 0 3.464 0";
const WAVE_RIGHT = "M22 8c0-2.3-.8-4.3-2-6";
const WAVE_LEFT = "M4 2C2.8 3.7 2 5.7 2 8";

export interface NotificationBellProps
  extends Omit<ButtonProps, "variant" | "size" | "children"> {
  /** Unread notifications. The bell fills while it is above 0; a rise is an arrival. */
  unreadCount: number;
}

/**
 * The header bell (malbec-ux-ui campanita-inbox.md). Up to date it is an outline in the header's
 * icon colour; with unread notifications it fills in ink, its sound waves come out and a dot shows,
 * with a halo while the inbox is closed. Each rise of `unreadCount` is an arrival: the bell shakes
 * and the dot pops in again. The exact count travels in the aria-label, never as a number on screen.
 *
 * Wrap it in `Popover.Trigger asChild`: the trigger's `data-state="open"` stops the halo.
 */
export const NotificationBell = React.forwardRef<HTMLButtonElement, NotificationBellProps>(
  function NotificationBell({ unreadCount, className, ...rest }, ref) {
    const labels = useMalbecLabels();
    const unread = unreadCount > 0;

    // Previous count kept in state (not a ref) so an arrival is detected during render.
    const [seen, setSeen] = React.useState(unreadCount);
    // Monotonic: the dot's key, so every arrival remounts it and its entrance runs again.
    const [arrivals, setArrivals] = React.useState(0);
    const [shaking, setShaking] = React.useState(false);
    if (unreadCount !== seen) {
      setSeen(unreadCount);
      if (unreadCount > seen) {
        setArrivals((n) => n + 1);
        setShaking(true);
      }
    }

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        data-slot="notification-bell"
        data-unread={unread || undefined}
        aria-label={labels.notifications(unreadCount)}
        className={className}
        {...rest}
      >
        <span
          data-slot="notification-bell-ring"
          data-shaking={shaking || undefined}
          className="ui:relative ui:inline-flex"
          onAnimationEnd={(e) => {
            if (e.target === e.currentTarget) setShaking(false);
          }}
        >
          <svg
            data-slot="notification-bell-glyph"
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("ui:size-[22px]", unread && "ui:text-malbec-ink")}
          >
            <path data-slot="notification-bell-body" d={BODY} fill="currentColor" />
            <path data-slot="notification-bell-body" d={CLAPPER} fill="currentColor" />
            {/* Always in the DOM, so they have somewhere to animate from. */}
            <path data-slot="notification-bell-wave" d={WAVE_RIGHT} />
            <path data-slot="notification-bell-wave" d={WAVE_LEFT} />
          </svg>
          {unread ? (
            <span
              key={arrivals}
              data-slot="notification-bell-dot"
              aria-hidden
              className="ui:absolute ui:-right-0.5 ui:-top-0.5 ui:size-2 ui:rounded-full ui:bg-malbec-unread ui:ring-2 ui:ring-[var(--notification-bell-ring,var(--color-background-100))]"
            />
          ) : null}
        </span>
      </Button>
    );
  },
);
