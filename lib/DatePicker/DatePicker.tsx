"use client";

import * as React from "react";
import { format, type Locale } from "date-fns";
import {
  type DateRange,
  type DayPickerProps,
  type Matcher,
} from "react-day-picker";
import { Calendar, type CalendarProps } from "../Calendar/Calendar";
import { Popover } from "../Popover/Popover";
import { Select } from "../Select/Select";
import { cn } from "../utils/cn";
import {
  datePickerLeadingIconVariants,
  datePickerTrailingIconVariants,
  datePickerTriggerTextVariants,
  datePickerTriggerVariants,
  type DatePickerState,
} from "./date-picker-variants";

export type { DatePickerState } from "./date-picker-variants";

type DatePickerMode = "single" | "range";

function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? (controlledValue as T) : uncontrolled;
  const setValue = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      const base = isControlled ? (controlledValue as T) : uncontrolled;
      const resolved =
        typeof next === "function" ? (next as (p: T) => T)(base) : next;
      if (!isControlled) setUncontrolled(resolved);
      onChange?.(resolved);
    },
    [controlledValue, isControlled, onChange, uncontrolled],
  );
  return [value, setValue];
}

function resolveDefaultOpen(state: DatePickerState): boolean {
  return state !== "closed";
}

function resolveDefaultMode(state: DatePickerState): DatePickerMode {
  return state === "date-range" ? "range" : "single";
}

/**
 * Month the calendar opens on when the consumer gave no `defaultMonth`: the
 * month of whatever is already selected, else the current month. Never a fixed
 * date — one would silently rot.
 */
function resolveInitialMonth(
  defaultMonth: Date | undefined,
  date: Date | undefined,
  range: DateRange | undefined,
): Date {
  return defaultMonth ?? date ?? range?.from ?? new Date();
}

function formatDateValue(date: Date, locale?: Locale): string {
  return format(date, "MMM dd, yyyy", { locale });
}

function formatRangeValue(range: DateRange, locale?: Locale): string | null {
  if (!range.from || !range.to) return null;
  return `${formatDateValue(range.from, locale)} - ${formatDateValue(range.to, locale)}`;
}

