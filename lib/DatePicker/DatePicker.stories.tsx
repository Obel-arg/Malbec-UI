import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  addMonths,
  addYears,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { es } from "date-fns/locale";
import {
  DatePicker,
  type DatePickerPresetItem,
  type DatePickerProps,
} from "./DatePicker";

function storyPresets(): DatePickerPresetItem[] {
  const now = new Date();
  const nextMonthDate = addMonths(now, 1);
  return [
    {
      value: "this-week",
      label: "This week",
      range: {
        from: startOfWeek(now, { locale: es }),
        to: endOfWeek(now, { locale: es }),
      },
    },
    {
      value: "this-month",
      label: "This month",
      range: { from: startOfMonth(now), to: endOfMonth(now) },
    },
    {
      value: "this-year",
      label: "This year",
      range: { from: startOfYear(now), to: endOfYear(now) },
    },
    {
      value: "next-month",
      label: "Next month",
      range: {
        from: startOfMonth(nextMonthDate),
        to: endOfMonth(nextMonthDate),
      },
    },
  ];
}

/**
 * Composed with `DatePicker.Trigger`, `DatePicker.Content`, and `state` for single / range / preset / birth flows.
 *
 * ```tsx
 * <DatePicker state="closed" locale={es}>
 *   <DatePicker.Trigger />
 *   <DatePicker.Content>
 *     <DatePicker.Calendar />
 *   </DatePicker.Content>
 * </DatePicker>
 * ```
 */
const meta = {
  title: "Components/Date Picker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<DatePickerProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  render: () => (
    <DatePicker locale={es} state="closed">
      <DatePicker.Trigger />
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { DatePicker } from "@obel-arg/malbec-ui";
import { es } from "date-fns/locale";

function Example() {
  return (
    <DatePicker locale={es} state="closed">
      <DatePicker.Trigger />
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  );
}`,
      },
    },
  },
};

export const Invalid: Story = {
  name: "State · invalid",
  render: () => (
    <DatePicker locale={es} state="closed">
      <DatePicker.Trigger aria-invalid />
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { DatePicker } from "@obel-arg/malbec-ui";
import { es } from "date-fns/locale";

function Example() {
  return (
    <DatePicker locale={es} state="closed">
      <DatePicker.Trigger aria-invalid />
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  );
}`,
      },
    },
  },
};

export const Open: Story = {
  render: () => (
    <DatePicker state="open" locale={es} defaultOpen>
      <DatePicker.Trigger />
      <DatePicker.Content>
        {" "}
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { DatePicker } from "@obel-arg/malbec-ui";
import { es } from "date-fns/locale";

function Example() {
  return (
    <DatePicker state="open" locale={es} defaultOpen>
      <DatePicker.Trigger />
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  );
}`,
      },
    },
  },
};

/**
 * Far future dates are reachable: the calendar opens on the selected month and
 * the year dropdown spans today +20 years. Widen it further with `endMonth`.
 */
export const FutureDate: Story = {
  name: "Future date",
  render: () => (
    <DatePicker locale={es} defaultOpen date={addYears(new Date(), 1)}>
      <DatePicker.Trigger />
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { addYears } from "date-fns";
import { es } from "date-fns/locale";
import { DatePicker } from "@obel-arg/malbec-ui";

function Example() {
  const [date, setDate] = useState<Date | undefined>(addYears(new Date(), 1));

  return (
    <DatePicker locale={es} defaultOpen date={date} onDateChange={setDate}>
      <DatePicker.Trigger />
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  );
}`,
      },
    },
  },
};

export const DateRange: Story = {
  render: () => (
    <DatePicker
      state="date-range"
      locale={es}
      defaultOpen
      defaultRange={{ from: startOfMonth(new Date()), to: new Date() }}
    >
      <DatePicker.Trigger />
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { DatePicker } from "@obel-arg/malbec-ui";

function Example() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  return (
    <DatePicker
      state="date-range"
      locale={es}
      defaultOpen
      range={range}
      onRangeChange={setRange}
    >
      <DatePicker.Trigger />
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  );
}`,
      },
    },
  },
};

export const Preset: Story = {
  render: () => (
    <DatePicker state="preset" defaultOpen presets={storyPresets()}>
      <DatePicker.Trigger />
      <DatePicker.Content className="ui:flex ui:flex-col ui:gap-3">
        <DatePicker.Preset /> <DatePicker.Calendar locale={es} />
      </DatePicker.Content>
    </DatePicker>
  ),
  parameters: {
    docs: {
      source: {
        code: `import {
  addMonths,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { es } from "date-fns/locale";
import { DatePicker, type DatePickerPresetItem } from "@obel-arg/malbec-ui";

function Example() {
  const now = new Date();
  const nextMonth = addMonths(now, 1);
  const presets: DatePickerPresetItem[] = [
    {
      value: "this-week",
      label: "This week",
      range: {
        from: startOfWeek(now, { locale: es }),
        to: endOfWeek(now, { locale: es }),
      },
    },
    {
      value: "this-month",
      label: "This month",
      range: { from: startOfMonth(now), to: endOfMonth(now) },
    },
    {
      value: "this-year",
      label: "This year",
      range: { from: startOfYear(now), to: endOfYear(now) },
    },
    {
      value: "next-month",
      label: "Next month",
      range: { from: startOfMonth(nextMonth), to: endOfMonth(nextMonth) },
    },
  ];

  return (
    <DatePicker state="preset" defaultOpen presets={presets}>
      <DatePicker.Trigger />
      <DatePicker.Content className="flex flex-col gap-3">
        <DatePicker.Preset />
        <DatePicker.Calendar locale={es} />
      </DatePicker.Content>
    </DatePicker>
  );
}`,
      },
    },
  },
};

export const Birth: Story = {
  render: () => (
    <DatePicker state="birth" defaultOpen>
      <DatePicker.Trigger />
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { DatePicker } from "@obel-arg/malbec-ui";

function Example() {
  return (
    <DatePicker state="birth" defaultOpen>
      <DatePicker.Trigger />
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  );
}`,
      },
    },
  },
};
