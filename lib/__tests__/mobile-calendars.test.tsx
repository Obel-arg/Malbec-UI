import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  calendarMonthHeaderRowVariants,
  calendarMonthRootVariants,
  calendarMonthWeekRowVariants,
} from "../CalendarMonth/calendar-month-variants";
import { CalendarWeek } from "../CalendarTimeGrid/CalendarWeek";
import {
  calendarTimeGridAllDayRowVariants,
  calendarTimeGridBodyRowVariants,
  calendarTimeGridHeaderRowVariants,
  calendarTimeGridRootVariants,
} from "../CalendarTimeGrid/calendar-timegrid-variants";

const classes = (s: string) => s.split(/\s+/);

/**
 * At 375px the week view had ~45px columns and the month view ~53px cells with 10px text.
 * Below sm they keep a readable width and scroll sideways instead.
 */
describe("calendars on a phone", () => {
  it("the month view scrolls sideways with 80px columns", () => {
    expect(classes(calendarMonthRootVariants())).toContain("ui:max-sm:overflow-x-auto");
    expect(classes(calendarMonthHeaderRowVariants())).toContain("ui:max-sm:min-w-[560px]");
    expect(classes(calendarMonthWeekRowVariants())).toContain("ui:max-sm:min-w-[560px]");
  });

  it("the time grid scrolls sideways; every row takes the width its view sets", () => {
    expect(classes(calendarTimeGridRootVariants())).toContain("ui:max-sm:overflow-x-auto");
    for (const row of [
      calendarTimeGridHeaderRowVariants(),
      calendarTimeGridAllDayRowVariants(),
      calendarTimeGridBodyRowVariants(),
    ]) {
      expect(classes(row)).toContain("ui:max-sm:min-w-(--calendar-timegrid-min-width)");
    }
  });

  it("the week view sets that width to the gutter plus seven 64px columns", () => {
    const { container } = render(<CalendarWeek week={new Date(2026, 10, 16)} events={[]} />);
    const root = container.querySelector<HTMLElement>('[data-slot="calendar-week"]')!;
    expect(root.style.getPropertyValue("--calendar-timegrid-min-width")).toBe("calc(3.5rem + 7 * 4rem)");
  });
});
