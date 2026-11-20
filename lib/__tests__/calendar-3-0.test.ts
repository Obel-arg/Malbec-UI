import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { calendarMonthRootVariants, calendarMonthTodayIndicatorVariants } from "../CalendarMonth/calendar-month-variants";
import { calendarTimeGridRootVariants, calendarTimeGridTodayBadgeVariants } from "../CalendarTimeGrid/calendar-timegrid-variants";

const sources = ["lib/CalendarMonth", "lib/CalendarTimeGrid"].flatMap((dir) =>
  readdirSync(dir)
    .filter((f) => /\.tsx?$/.test(f) && !/\.(test|stories)\./.test(f))
    .map((f) => [join(dir, f), readFileSync(join(dir, f), "utf8")] as const),
);

// 3.0 workshop: background-300 frame with no shadow, warm tokens, today in neutral solid.
describe("calendar defaults (3.0)", () => {
  it.each([
    ["CalendarMonth", calendarMonthRootVariants()],
    ["CalendarWeek/Day", calendarTimeGridRootVariants()],
  ])("%s frame is a background-300 border with no shadow", (_name, classes) => {
    expect(classes).toContain("ui:border-background-300");
    expect(classes).not.toContain("shadow");
  });

  it.each([
    ["CalendarMonth", calendarMonthTodayIndicatorVariants()],
    ["CalendarWeek/Day", calendarTimeGridTodayBadgeVariants()],
  ])("%s marks today in malbec-icon, not the brand colour", (_name, classes) => {
    expect(classes).toContain("ui:bg-malbec-icon");
    expect(classes).not.toContain("bg-primary");
  });

  it("draws its labels (day names, hours, days outside the month) in subtle-text", () => {
    // Live feedback on 2.1.0-rc.4: muted-text read too dark for the calendar chrome.
    for (const [file, src] of sources) {
      expect(src.includes("malbec-muted-text"), `${file} still uses muted-text`).toBe(false);
    }
    const labelled = sources.filter(([, src]) => src.includes("ui:text-malbec-subtle-text"));
    expect(labelled.length).toBeGreaterThanOrEqual(4);
  });

  it("uses no sidebar-border, no 12px shadow, no brand at low opacity and no cold greys", () => {
    for (const [file, src] of sources) {
      for (const banned of ["sidebar-border", "0_2px_12px", "bg-primary/", "#e0e0e0", "#a0a0a0", "#a6a6ad", "#f9f9f9", "#f0f0f0", "#333333", "#ef4444"]) {
        expect(src.includes(banned), `${file} contains ${banned}`).toBe(false);
      }
    }
  });
});
