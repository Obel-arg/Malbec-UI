"use client";

import { cn } from "../utils/cn";
import { nowMarkerTopPx } from "./calendar-timegrid-layout-utils";

export function CalendarTimeGridNowMarker({
  day,
  now,
  startHour,
  endHour,
  hourHeightPx,
  dotOnSeparator,
}: {
  day: Date;
  now: Date;
  startHour: number;
  endHour: number;
  hourHeightPx: number;
  dotOnSeparator?: boolean;
}) {
  const top = nowMarkerTopPx(day, now, startHour, endHour, hourHeightPx);
  if (top == null) return null;
  return (
    <div
      className="ui:pointer-events-none ui:absolute ui:inset-x-0 ui:z-30"
      style={{ top, transform: "translateY(-50%)" }}
      aria-hidden
    >
      <div className="ui:relative ui:flex ui:h-px ui:w-full ui:items-center">
        <span
          className={cn(
            "ui:absolute ui:size-2 ui:shrink-0 ui:rounded-full ui:bg-[#ef4444]",
            dotOnSeparator ? "ui:left-0 ui:-translate-x-1/2" : "ui:left-1",
          )}
        />
        <div className="ui:ml-3 ui:h-px ui:flex-1 ui:bg-[#ef4444]" />
      </div>
    </div>
  );
}