function getEffectiveState(
  state: DatePickerState | undefined,
): DatePickerState {
  return state ?? "closed";
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

export interface DatePickerPresetItem {
  value: string;
  label: string;
  date?: Date;
  range?: DateRange;
}

type DatePickerContextValue = {
  state: DatePickerState;
  mode: DatePickerMode;
  setMode: (next: DatePickerMode) => void;
  open: boolean;
  setOpen: (next: boolean) => void;
  date: Date | undefined;
  setDate: (next: Date | undefined) => void;
  range: DateRange | undefined;
  setRange: (next: DateRange | undefined) => void;
  month: Date;
  setMonth: (next: Date) => void;
  placeholder: string;
  disabled: Matcher | Matcher[] | undefined;
  presets: DatePickerPresetItem[];
  preset: string | undefined;
  setPreset: (next: string | undefined) => void;
  showPreset: boolean;
  locale: Locale | undefined;
  closeOnSelect: boolean;
};

const DatePickerContext = React.createContext<DatePickerContextValue | null>(
  null,
);

function useDatePickerContext(component: string): DatePickerContextValue {
  const ctx = React.useContext(DatePickerContext);
  if (!ctx) {
    throw new Error(`<${component}> must be rendered inside <DatePicker>.`);
  }
  return ctx;
}

export interface DatePickerProps {
  state?: DatePickerState;
  mode?: DatePickerMode;
  defaultMode?: DatePickerMode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  date?: Date;
  defaultDate?: Date;
  onDateChange?: (date: Date | undefined) => void;
  range?: DateRange;
  defaultRange?: DateRange;
  onRangeChange?: (range: DateRange | undefined) => void;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  placeholder?: string;
  disabled?: Matcher | Matcher[];
  presets?: DatePickerPresetItem[];
  preset?: string;
  defaultPreset?: string;
  onPresetChange?: (preset: string | undefined) => void;
  /** date-fns locale applied to both the trigger label and the calendar. */
  locale?: Locale;
  /**
   * Close the popover once the selection is complete: on the day click in
   * `single` mode, on the click that closes the range in `range` mode. Clearing
   * a selection never closes it.
   * @default true
   */
  closeOnSelect?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const DatePickerRoot = React.forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePickerRoot(
    {
      state: stateProp,
      mode: modeProp,
      defaultMode,
      open: openProp,
      defaultOpen,
      onOpenChange,
      date: dateProp,
      defaultDate,
      onDateChange,
      range: rangeProp,
      defaultRange,
      onRangeChange,
      month: monthProp,
      defaultMonth,
      onMonthChange,
      placeholder = "Pick a date",
      disabled: disabledProp,
      presets = [],
      preset: presetProp,
      defaultPreset,
      onPresetChange,
      locale,
      closeOnSelect = true,
      className,
      children,
    },
    ref,
  ) {
    const state = getEffectiveState(stateProp);

    const [mode, setMode] = useControllableState<DatePickerMode>(
      modeProp,
      defaultMode ?? resolveDefaultMode(state),
    );

    const [open, setOpen] = useControllableState<boolean>(
      openProp,
      defaultOpen ?? resolveDefaultOpen(state),
      onOpenChange,
    );

    const [date, setDate] = useControllableState<Date | undefined>(
      dateProp,
      defaultDate,
      onDateChange,
    );

    const [range, setRange] = useControllableState<DateRange | undefined>(
      rangeProp,
      defaultRange,
      onRangeChange,
    );

    const [month, setMonth] = useControllableState<Date>(
      monthProp,
      resolveInitialMonth(
        defaultMonth,
        dateProp ?? defaultDate,
        rangeProp ?? defaultRange,
      ),
      onMonthChange,
    );

    const [preset, setPreset] = useControllableState<string | undefined>(
      presetProp,
      defaultPreset,
      onPresetChange,
    );

    const showPreset = state === "preset";
    /** `state="birth"` is a date of birth: nobody was born tomorrow. */
    const disabled = React.useMemo<Matcher | Matcher[] | undefined>(
      () =>
        disabledProp ?? (state === "birth" ? { after: new Date() } : undefined),
      [disabledProp, state],
    );

    React.useEffect(() => {
      if (!preset) return;
      const selectedPreset = presets.find((item) => item.value === preset);
      if (!selectedPreset) return;
      if (selectedPreset.range) {
        setMode("range");
        setRange(selectedPreset.range);
        if (selectedPreset.range.from) setMonth(selectedPreset.range.from);
        return;
      }
      if (selectedPreset.date) {
        setMode("single");
        setDate(selectedPreset.date);
        setMonth(selectedPreset.date);
      }
    }, [preset, presets, setDate, setMode, setMonth, setRange]);

    const ctx = React.useMemo<DatePickerContextValue>(
      () => ({
        state,
        mode,
        setMode,
        open,
        setOpen,
        date,
        setDate,
        range,
        setRange,
        month,
        setMonth,
        placeholder,
        disabled,
        presets,
        preset,
        setPreset,
        showPreset,
        locale,
        closeOnSelect,
      }),
      [
        state,
        mode,
        setMode,
        open,
        setOpen,
        date,
        setDate,
        range,
        setRange,
        month,
        setMonth,
        placeholder,
        disabled,
        presets,
        preset,
        setPreset,
        showPreset,
        locale,
        closeOnSelect,
      ],
    );

    return (
      <Popover modal={false} open={open} onOpenChange={setOpen}>
        <DatePickerContext.Provider value={ctx}>
          <div
            ref={ref}
            data-slot="date-picker"
            data-state={state}
            className={cn("malbec-font-sans ui:w-[280px]", className)}
          >
            {children}
          </div>
        </DatePickerContext.Provider>
      </Popover>
    );
  },
);
DatePickerRoot.displayName = "DatePicker";

export type DatePickerTriggerProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "type"
> & {
  placeholder?: string;
};

const DatePickerTrigger = React.forwardRef<
  HTMLButtonElement,
  DatePickerTriggerProps
>(function DatePickerTrigger(
  { className, placeholder, children, ...rest },
  ref,
) {
  const ctx = useDatePickerContext("DatePicker.Trigger");

  const label = React.useMemo(() => {
    if (children) return children;
    if (ctx.mode === "range" && ctx.range) {
      return (
        formatRangeValue(ctx.range, ctx.locale) ??
        placeholder ??
        ctx.placeholder
      );
    }
    if (ctx.mode === "single" && ctx.date) {
      return formatDateValue(ctx.date, ctx.locale);
    }
    return placeholder ?? ctx.placeholder;
  }, [
    children,
    ctx.date,
    ctx.locale,
    ctx.mode,
    ctx.placeholder,
    ctx.range,
    placeholder,
  ]);

  const trailingIcon = ctx.state === "birth";

  return (
    <Popover.Trigger asChild>
      <button
        ref={ref}
        type="button"
        data-slot="date-picker-trigger"
        data-state={ctx.state}
        className={cn(
          datePickerTriggerVariants({ state: ctx.state }),
          className,
        )}
        {...rest}
      >
        {!trailingIcon ? (
          <span className={datePickerLeadingIconVariants()}>
            <CalendarIcon className="ui:size-full" />
          </span>
        ) : null}
        <span className={datePickerTriggerTextVariants()}>{label}</span>
        {trailingIcon ? (
          <span className={datePickerTrailingIconVariants()}>
            <CalendarIcon className="ui:size-full" />
          </span>
        ) : null}
      </button>
    </Popover.Trigger>
  );
});
DatePickerTrigger.displayName = "DatePicker.Trigger";

export type DatePickerContentProps = React.ComponentPropsWithoutRef<
  typeof Popover.Content
>;

const DatePickerContent = React.forwardRef<
  React.ComponentRef<typeof Popover.Content>,
  DatePickerContentProps
>(function DatePickerContent(
  { className, side = "bottom", align = "center", sideOffset = 4, ...rest },
  ref,
) {
  useDatePickerContext("DatePicker.Content");
  return (
    <Popover.Content
      ref={ref}
      data-slot="date-picker-content"
      side={side}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "ui:w-fit ui:min-w-(--radix-popover-trigger-width,280px) ui:max-w-(--radix-popover-content-available-width) ui:bg-background-100",
        className,
      )}
      {...rest}
    />
  );
});
DatePickerContent.displayName = "DatePicker.Content";

