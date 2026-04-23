import * as React from "react";
import {
  DayButton as DayButtonPrimitive,
  DayPicker,
  type DayPickerProps,
} from "react-day-picker";
import { cn } from "../utils/cn";
import {
  calendarDayButtonBaseVariants,
  calendarNavButtonVariants,
} from "./calendar-variants";

type CalendarUiContextValue = {
  /** When false, "today" is not visually emphasized (e.g. range mode). */
  showTodayStyle: boolean;
};

const CalendarUiContext = React.createContext<CalendarUiContextValue>({
  showTodayStyle: true,
});

function useCalendarUi(): CalendarUiContextValue {
  return React.useContext(CalendarUiContext);
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export type CalendarDayButtonProps = React.ComponentProps<
  typeof DayButtonPrimitive
>;

/** @see https://daypicker.dev/guides/custom-components */
export function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: CalendarDayButtonProps): React.JSX.Element {
  const { showTodayStyle } = useCalendarUi();
  const isRangeSingleDay =
    Boolean(modifiers.range_start) && Boolean(modifiers.range_end);
  const inRangeVisual =
    Boolean(modifiers.range_middle) ||
    Boolean(modifiers.range_start) ||
    Boolean(modifiers.range_end);
  const isSelectedSingle = Boolean(modifiers.selected) && !inRangeVisual;

  return (
    <DayButtonPrimitive
      day={day}
      modifiers={modifiers}
      className={cn(
        calendarDayButtonBaseVariants(),
        modifiers.outside &&
          !inRangeVisual &&
          !isSelectedSingle &&
          "ui:text-text-default/50",
        modifiers.disabled && "ui:opacity-50",
        modifiers.range_middle &&
          "ui:rounded-none ui:bg-background-200 ui:text-text-default",
        // Figma (light): label on primary fill uses background/100. `!` beats `color: inherit`
        // from `.rdp-day_button` when RDP CSS is present. Dark: use primary-foreground token.
        isRangeSingleDay &&
          "ui:rounded-md ui:bg-primary ui:text-background-100! dark:ui:!text-primary-foreground",
        !isRangeSingleDay &&
          modifiers.range_start &&
          "ui:rounded-l-md ui:rounded-r-none ui:bg-primary ui:text-background-100! dark:ui:!text-primary-foreground",
        !isRangeSingleDay &&
          modifiers.range_end &&
          "ui:rounded-r-md ui:rounded-l-none ui:bg-primary ui:text-background-100! dark:ui:!text-primary-foreground",
        isSelectedSingle &&
          "ui:bg-primary ui:text-background-100! dark:ui:!text-primary-foreground",
        showTodayStyle &&
          modifiers.today &&
          !isSelectedSingle &&
          !inRangeVisual &&
          "ui:bg-primary ui:text-background-100! dark:ui:!text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
}

const defaultClassNames: Record<string, string> = {
  /** Always row: matches shadcn range calendar (two months side by side). */
  months: "ui:relative ui:flex ui:w-full ui:flex-row ui:gap-4",
  month: "ui:flex ui:min-w-0 ui:flex-1 ui:flex-col",
  /** Keep heading clear of the shared nav row. */
  month_caption:
    "ui:relative ui:flex ui:h-7 ui:max-w-full ui:min-w-0 ui:items-center ui:justify-center ui:px-9 ui:box-border",
  dropdowns: "ui:flex ui:items-center ui:justify-center ui:gap-2",
  caption_label:
    "ui:text-sm ui:font-medium ui:leading-tight ui:text-text-default ui:text-center",
  nav: "ui:pointer-events-none ui:absolute ui:inset-x-0 ui:top-0 ui:z-10 ui:flex ui:items-center ui:justify-between",
  button_previous: cn(calendarNavButtonVariants(), "ui:pointer-events-auto"),
  button_next: cn(calendarNavButtonVariants(), "ui:pointer-events-auto"),
  chevron: "ui:text-current",
  weekdays: "ui:mt-4 ui:flex ui:w-full",
  weekday:
    "ui:flex ui:w-9 ui:items-center ui:justify-center ui:text-center ui:text-xs ui:font-normal ui:leading-tight ui:text-text-default",
  week: "ui:mt-2 ui:flex ui:w-full",
  day: "ui:relative ui:flex ui:size-9 ui:items-center ui:justify-center ui:p-0 ui:text-center",
  selected: "",
  range_start: "",
  range_middle: "",
  range_end: "",
  outside: "",
  disabled: "",
  hidden: "ui:invisible",
  today: "",
  /** Drop `rdp-day_button` so `color: inherit` cannot override selected label color. */
  day_button: "",
};

const defaultComponents = {
  Dropdown: ({
    value,
    onChange,
    options,
    className,
    ...props
  }: React.SelectHTMLAttributes<HTMLSelectElement> & {
    options?: { value: string | number; label: string; disabled?: boolean }[];
  }) => {
    return (
      <div
        className={cn(
          "ui:relative ui:inline-flex ui:items-center ui:rounded-md ui:px-2 ui:py-0.5 ui:text-sm ui:font-medium ui:text-text-default ui:transition-colors hover:ui:bg-background-200",
          className,
        )}
      >
        <select
          className="ui:absolute ui:inset-0 ui:h-full ui:w-full ui:cursor-pointer ui:appearance-none ui:bg-transparent ui:opacity-0 ui:outline-none"
          value={value}
          onChange={onChange}
          {...props}
        >
          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <span className="ui:pointer-events-none">
          {options?.find((o) => o.value === value)?.label}
        </span>
        <ChevronDownIcon className="ui:pointer-events-none ui:ml-1 ui:size-3.5 ui:text-text-default/60" />
      </div>
    );
  },
  Chevron: ({
    orientation,
    ...iconProps
  }: {
    orientation?: "left" | "right" | "up" | "down";
    className?: string;
    [key: string]: unknown;
  }) =>
    orientation === "left" ? (
      <ChevronLeftIcon
        className={cn("ui:size-4 ui:shrink-0", iconProps.className)}
        {...(iconProps as React.SVGProps<SVGSVGElement>)}
      />
    ) : (
      <ChevronRightIcon
        className={cn("ui:size-4 ui:shrink-0", iconProps.className)}
        {...(iconProps as React.SVGProps<SVGSVGElement>)}
      />
    ),
  DayButton: CalendarDayButton,
};

export type CalendarProps = DayPickerProps & {
  className?: string;
  /**
   * When false, the current day is not filled with the primary color unless it
   * is selected (typical for range pickers).
   * @default true
   */
  showTodayStyle?: boolean;
};

/**
 * Malbec calendar — `react-day-picker` v9 with modifier styling on `DayButton`
 * (fixes range middle + rounded selection). Compose inside `Popover.Content`.
 */
function CalendarImpl({
  className,
  classNames,
  components,
  showTodayStyle = true,
  ...props
}: CalendarProps) {
  const ui = React.useMemo(() => ({ showTodayStyle }), [showTodayStyle]);

  return (
    <CalendarUiContext.Provider value={ui}>
      <DayPicker
        showOutsideDays
        captionLayout="dropdown"
        navLayout="after"
        className={cn("malbec-font-sans ui:w-full", className)}
        classNames={{ ...defaultClassNames, ...classNames }}
        components={{ ...defaultComponents, ...components }}
        {...props}
      />
    </CalendarUiContext.Provider>
  );
}

export const Calendar = CalendarImpl;
