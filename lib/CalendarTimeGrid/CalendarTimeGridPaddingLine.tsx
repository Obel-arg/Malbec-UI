import { timeGridEventAccentColor } from "./calendar-timegrid-colors";
import type { TimedPaddingRun } from "./calendar-timegrid-layout-utils";

/** Base line opacity — dimmer than a solid event block. */
const TIMED_PAD_LINE_OPACITY = 0.55;
/** Time-gutter width (`w-14`) the overlay skips so its 0–100% spans the columns. */
const TIMED_GRID_GUTTER_PX = 56;

/**
 * Absolute overlay covering the day columns (offset past the time gutter), so
 * padding runs can butt a show block's rail across column boundaries — the
 * per-column opaque backgrounds would otherwise hide any cross-column overflow.
 */
export function CalendarTimeGridPaddingOverlay({
  runs,
}: {
  runs: TimedPaddingRun[];
}) {
  if (runs.length === 0) return null;
  return (
    <div
      aria-hidden
      data-slot="calendar-timegrid-pad-overlay"
      className="ui:pointer-events-none ui:absolute ui:inset-y-0 ui:right-0 ui:z-20"
      style={{ left: TIMED_GRID_GUTTER_PX }}
    >
      {runs.map((run) => (
        <CalendarTimeGridPaddingLine key={run.key} run={run} />
      ))}
    </div>
  );
}

/**
 * A show's padding base line (travel / rest support day) drawn at the show's
 * vertical level, butting the show block's rail. Absolutely positioned within a
 * columns-wide overlay — its `left` / `width` are percentages of that overlay.
 */
export function CalendarTimeGridPaddingLine({ run }: { run: TimedPaddingRun }) {
  return (
    <span
      aria-hidden
      data-slot="calendar-timegrid-pad"
      className="ui:pointer-events-none ui:absolute"
      style={{
        top: run.top,
        height: run.height,
        left: run.left,
        width: run.width,
        backgroundColor: timeGridEventAccentColor(run.color),
        opacity: TIMED_PAD_LINE_OPACITY,
        borderRadius: 3,
        ...(run.roundLeft
          ? null
          : { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
        ...(run.roundRight
          ? null
          : { borderTopRightRadius: 0, borderBottomRightRadius: 0 }),
      }}
    />
  );
}
