"use client";

import * as React from "react";
import { Popover, type PopoverContentProps } from "../Popover/Popover";
import { cn } from "../utils/cn";
import {
  comboboxChipVariants,
  comboboxContentVariants,
  comboboxEmptyVariants,
  comboboxFilterInputVariants,
  comboboxFilterRowVariants,
  comboboxGroupLabelVariants,
  comboboxItemVariants,
  comboboxListVariants,
  comboboxSeparatorVariants,
  comboboxTriggerRowVariants,
} from "./combobox-variants";
import type { ComboboxTriggerRowVariant } from "./combobox-variants";

type ComboboxMode = "inline" | "trigger";

type ComboboxAnchorMode = "none" | "input" | "chips";

type ComboboxContextValue = {
  mode: ComboboxMode;
  anchorMode: ComboboxAnchorMode;
  setAnchorMode: (m: ComboboxAnchorMode) => void;
  items: readonly unknown[];
  itemToStringValue: (item: unknown) => string;
  itemToStringLabel: (item: unknown) => string;
  isItemEqualToValue: (a: unknown, b: unknown) => boolean;
  multiple: boolean;
  value: unknown | unknown[] | null;
  setValue: (next: unknown | unknown[] | null) => void;
  inputValue: string;
  setInputValue: (v: string) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
  disabled: boolean;
  autoHighlight: boolean;
  listId: string;
  labelId: string;
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  filteredItems: unknown[];
  preventContentAutofocus: boolean;
  comboboxRootRef: React.RefObject<HTMLDivElement | null>;
  /** Border-box width of the combobox root; drives popover/list width. */
  anchorWidthPx: number | null;
};

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null);

const ComboboxInsideChipsContext = React.createContext(false);

function useComboboxContext(component: string): ComboboxContextValue {
  const ctx = React.useContext(ComboboxContext);
  if (!ctx) {
    throw new Error(`<${component}> must be used inside <Combobox>.`);
  }
  return ctx;
}

function defaultItemToStringValue(item: unknown): string {
  if (typeof item === "string" || typeof item === "number") return String(item);
  if (
    item &&
    typeof item === "object" &&
    "label" in item &&
    typeof (item as { label?: unknown }).label === "string"
  ) {
    return (item as { label: string }).label;
  }
  return String(item);
}

function defaultItemToStringLabel(item: unknown): string {
  return defaultItemToStringValue(item);
}

function isNodeInsideRoot(
  root: HTMLElement | null,
  node: EventTarget | null | undefined,
): boolean {
  return Boolean(root && node instanceof Node && root.contains(node));
}

function filterComboboxItems(
  source: readonly unknown[],
  inputValue: string,
  itemToStringValue: (item: unknown) => string,
): unknown[] {
  const q = inputValue.trim().toLowerCase();
  if (!q) return [...source];
  return source.filter((item) =>
    itemToStringValue(item).toLowerCase().includes(q),
  );
}

export type ComboboxProps = {
  items: readonly unknown[];
  itemToStringValue?: (item: unknown) => string;
  itemToStringLabel?: (item: unknown) => string;
  isItemEqualToValue?: (a: unknown, b: unknown) => boolean;
  multiple?: boolean;
  value?: unknown | unknown[] | null;
  defaultValue?: unknown | unknown[] | null;
  onValueChange?: (value: unknown | unknown[] | null) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  autoHighlight?: boolean;
  /**
   * `inline` — the main field is an input anchored to the popover (shadcn “basic”).
   * `trigger` — use `<Combobox.Trigger>` plus a filter field inside `<Combobox.Content>`.
   */
  mode?: ComboboxMode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

function useControllable<T>(
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
    [isControlled, onChange, controlledValue, uncontrolled],
  );
  return [value, setValue];
}

