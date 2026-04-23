import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DateRange } from "react-day-picker";
import { Popover } from "../Popover/Popover";
import { Calendar } from "./Calendar";
import { es } from "date-fns/locale";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultMonth = new Date(2024, 8, 1);

export const Single: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="ui:rounded-md ui:border ui:border-background-300 ui:bg-background-100 ui:px-4 ui:py-2 ui:text-sm ui:text-text-default"
        >
          Open calendar
        </button>
      </Popover.Trigger>
      <Popover.Content className="ui:w-[max(var(--radix-popover-trigger-width,0px),280px)]">
        <Calendar
          locale={es}
          mode="single"
          defaultMonth={defaultMonth}
          selected={new Date(2024, 8, 17)}
        />
      </Popover.Content>
    </Popover>
  ),
};

export const Range: Story = {
  render: () => {
    const range: DateRange = {
      from: new Date(2026, 0, 12),
      to: new Date(2026, 1, 11),
    };
    return (
      <Popover defaultOpen>
        <Popover.Trigger asChild>
          <button
            type="button"
            className="ui:rounded-md ui:border ui:border-background-300 ui:bg-background-100 ui:px-4 ui:py-2 ui:text-sm ui:text-text-default"
          >
            Open range
          </button>
        </Popover.Trigger>
        <Popover.Content className="ui:w-[max(var(--radix-popover-trigger-width,0px),560px)]">
          <Calendar
            mode="range"
            locale={es}
            numberOfMonths={2}
            pagedNavigation
            showTodayStyle={false}
            defaultMonth={new Date(2026, 0, 1)}
            selected={range}
          />
        </Popover.Content>
      </Popover>
    );
  },
};
