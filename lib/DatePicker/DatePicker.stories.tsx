import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  addMonths,
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
    <DatePicker state="closed">
      <DatePicker.Trigger />
      <DatePicker.Content>
        <DatePicker.Calendar locale={es} />
      </DatePicker.Content>
    </DatePicker>
  ),
};

export const Open: Story = {
  render: () => (
    <DatePicker state="open" defaultOpen>
      <DatePicker.Trigger />
      <DatePicker.Content>
        {" "}
        <DatePicker.Calendar locale={es} />
      </DatePicker.Content>
    </DatePicker>
  ),
};

export const DateRange: Story = {
  render: () => (
    <DatePicker state="date-range" defaultOpen>
      <DatePicker.Trigger />
      <DatePicker.Content>
        {" "}
        <DatePicker.Calendar locale={es} />
      </DatePicker.Content>
    </DatePicker>
  ),
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
};
