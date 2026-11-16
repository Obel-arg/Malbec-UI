import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Calendar } from "../Calendar/Calendar";
import { DatePicker } from "../DatePicker/DatePicker";
import {
  floatingBarActionsVariants,
  floatingBarVariants,
} from "../FloatingBar/floating-bar-variants";
import { Pagination } from "../Pagination/Pagination";
import { paginationContentVariants } from "../Pagination/pagination-variants";
import { tabsListVariants } from "../Tabs/tabs-variants";

const classes = (s: string) => s.split(/\s+/);

/** Rows that were wider than a 375px screen and spilled off it. */
describe("nothing runs off a 375px screen", () => {
  it("FloatingBar caps at the screen and scrolls its actions sideways", () => {
    expect(classes(floatingBarVariants())).toContain("ui:max-w-[calc(100vw-2rem)]");
    const actions = classes(floatingBarActionsVariants());
    expect(actions).toContain("ui:min-w-0");
    expect(actions).toContain("ui:overflow-x-auto");
    expect(actions).not.toContain("ui:shrink-0");
  });

  it("segmented and opacity Tabs scroll sideways when they don't fit", () => {
    for (const variant of ["segmented", "opacity"] as const) {
      expect(classes(tabsListVariants({ variant }))).toContain("ui:overflow-x-auto");
    }
  });

  it("Pagination wraps and drops the Previous/Next words on a phone", () => {
    expect(classes(paginationContentVariants())).toContain("ui:flex-wrap");
    const { container } = render(
      <Pagination>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous href="#" />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Next href="#" />
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>,
    );
    const words = container.querySelectorAll("a > span");
    expect(words.length).toBe(2);
    for (const w of words) expect(classes(w.className)).toContain("ui:max-sm:sr-only");
  });

  it("Calendar stacks the months of a range on a phone, side by side from sm", () => {
    const { container } = render(
      <Calendar mode="range" numberOfMonths={2} defaultMonth={new Date(2026, 10, 1)} />,
    );
    const months = container.querySelector(".ui\\:flex-col.ui\\:sm\\:flex-row");
    expect(months).not.toBeNull();
  });

  it("DatePicker is 280px but never wider than its container", () => {
    const { container } = render(
      <DatePicker>
        <DatePicker.Trigger />
      </DatePicker>,
    );
    const root = container.querySelector('[data-slot="date-picker"]')!;
    expect(classes(root.className)).toContain("ui:w-[min(100%,280px)]");
  });
});