export type DatePickerPresetProps = React.ComponentPropsWithoutRef<"div">;

const DatePickerPreset = React.forwardRef<
  HTMLDivElement,
  DatePickerPresetProps
>(function DatePickerPreset({ className, ...rest }, ref) {
  const ctx = useDatePickerContext("DatePicker.Preset");

  const selectedLabel =
    ctx.presets.find((item) => item.value === ctx.preset)?.label ?? "Select";

  if (ctx.presets.length === 0) {
    return (
      <div
        ref={ref}
        data-slot="date-picker-preset"
        className={cn(
          "malbec-font-sans ui:flex ui:h-9 ui:w-full ui:items-center ui:justify-between ui:rounded-md ui:border ui:border-background-300 ui:bg-background-100 ui:px-4 ui:py-2 ui:text-sm ui:font-normal ui:text-text-default",
          className,
        )}
        {...rest}
      >
        <span className="ui:truncate">{selectedLabel}</span>
        <span className="ui:ml-2 ui:inline-flex ui:size-4 ui:shrink-0 ui:opacity-50">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="ui:size-full"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-slot="date-picker-preset"
      className={cn(className)}
      {...rest}
    >
      <Select value={ctx.preset} onValueChange={ctx.setPreset}>
        <Select.Trigger aria-label="Date preset">
          <Select.Value placeholder="Select" />
        </Select.Trigger>
        <Select.Content>
          {ctx.presets.map((item) => (
            <Select.Item key={item.value} value={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
});
DatePickerPreset.displayName = "DatePicker.Preset";

export type DatePickerCalendarProps = Omit<
  CalendarProps,
  | "mode"
  | "selected"
  | "onSelect"
  | "month"
  | "onMonthChange"
  | "disabled"
  | "required"
  | "showTodayStyle"
> & {
  className?: string;
};

const DatePickerCalendar = React.forwardRef<
  HTMLDivElement,
  DatePickerCalendarProps
>(function DatePickerCalendar({ className, ...rest }, ref) {
  const ctx = useDatePickerContext("DatePicker.Calendar");
  const { closeOnSelect, open, setDate, setOpen, setRange } = ctx;

  /**
   * Day clicks since the popover opened. With no `min`, `react-day-picker`
   * already reports a complete `{ from: d, to: d }` on the first click and
   * re-completes the range on every click after that, so the value alone never
   * says whether the user is done — a range takes a start click and an end
   * click, so count them.
   */
  const rangeClicks = React.useRef(0);
  React.useEffect(() => {
    if (open) rangeClicks.current = 0;
  }, [open]);

  const handleSelectDate = (next: Date | undefined) => {
    setDate(next);
    // Clicking the selected day clears it; stay open so another can be picked.
    if (closeOnSelect && next) setOpen(false);
  };

  const handleSelectRange = (next: DateRange | undefined) => {
    rangeClicks.current += 1;
    setRange(next);
    const complete = Boolean(next?.from && next?.to);
    if (closeOnSelect && complete && rangeClicks.current >= 2) setOpen(false);
  };

  return (
    <div ref={ref} data-slot="date-picker-calendar" className={cn(className)}>
      {ctx.mode === "range" ? (
        <Calendar
          mode="range"
          numberOfMonths={2}
          pagedNavigation
          showOutsideDays
          showTodayStyle={false}
          locale={ctx.locale}
          month={ctx.month}
          onMonthChange={ctx.setMonth}
          selected={ctx.range}
          onSelect={handleSelectRange}
          disabled={ctx.disabled}
          {...(rest as Omit<
            DayPickerProps,
            | "mode"
            | "selected"
            | "onSelect"
            | "month"
            | "onMonthChange"
            | "disabled"
            | "required"
          >)}
        />
      ) : (
        <Calendar
          mode="single"
          showOutsideDays
          showTodayStyle
          locale={ctx.locale}
          month={ctx.month}
          onMonthChange={ctx.setMonth}
          selected={ctx.date}
          onSelect={handleSelectDate}
          disabled={ctx.disabled}
          {...(rest as Omit<
            DayPickerProps,
            | "mode"
            | "selected"
            | "onSelect"
            | "month"
            | "onMonthChange"
            | "disabled"
            | "required"
          >)}
        />
      )}
    </div>
  );
});
DatePickerCalendar.displayName = "DatePicker.Calendar";

type DatePickerComponent = typeof DatePickerRoot & {
  Trigger: typeof DatePickerTrigger;
  Content: typeof DatePickerContent;
  Preset: typeof DatePickerPreset;
  Calendar: typeof DatePickerCalendar;
};

export const DatePicker = DatePickerRoot as DatePickerComponent;
DatePicker.Trigger = DatePickerTrigger;
DatePicker.Content = DatePickerContent;
DatePicker.Preset = DatePickerPreset;
DatePicker.Calendar = DatePickerCalendar;

export {
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPreset,
  DatePickerCalendar,
};