const ComboboxRoot = React.forwardRef<HTMLDivElement, ComboboxProps>(
  function ComboboxRoot(
    {
      items,
      itemToStringValue: itemToStringValueProp,
      itemToStringLabel: itemToStringLabelProp,
      isItemEqualToValue: isItemEqualToValueProp,
      multiple = false,
      value: valueProp,
      defaultValue = multiple ? [] : null,
      onValueChange,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      autoHighlight = false,
      mode = "inline",
      className,
      style: rootStyle,
      children,
    },
    ref,
  ) {
    const comboboxRootRef = React.useRef<HTMLDivElement | null>(null);
    const setComboboxRootRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        comboboxRootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    const listId = React.useId();
    const labelId = React.useId();

    const itemToStringValue = React.useCallback(
      (item: unknown) =>
        itemToStringValueProp
          ? itemToStringValueProp(item)
          : defaultItemToStringValue(item),
      [itemToStringValueProp],
    );

    const itemToStringLabel = React.useCallback(
      (item: unknown) =>
        itemToStringLabelProp
          ? itemToStringLabelProp(item)
          : defaultItemToStringLabel(item),
      [itemToStringLabelProp],
    );

    const isItemEqualToValue = React.useCallback(
      (a: unknown, b: unknown) =>
        isItemEqualToValueProp ? isItemEqualToValueProp(a, b) : Object.is(a, b),
      [isItemEqualToValueProp],
    );

    const [open, setOpenState] = useControllable(
      openProp,
      defaultOpen,
      onOpenChange,
    );

    const [value, setValueInternal] = useControllable<
      unknown | unknown[] | null
    >(valueProp, defaultValue, onValueChange);

    const setValue = React.useCallback(
      (next: unknown | unknown[] | null) => {
        setValueInternal(next);
      },
      [setValueInternal],
    );

    const [inputValue, setInputValue] = React.useState("");
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const [anchorMode, setAnchorMode] =
      React.useState<ComboboxAnchorMode>("none");

    const [anchorWidthPx, setAnchorWidthPx] = React.useState<number | null>(
      null,
    );

    React.useLayoutEffect(() => {
      const el = comboboxRootRef.current;
      if (!el) return;
      const measure = () => {
        const w = el.getBoundingClientRect().width;
        setAnchorWidthPx(w > 0 ? Math.round(w) : null);
      };
      measure();
      const ro = new ResizeObserver(() => {
        measure();
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, []);

    const filteredItems = React.useMemo(
      () => filterComboboxItems(items, inputValue, itemToStringValue),
      [items, inputValue, itemToStringValue],
    );

    const setOpen = React.useCallback(
      (next: boolean) => {
        setOpenState(next);
        if (!next) {
          setHighlightedIndex(-1);
          return;
        }
        if (autoHighlight) {
          const filtered = filterComboboxItems(
            items,
            inputValue,
            itemToStringValue,
          );
          setHighlightedIndex(filtered.length > 0 ? 0 : -1);
        }
      },
      [autoHighlight, inputValue, itemToStringValue, items, setOpenState],
    );

    const preventContentAutofocus = mode === "inline";

    const ctx = React.useMemo<ComboboxContextValue>(
      () => ({
        mode,
        anchorMode,
        setAnchorMode,
        items,
        itemToStringValue,
        itemToStringLabel,
        isItemEqualToValue,
        multiple: Boolean(multiple),
        value,
        setValue,
        inputValue,
        setInputValue,
        open,
        setOpen,
        disabled,
        autoHighlight,
        listId,
        labelId,
        highlightedIndex,
        setHighlightedIndex,
        filteredItems,
        preventContentAutofocus,
        comboboxRootRef,
        anchorWidthPx,
      }),
      [
        mode,
        anchorMode,
        setAnchorMode,
        items,
        itemToStringValue,
        itemToStringLabel,
        isItemEqualToValue,
        multiple,
        value,
        setValue,
        inputValue,
        setInputValue,
        open,
        setOpen,
        disabled,
        autoHighlight,
        listId,
        labelId,
        highlightedIndex,
        setHighlightedIndex,
        filteredItems,
        preventContentAutofocus,
        comboboxRootRef,
        anchorWidthPx,
      ],
    );

    return (
      <Popover
        modal={false}
        open={open}
        onOpenChange={(next) => {
          if (disabled) return;
          setOpen(next);
        }}
      >
        <ComboboxContext.Provider value={ctx}>
          <div
            ref={setComboboxRootRef}
            data-slot="combobox"
            data-mode={mode}
            data-disabled={disabled || undefined}
            className={cn(
              "ui:relative ui:box-border ui:block ui:w-full ui:min-w-[200px] ui:max-w-full",
              className,
            )}
            style={{
              ...rootStyle,
              ...(anchorWidthPx != null
                ? ({
                    ["--combobox-anchor-width" as string]: `${anchorWidthPx}px`,
                  } as React.CSSProperties)
                : null),
            }}
          >
            {children}
          </div>
        </ComboboxContext.Provider>
      </Popover>
    );
  },
);
ComboboxRoot.displayName = "Combobox";

export type ComboboxInputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "value" | "defaultValue" | "onChange"
> & {
  /** When true, shows a chevron affordance (inline mode). */
  showTrigger?: boolean;
  /** When true, shows a clear control when there is a value or text. */
  showClear?: boolean;
  /**
   * `anchor` — this input is the popover anchor (default inline combobox).
   * `content` — filter field rendered inside `<Combobox.Content>`.
   */
  filterPlacement?: "anchor" | "content";
  /** Visual invalid state (passed to the input as `aria-invalid`). */
  "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling";
  triggerVariant?: ComboboxTriggerRowVariant;
};

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ChevronsUpDownIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  );
}

const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
  function ComboboxInput(
    {
      className,
      showTrigger = true,
      showClear = false,
      filterPlacement = "anchor",
      disabled: disabledProp,
      triggerVariant = "default",
      onKeyDown,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) {
    const ctx = useComboboxContext("Combobox.Input");
    const {
      mode: comboboxMode,
      multiple,
      open,
      value,
      inputValue,
      itemToStringLabel,
      setAnchorMode,
    } = ctx;
    const disabled = Boolean(disabledProp ?? ctx.disabled);
    const insideChips = React.useContext(ComboboxInsideChipsContext);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const mergedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLInputElement | null>).current =
            node;
      },
      [ref],
    );

    React.useEffect(() => {
      if (filterPlacement !== "anchor" || comboboxMode !== "inline") return;
      if (insideChips) return;
      setAnchorMode("input");
      return () => setAnchorMode("none");
    }, [comboboxMode, filterPlacement, insideChips, setAnchorMode]);

    const displayValue = React.useMemo(() => {
      if (multiple) return inputValue;
      if (!open && value != null && !Array.isArray(value)) {
        return itemToStringLabel(value);
      }
      return inputValue;
    }, [multiple, open, value, inputValue, itemToStringLabel]);

    const hasClear =
      showClear &&
      !disabled &&
      (Boolean(inputValue) ||
        (!multiple && value != null && !Array.isArray(value)));

    const clear = React.useCallback(() => {
      ctx.setInputValue("");
      if (ctx.multiple) ctx.setValue([]);
      else ctx.setValue(null);
      inputRef.current?.focus();
    }, [ctx]);

    const onKeyDownInternal = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (disabled) return;

        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (!ctx.open) ctx.setOpen(true);
          ctx.setHighlightedIndex((i) => {
            const next = Math.min(
              (i < 0 ? -1 : i) + 1,
              ctx.filteredItems.length - 1,
            );
            return next;
          });
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (!ctx.open) ctx.setOpen(true);
          ctx.setHighlightedIndex((i) => Math.max((i < 0 ? 0 : i) - 1, 0));
        } else if (e.key === "Enter") {
          if (!ctx.open) return;
          const item =
            ctx.highlightedIndex >= 0
              ? ctx.filteredItems[ctx.highlightedIndex]
              : ctx.filteredItems[0];
          if (item === undefined) return;
          e.preventDefault();
          if (ctx.multiple) {
            const cur = Array.isArray(ctx.value) ? [...ctx.value] : [];
            const exists = cur.some((v) => ctx.isItemEqualToValue(v, item));
            const next = exists
              ? cur.filter((v) => !ctx.isItemEqualToValue(v, item))
              : [...cur, item];
            ctx.setValue(next);
            ctx.setInputValue("");
          } else {
            ctx.setValue(item);
            ctx.setInputValue(ctx.itemToStringLabel(item));
            ctx.setOpen(false);
          }
        } else if (e.key === "Escape") {
          if (ctx.open) {
            e.preventDefault();
            ctx.setOpen(false);
          }
        }
      },
      [ctx, disabled, onKeyDown],
    );

    const inputEl = (
      <input
        ref={mergedRef}
        id={ctx.labelId}
        data-slot="combobox-input"
        disabled={disabled}
        role="combobox"
        autoComplete="off"
        aria-expanded={ctx.open}
        aria-controls={ctx.listId}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        value={displayValue}
        onChange={(e) => {
          ctx.setInputValue(e.target.value);
          if (!ctx.open) ctx.setOpen(true);
          if (!ctx.multiple) ctx.setValue(null);
        }}
        onFocus={(e) => {
          onFocus?.(e);
          if (disabled) return;
          ctx.setOpen(true);
        }}
        onBlur={(e) => {
          onBlur?.(e);
        }}
        onKeyDown={onKeyDownInternal}
        className={cn(
          filterPlacement === "content"
            ? comboboxFilterInputVariants()
            : comboboxFilterInputVariants(),
          filterPlacement === "anchor" &&
            "ui:flex-1 ui:bg-transparent ui:outline-none",
          className,
        )}
        {...rest}
      />
    );

    if (filterPlacement === "content") {
      return (
        <div
          data-slot="combobox-filter"
          className={cn(comboboxFilterRowVariants())}
        >
          <span className="ui:pointer-events-none ui:absolute ui:left-2 ui:top-1/2 ui:size-4 ui:-translate-y-1/2 ui:text-text-default ui:opacity-50">
            <SearchIcon className="ui:size-full" />
          </span>
          {inputEl}
        </div>
      );
    }

    const row = (
      <div
        className={cn(
          comboboxTriggerRowVariants({
            variant:
              rest["aria-invalid"] === true || rest["aria-invalid"] === "true"
                ? "invalid"
                : triggerVariant,
          }),
        )}
      >
        {inputEl}
        <div className="ui:flex ui:shrink-0 ui:items-center ui:gap-1">
          {hasClear ? (
            <button
              type="button"
              data-slot="combobox-clear"
              className="ui:inline-flex ui:size-7 ui:items-center ui:justify-center ui:rounded-sm ui:text-text-default ui:outline-none ui:transition-colors hover:ui:bg-background-200 focus-visible:ui:ring-2 focus-visible:ui:ring-primary"
              onMouseDown={(e) => e.preventDefault()}
              onClick={clear}
              aria-label="Clear selection"
            >
              <span className="ui:sr-only">Clear</span>
              <svg
                viewBox="0 0 24 24"
                className="ui:size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          ) : null}
          {showTrigger ? (
            <span
              className="ui:pointer-events-none ui:inline-flex ui:size-4 ui:text-text-default ui:opacity-50"
              aria-hidden
            >
              <ChevronsUpDownIcon className="ui:size-full" />
            </span>
          ) : null}
        </div>
      </div>
    );

    if (insideChips) {
      return (
        <div className="ui:flex ui:min-w-0 ui:flex-1 ui:items-center ui:gap-1 ui:px-1">
          {inputEl}
          <div className="ui:flex ui:shrink-0 ui:items-center ui:gap-1">
            {hasClear ? (
              <button
                type="button"
                data-slot="combobox-clear"
                className="ui:inline-flex ui:size-7 ui:items-center ui:justify-center ui:rounded-sm ui:text-text-default ui:outline-none ui:transition-colors hover:ui:bg-background-200 focus-visible:ui:ring-2 focus-visible:ui:ring-primary"
                onMouseDown={(e) => e.preventDefault()}
                onClick={clear}
                aria-label="Clear selection"
              >
                <span className="ui:sr-only">Clear</span>
                <svg
                  viewBox="0 0 24 24"
                  className="ui:size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>
      );
    }

    return (
      <Popover.Anchor asChild>
        <div className="ui:w-full">{row}</div>
      </Popover.Anchor>
    );
  },
);
ComboboxInput.displayName = "Combobox.Input";

export type ComboboxTriggerProps = React.ComponentPropsWithoutRef<"button"> & {
  placeholder?: string;
  triggerVariant?: ComboboxTriggerRowVariant;
};

const ComboboxTrigger = React.forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(function ComboboxTrigger(
  { className, placeholder, triggerVariant = "default", children, ...rest },
  ref,
) {
  const ctx = useComboboxContext("Combobox.Trigger");

  const label = React.useMemo(() => {
    if (children) return children;
    if (ctx.multiple && Array.isArray(ctx.value) && ctx.value.length > 0) {
      return `${ctx.value.length} selected`;
    }
    if (!ctx.multiple && ctx.value != null && !Array.isArray(ctx.value)) {
      return ctx.itemToStringLabel(ctx.value);
    }
    return placeholder ?? "Select…";
  }, [children, ctx, placeholder]);

  return (
    <Popover.Trigger asChild>
      <button
        ref={ref}
        type="button"
        data-slot="combobox-trigger"
        disabled={ctx.disabled}
        aria-expanded={ctx.open}
        aria-controls={ctx.listId}
        aria-haspopup="listbox"
        id={ctx.labelId}
        className={cn(
          comboboxTriggerRowVariants({ variant: triggerVariant }),
          "ui:w-full ui:text-left",
          className,
        )}
        {...rest}
      >
        <span className="ui:min-w-0 ui:flex-1 ui:truncate ui:text-sm ui:font-normal ui:leading-tight ui:text-text-default">
          {label}
        </span>
        <span className="ui:ml-2 ui:inline-flex ui:size-4 ui:shrink-0 ui:text-text-default ui:opacity-50">
          <ChevronsUpDownIcon className="ui:size-full" />
        </span>
      </button>
    </Popover.Trigger>
  );
});
ComboboxTrigger.displayName = "Combobox.Trigger";

export type ComboboxContentProps = Omit<PopoverContentProps, "surface">;

const ComboboxContent = React.forwardRef<
  React.ComponentRef<typeof Popover.Content>,
  ComboboxContentProps
>(function ComboboxContent(
  {
    className,
    style: styleProp,
    side = "bottom",
    sideOffset = 4,
    align = "start",
    onOpenAutoFocus,
    onCloseAutoFocus,
    onPointerDownOutside,
    onFocusOutside,
    ...rest
  },
  ref,
) {
  const ctx = useComboboxContext("Combobox.Content");

  const measuredWidthStyle =
    ctx.anchorWidthPx != null
      ? { width: ctx.anchorWidthPx, minWidth: ctx.anchorWidthPx }
      : undefined;

  return (
    <Popover.Content
      ref={ref}
      surface="plain"
      data-slot="combobox-content"
      style={{
        ...measuredWidthStyle,
        ...styleProp,
      }}
      side={side}
      sideOffset={sideOffset}
      align={align}
      collisionPadding={8}
      onOpenAutoFocus={(e) => {
        if (ctx.preventContentAutofocus) e.preventDefault();
        onOpenAutoFocus?.(e);
      }}
      onCloseAutoFocus={(e) => {
        onCloseAutoFocus?.(e);
      }}
      onPointerDownOutside={(e) => {
        if (isNodeInsideRoot(ctx.comboboxRootRef.current, e.target)) {
          e.preventDefault();
        }
        onPointerDownOutside?.(e);
      }}
      onFocusOutside={(e) => {
        if (
          isNodeInsideRoot(ctx.comboboxRootRef.current, document.activeElement)
        ) {
          e.preventDefault();
        }
        onFocusOutside?.(e);
      }}
      className={cn(comboboxContentVariants(), className)}
      {...rest}
    />
  );
});
ComboboxContent.displayName = "Combobox.Content";

export type ComboboxListProps = Omit<
  React.ComponentPropsWithoutRef<"ul">,
  "children"
> & {
  children: (item: unknown) => React.ReactNode;
};

const ComboboxList = React.forwardRef<HTMLUListElement, ComboboxListProps>(
  function ComboboxList({ className, children, ...rest }, ref) {
    const ctx = useComboboxContext("Combobox.List");

    return (
      <ul
        ref={ref}
        id={ctx.listId}
        role="listbox"
        aria-labelledby={ctx.labelId}
        data-slot="combobox-list"
        className={cn(comboboxListVariants(), className)}
        {...rest}
      >
        {ctx.filteredItems.map((item, index) => (
          <React.Fragment key={getItemKey(item, index)}>
            {children(item)}
          </React.Fragment>
        ))}
      </ul>
    );
  },
);
ComboboxList.displayName = "Combobox.List";

function getItemKey(item: unknown, index: number): string | number {
  if (
    item &&
    typeof item === "object" &&
    "value" in item &&
    typeof (item as { value?: unknown }).value === "string"
  ) {
    return (item as { value: string }).value;
  }
  if (typeof item === "string" || typeof item === "number") return item;
  return index;
}

export type ComboboxItemProps = Omit<
  React.ComponentPropsWithoutRef<"li">,
  "value"
> & {
  value: unknown;
  children?: React.ReactNode;
};

const ComboboxItem = React.forwardRef<HTMLLIElement, ComboboxItemProps>(
  function ComboboxItem({ className, value, children, onClick, ...rest }, ref) {
    const ctx = useComboboxContext("Combobox.Item");
    const index = ctx.filteredItems.indexOf(value);
    const highlighted = index === ctx.highlightedIndex;
    const selected = ctx.multiple
      ? Array.isArray(ctx.value) &&
        ctx.value.some((v) => ctx.isItemEqualToValue(v, value))
      : ctx.value != null &&
        !Array.isArray(ctx.value) &&
        ctx.isItemEqualToValue(ctx.value, value);

    return (
      <li
        ref={ref}
        role="option"
        data-slot="combobox-item"
        data-highlighted={highlighted || undefined}
        aria-selected={selected || undefined}
        className={cn(comboboxItemVariants(), className)}
        onMouseEnter={() => {
          if (index >= 0) ctx.setHighlightedIndex(index);
        }}
        onMouseMove={() => {
          if (index >= 0) ctx.setHighlightedIndex(index);
        }}
        onClick={(e) => {
          onClick?.(e);
          if (e.defaultPrevented) return;
          if (ctx.disabled) return;
          if (ctx.multiple) {
            const cur = Array.isArray(ctx.value) ? [...ctx.value] : [];
            const exists = cur.some((v) => ctx.isItemEqualToValue(v, value));
            const next = exists
              ? cur.filter((v) => !ctx.isItemEqualToValue(v, value))
              : [...cur, value];
            ctx.setValue(next);
            ctx.setInputValue("");
          } else {
            ctx.setValue(value);
            ctx.setInputValue(ctx.itemToStringLabel(value));
            ctx.setOpen(false);
          }
        }}
        {...rest}
      >
        <span className="ui:flex ui:min-w-0 ui:flex-1 ui:items-center ui:justify-start">
          {children ?? ctx.itemToStringLabel(value)}
        </span>
      </li>
    );
  },
);
ComboboxItem.displayName = "Combobox.Item";

export type ComboboxEmptyProps = React.ComponentPropsWithoutRef<"div">;

const ComboboxEmpty = React.forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  function ComboboxEmpty({ className, ...rest }, ref) {
    const ctx = useComboboxContext("Combobox.Empty");
    if (ctx.filteredItems.length > 0) return null;
    return (
      <div
        ref={ref}
        role="status"
        data-slot="combobox-empty"
        className={cn(comboboxEmptyVariants(), className)}
        {...rest}
      />
    );
  },
);
ComboboxEmpty.displayName = "Combobox.Empty";

export type ComboboxSeparatorProps = React.ComponentPropsWithoutRef<"div">;

const ComboboxSeparator = React.forwardRef<
  HTMLDivElement,
  ComboboxSeparatorProps
>(function ComboboxSeparator({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      role="separator"
      data-slot="combobox-separator"
      className={cn(comboboxSeparatorVariants(), className)}
      {...rest}
    />
  );
});
ComboboxSeparator.displayName = "Combobox.Separator";

export type ComboboxGroupProps = React.ComponentPropsWithoutRef<"div">;

const ComboboxGroup = React.forwardRef<HTMLDivElement, ComboboxGroupProps>(
  function ComboboxGroup({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        data-slot="combobox-group"
        className={cn("ui:flex ui:flex-col ui:gap-0", className)}
        {...rest}
      />
    );
  },
);
ComboboxGroup.displayName = "Combobox.Group";

export type ComboboxLabelProps = React.ComponentPropsWithoutRef<"div">;

const ComboboxLabel = React.forwardRef<HTMLDivElement, ComboboxLabelProps>(
  function ComboboxLabel({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="combobox-label"
        className={cn(comboboxGroupLabelVariants(), className)}
        {...rest}
      />
    );
  },
);
ComboboxLabel.displayName = "Combobox.Label";

export type ComboboxCollectionProps = { children?: React.ReactNode };

function ComboboxCollection({ children }: ComboboxCollectionProps) {
  return <>{children}</>;
}

export type ComboboxChipsProps = React.ComponentPropsWithoutRef<"div">;

const ComboboxChips = React.forwardRef<HTMLDivElement, ComboboxChipsProps>(
  function ComboboxChips({ className, ...rest }, ref) {
    const ctx = useComboboxContext("Combobox.Chips");

    React.useEffect(() => {
      ctx.setAnchorMode("chips");
      return () => ctx.setAnchorMode("none");
    }, [ctx]);

    return (
      <ComboboxInsideChipsContext.Provider value={true}>
        <Popover.Anchor asChild>
          <div
            ref={ref}
            data-slot="combobox-chips"
            className={cn(
              comboboxTriggerRowVariants({ variant: "default" }),
              "ui:h-auto ui:min-h-10 ui:flex-wrap ui:items-center ui:gap-1 ui:py-1.5",
              className,
            )}
            {...rest}
          />
        </Popover.Anchor>
      </ComboboxInsideChipsContext.Provider>
    );
  },
);
ComboboxChips.displayName = "Combobox.Chips";

export type ComboboxValueProps = {
  children: React.ReactNode | ((values: unknown[]) => React.ReactNode);
};

function ComboboxValue({ children }: ComboboxValueProps) {
  const ctx = useComboboxContext("Combobox.Value");
  const values = Array.isArray(ctx.value) ? ctx.value : [];
  if (typeof children === "function") return <>{children(values)}</>;
  return <>{children}</>;
}

export type ComboboxChipProps = React.ComponentPropsWithoutRef<"span"> & {
  showRemove?: boolean;
  onRemove?: () => void;
  /** When set (multi-select), remove clicks update the combobox value unless `onRemove` is provided. */
  value?: unknown;
};

const ComboboxChip = React.forwardRef<HTMLSpanElement, ComboboxChipProps>(
  function ComboboxChip(
    {
      className,
      children,
      showRemove = true,
      onRemove,
      value: chipValue,
      ...rest
    },
    ref,
  ) {
    const ctx = useComboboxContext("Combobox.Chip");

    const handleRemove = React.useCallback(() => {
      if (onRemove) {
        onRemove();
        return;
      }
      if (chipValue === undefined || !ctx.multiple) return;
      const cur = Array.isArray(ctx.value) ? [...ctx.value] : [];
      ctx.setValue(cur.filter((v) => !ctx.isItemEqualToValue(v, chipValue)));
    }, [chipValue, ctx, onRemove]);

    return (
      <span
        ref={ref}
        data-slot="combobox-chip"
        className={cn(comboboxChipVariants(), className)}
        {...rest}
      >
        <span className="ui:min-w-0 ui:truncate">{children}</span>
        {showRemove ? (
          <button
            type="button"
            data-slot="combobox-chip-remove"
            className="ui:inline-flex ui:size-5 ui:cursor-pointer ui:items-center ui:justify-center ui:rounded-sm ui:text-text-default ui:outline-none hover:ui:bg-background-100"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleRemove}
            aria-label="Remove"
          >
            <svg
              viewBox="0 0 24 24"
              className="ui:size-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        ) : null}
      </span>
    );
  },
);
ComboboxChip.displayName = "Combobox.Chip";

export type ComboboxChipsInputProps = Omit<
  ComboboxInputProps,
  "showTrigger" | "filterPlacement"
>;

const ComboboxChipsInput = React.forwardRef<
  HTMLInputElement,
  ComboboxChipsInputProps
>(function ComboboxChipsInput({ className, showClear, ...rest }, ref) {
  return (
    <ComboboxInput
      ref={ref}
      filterPlacement="anchor"
      showTrigger={false}
      showClear={showClear}
      className={cn(
        "ui:min-w-24 ui:flex-1 ui:border-0 ui:bg-transparent",
        className,
      )}
      {...rest}
    />
  );
});
ComboboxChipsInput.displayName = "Combobox.ChipsInput";

type ComboboxComponent = typeof ComboboxRoot & {
  Input: typeof ComboboxInput;
  Trigger: typeof ComboboxTrigger;
  Content: typeof ComboboxContent;
  List: typeof ComboboxList;
  Item: typeof ComboboxItem;
  Empty: typeof ComboboxEmpty;
  Separator: typeof ComboboxSeparator;
  Group: typeof ComboboxGroup;
  Label: typeof ComboboxLabel;
  Collection: typeof ComboboxCollection;
  Chips: typeof ComboboxChips;
  Chip: typeof ComboboxChip;
  ChipsInput: typeof ComboboxChipsInput;
  Value: typeof ComboboxValue;
};

export const Combobox = ComboboxRoot as ComboboxComponent;
Combobox.Input = ComboboxInput;
Combobox.Trigger = ComboboxTrigger;
Combobox.Content = ComboboxContent;
Combobox.List = ComboboxList;
Combobox.Item = ComboboxItem;
Combobox.Empty = ComboboxEmpty;
Combobox.Separator = ComboboxSeparator;
Combobox.Group = ComboboxGroup;
Combobox.Label = ComboboxLabel;
Combobox.Collection = ComboboxCollection;
Combobox.Chips = ComboboxChips;
Combobox.Chip = ComboboxChip;
Combobox.ChipsInput = ComboboxChipsInput;
Combobox.Value = ComboboxValue;

/** Registry-style flat exports (shadcn-style names). */
export {
  ComboboxInput,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxValue,
};
