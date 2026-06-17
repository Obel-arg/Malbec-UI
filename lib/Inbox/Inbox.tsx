"use client";

/* eslint-disable react-refresh/only-export-components -- compound surface: many forwardRef subcomponents, single public export */
import * as React from "react";
import { Bell, ChevronDown, MoreHorizontal } from "lucide-react";
import { cn } from "../utils/cn";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { Tooltip } from "../Tooltip/Tooltip";
import {
  inboxFilterTriggerVariants,
  inboxHeaderTitleVariants,
  inboxHeaderVariants,
  inboxIconButtonVariants,
  inboxItemActionsVariants,
  inboxItemAvatarVariants,
  inboxItemBodyVariants,
  inboxItemContentVariants,
  inboxItemFooterVariants,
  inboxItemHoverActionVariants,
  inboxItemHoverBarVariants,
  inboxItemTitleRowVariants,
  inboxItemTitleVariants,
  inboxItemUnreadDotVariants,
  inboxItemVariants,
  inboxListVariants,
  inboxRootVariants,
  inboxSkeletonBlockVariants,
  inboxSkeletonRowVariants,
  inboxTabCountVariants,
  inboxTabTriggerVariants,
  inboxTabsRowVariants,
} from "./inbox-variants";

// ——— Filter dropdown (optional)

export type InboxFilterItem = {
  value: string;
  label: React.ReactNode;
};

// ——— More-actions menu (optional)

export type InboxMoreActionItem = {
  /** Unique identifier returned to `onSelect`. */
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onSelect?: () => void;
  /** When set, renders a separator above this item. */
  separatorBefore?: boolean;
};

// ——— Root

export type InboxProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Header title; defaults to `"Inbox"`. Pass `null` to hide the header. */
  title?: React.ReactNode;
  /**
   * When set, the header title becomes a `<DropdownMenu>` trigger and renders
   * a chevron next to the title. `filterValue` / `onFilterChange` drive the
   * selected item. Hidden when `filterItems` is empty / undefined.
   */
  filterItems?: InboxFilterItem[];
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  /**
   * When set, the top-right shows a "more actions" overflow icon that opens a
   * `<DropdownMenu>` with the supplied items. Hidden when empty / undefined.
   */
  moreActions?: InboxMoreActionItem[];
  /** Replaces the list with `skeletonCount` skeleton rows. */
  loading?: boolean;
  /** Number of skeleton rows to render while `loading`. Defaults to 3. */
  skeletonCount?: number;
};

type InboxContextValue = {
  loading: boolean;
};

const InboxContext = React.createContext<InboxContextValue | null>(null);

function useInboxContext(component: string): InboxContextValue {
  const ctx = React.useContext(InboxContext);
  if (!ctx) {
    throw new Error(`<${component}> must be rendered inside an <Inbox>.`);
  }
  return ctx;
}

const InboxRoot = React.forwardRef<HTMLDivElement, InboxProps>(
  function InboxRoot(
    {
      className,
      title = "Inbox",
      filterItems,
      filterValue,
      onFilterChange,
      moreActions,
      loading = false,
      skeletonCount = 3,
      children,
      ...rest
    },
    ref,
  ) {
    const value = React.useMemo<InboxContextValue>(
      () => ({ loading }),
      [loading],
    );

    /** When `loading`, replace any `<Inbox.List>` children with skeleton rows. */
    const renderedChildren = React.useMemo(() => {
      if (!loading) return children;
      return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        if (
          (child.type as { displayName?: string })?.displayName === "Inbox.List"
        ) {
          return React.cloneElement(
            child as React.ReactElement<InboxListProps>,
            {
              children: Array.from({ length: skeletonCount }, (_, i) => (
                <InboxSkeleton key={`inbox-skeleton-${i}`} />
              )),
            },
          );
        }
        return child;
      });
    }, [loading, children, skeletonCount]);

    return (
      <InboxContext.Provider value={value}>
        <div
          ref={ref}
          data-slot="inbox"
          data-loading={loading ? "true" : undefined}
          className={cn(inboxRootVariants(), className)}
          {...rest}
        >
          {title !== null ? (
            <InboxHeader
              title={title}
              filterItems={filterItems}
              filterValue={filterValue}
              onFilterChange={onFilterChange}
              moreActions={moreActions}
            />
          ) : null}
          {renderedChildren}
        </div>
      </InboxContext.Provider>
    );
  },
);
InboxRoot.displayName = "Inbox";

// ——— Header

type InboxHeaderProps = {
  title: React.ReactNode;
  filterItems?: InboxFilterItem[];
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  moreActions?: InboxMoreActionItem[];
};

function InboxHeader({
  title,
  filterItems,
  filterValue,
  onFilterChange,
  moreActions,
}: InboxHeaderProps) {
  const hasFilter = (filterItems?.length ?? 0) > 0;
  const hasMore = (moreActions?.length ?? 0) > 0;

  const titleNode = (
    <span className={cn(inboxHeaderTitleVariants())} data-slot="inbox-title">
      {title}
      {hasFilter ? (
        <ChevronDown className="ui:size-5 ui:text-text-default" aria-hidden />
      ) : null}
    </span>
  );

  return (
    <div data-slot="inbox-header" className={cn(inboxHeaderVariants())}>
      {hasFilter ? (
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className={cn(inboxFilterTriggerVariants())}
              aria-label="Filter inbox"
            >
              {titleNode}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="start" sideOffset={4}>
            <DropdownMenu.RadioGroup
              value={filterValue}
              onValueChange={(v) => onFilterChange?.(v)}
            >
              {filterItems!.map((item) => (
                <DropdownMenu.RadioItem key={item.value} value={item.value}>
                  {item.label}
                </DropdownMenu.RadioItem>
              ))}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu>
      ) : (
        titleNode
      )}
      {hasMore ? (
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className={cn(inboxIconButtonVariants())}
              aria-label="More actions"
            >
              <MoreHorizontal className="ui:size-3.5" aria-hidden />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            align="end"
            sideOffset={4}
            className="ui:min-w-37.5"
          >
            {moreActions!.map((action, i) => (
              <React.Fragment key={action.value}>
                {action.separatorBefore && i > 0 ? (
                  <DropdownMenu.Separator />
                ) : null}
                <DropdownMenu.Item
                  onSelect={() => action.onSelect?.()}
                  className="ui:gap-2"
                >
                  {action.icon ? (
                    <DropdownMenu.ItemIcon>{action.icon}</DropdownMenu.ItemIcon>
                  ) : null}
                  {action.label}
                </DropdownMenu.Item>
              </React.Fragment>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu>
      ) : null}
    </div>
  );
}
InboxHeader.displayName = "Inbox.Header";

// ——— Tabs

export type InboxTabsProps = React.ComponentProps<"div"> & {
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
};

type InboxTabsContextValue = {
  value?: string;
  onValueChange?: (value: string) => void;
};

const InboxTabsContext = React.createContext<InboxTabsContextValue | null>(
  null,
);

function useInboxTabsContext(): InboxTabsContextValue {
  const ctx = React.useContext(InboxTabsContext);
  if (!ctx) {
    throw new Error("<Inbox.Tab> must be rendered inside an <Inbox.Tabs>.");
  }
  return ctx;
}

const InboxTabs = React.forwardRef<HTMLDivElement, InboxTabsProps>(
  function InboxTabs(
    { className, value, onValueChange, children, ...rest },
    ref,
  ) {
    const ctx = React.useMemo<InboxTabsContextValue>(
      () => ({ value, onValueChange }),
      [value, onValueChange],
    );
    return (
      <InboxTabsContext.Provider value={ctx}>
        <div
          ref={ref}
          data-slot="inbox-tabs"
          role="tablist"
          className={cn(inboxTabsRowVariants(), className)}
          {...rest}
        >
          {children}
        </div>
      </InboxTabsContext.Provider>
    );
  },
);
InboxTabs.displayName = "Inbox.Tabs";

export type InboxTabProps = Omit<React.ComponentProps<"button">, "value"> & {
  value: string;
  /** Optional count chip next to the label (e.g. `1`, `9+`). */
  count?: React.ReactNode;
};

const InboxTab = React.forwardRef<HTMLButtonElement, InboxTabProps>(
  function InboxTab(
    { className, value, count, children, onClick, ...rest },
    ref,
  ) {
    const { value: selected, onValueChange } = useInboxTabsContext();
    const active = selected === value;
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={active}
        data-state={active ? "active" : "inactive"}
        data-slot="inbox-tab"
        className={cn(inboxTabTriggerVariants({ active }), className)}
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) onValueChange?.(value);
        }}
        {...rest}
      >
        <span>{children}</span>
        {count != null ? (
          <span className={cn(inboxTabCountVariants())} aria-hidden>
            {count}
          </span>
        ) : null}
      </button>
    );
  },
);
InboxTab.displayName = "Inbox.Tab";

// ——— List

export type InboxListProps = React.ComponentProps<"div">;

const InboxList = React.forwardRef<HTMLDivElement, InboxListProps>(
  function InboxList({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="inbox-list"
        className={cn(inboxListVariants(), className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
InboxList.displayName = "Inbox.List";

// ——— Item

export type InboxItemProps = React.ComponentProps<"div"> & {
  /** Renders the unread tint and the dot indicator in the title row. */
  unread?: boolean;
  /** When set, makes the row clickable / focusable and fires on activation. */
  onSelect?: () => void;
};

type InboxItemContextValue = {
  unread: boolean;
};

const InboxItemContext = React.createContext<InboxItemContextValue | null>(
  null,
);

function useInboxItemContext(): InboxItemContextValue {
  const ctx = React.useContext(InboxItemContext);
  if (!ctx) {
    throw new Error(
      "<Inbox.Item.*> components must be rendered inside an <Inbox.Item>.",
    );
  }
  return ctx;
}

const InboxItem = React.forwardRef<HTMLDivElement, InboxItemProps>(
  function InboxItem(
    {
      className,
      unread = false,
      onSelect,
      onClick,
      onKeyDown,
      tabIndex,
      role,
      children,
      ...rest
    },
    ref,
  ) {
    const interactive = Boolean(onSelect);
    const ctx = React.useMemo<InboxItemContextValue>(
      () => ({ unread }),
      [unread],
    );
    return (
      <InboxItemContext.Provider value={ctx}>
        <div
          ref={ref}
          data-slot="inbox-item"
          data-unread={unread ? "true" : undefined}
          role={role ?? (interactive ? "button" : undefined)}
          tabIndex={tabIndex ?? (interactive ? 0 : undefined)}
          className={cn(inboxItemVariants({ unread, interactive }), className)}
          onClick={(e) => {
            onClick?.(e);
            if (!e.defaultPrevented && interactive) onSelect?.();
          }}
          onKeyDown={(e) => {
            onKeyDown?.(e);
            if (
              !e.defaultPrevented &&
              interactive &&
              (e.key === "Enter" || e.key === " ")
            ) {
              e.preventDefault();
              onSelect?.();
            }
          }}
          {...rest}
        >
          {children}
        </div>
      </InboxItemContext.Provider>
    );
  },
);
InboxItem.displayName = "Inbox.Item";

export type InboxItemAvatarProps = React.ComponentProps<"div">;

const InboxItemAvatar = React.forwardRef<HTMLDivElement, InboxItemAvatarProps>(
  function InboxItemAvatar({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="inbox-item-avatar"
        className={cn(inboxItemAvatarVariants(), className)}
        {...rest}
      >
        {children ?? <Bell className="ui:size-6" aria-hidden />}
      </div>
    );
  },
);
InboxItemAvatar.displayName = "Inbox.Item.Avatar";

export type InboxItemContentProps = React.ComponentProps<"div">;

/**
 * When an `<Inbox.Item.Actions>` and an `<Inbox.Item.Footer>` are both
 * provided as direct children, Content merges them into a single horizontal
 * row (actions left, timestamp right). Mirrors the Figma layout where the
 * primary CTA and the timestamp share a baseline.
 */
const InboxItemContent = React.forwardRef<
  HTMLDivElement,
  InboxItemContentProps
>(function InboxItemContent({ className, children, ...rest }, ref) {
  const merged = React.useMemo(() => {
    const array = React.Children.toArray(children);
    let actions: React.ReactNode = null;
    let footer: React.ReactNode = null;
    const others: React.ReactNode[] = [];
    for (const child of array) {
      const name =
        React.isValidElement(child) && child.type
          ? (child.type as { displayName?: string }).displayName
          : undefined;
      if (name === "Inbox.Item.Actions" && actions === null) {
        actions = child;
        continue;
      }
      if (name === "Inbox.Item.Footer" && footer === null) {
        footer = child;
        continue;
      }
      others.push(child);
    }
    if (actions === null && footer === null) return children;
    if (actions !== null && footer !== null) {
      return (
        <>
          {others}
          <div className="ui:flex ui:items-center ui:justify-between ui:gap-3 ui:w-full">
            {actions}
            {footer}
          </div>
        </>
      );
    }
    if (footer !== null) {
      return (
        <>
          {others}
          <div className="ui:flex ui:items-center ui:justify-end ui:w-full">
            {footer}
          </div>
        </>
      );
    }
    return (
      <>
        {others}
        {actions}
      </>
    );
  }, [children]);

  return (
    <div
      ref={ref}
      data-slot="inbox-item-content"
      className={cn(inboxItemContentVariants(), className)}
      {...rest}
    >
      {merged}
    </div>
  );
});
InboxItemContent.displayName = "Inbox.Item.Content";

export type InboxItemTitleProps = React.ComponentProps<"div"> & {
  /**
   * Override the unread indicator. By default the dot is shown when the parent
   * `<Inbox.Item unread>` is set. Pass `false` to hide; pass a node to replace.
   */
  rightAdornment?: React.ReactNode | false;
};

const InboxItemTitle = React.forwardRef<HTMLDivElement, InboxItemTitleProps>(
  function InboxItemTitle(
    { className, children, rightAdornment, ...rest },
    ref,
  ) {
    const { unread } = useInboxItemContext();
    const adornment =
      rightAdornment === false
        ? null
        : (rightAdornment ?? (unread ? <InboxItemUnreadDot /> : null));
    return (
      <div className={cn(inboxItemTitleRowVariants())}>
        <div
          ref={ref}
          data-slot="inbox-item-title"
          className={cn(inboxItemTitleVariants(), className)}
          {...rest}
        >
          {children}
        </div>
        {adornment}
      </div>
    );
  },
);
InboxItemTitle.displayName = "Inbox.Item.Title";

export type InboxItemBodyProps = React.ComponentProps<"div">;

const InboxItemBody = React.forwardRef<HTMLDivElement, InboxItemBodyProps>(
  function InboxItemBody({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="inbox-item-body"
        className={cn(inboxItemBodyVariants(), className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
InboxItemBody.displayName = "Inbox.Item.Body";

export type InboxItemActionsProps = React.ComponentProps<"div">;

const InboxItemActions = React.forwardRef<
  HTMLDivElement,
  InboxItemActionsProps
>(function InboxItemActions({ className, children, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="inbox-item-actions"
      className={cn(inboxItemActionsVariants(), className)}
      {...rest}
    >
      {children}
    </div>
  );
});
InboxItemActions.displayName = "Inbox.Item.Actions";

export type InboxItemFooterProps = React.ComponentProps<"div">;

const InboxItemFooter = React.forwardRef<HTMLDivElement, InboxItemFooterProps>(
  function InboxItemFooter({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="inbox-item-footer"
        className={cn(inboxItemFooterVariants(), className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
InboxItemFooter.displayName = "Inbox.Item.Footer";

export type InboxItemUnreadDotProps = React.ComponentProps<"span">;

const InboxItemUnreadDot = React.forwardRef<
  HTMLSpanElement,
  InboxItemUnreadDotProps
>(function InboxItemUnreadDot({ className, ...rest }, ref) {
  return (
    <span
      ref={ref}
      data-slot="inbox-item-unread-dot"
      aria-label="Unread"
      className={cn(inboxItemUnreadDotVariants(), className)}
      {...rest}
    />
  );
});
InboxItemUnreadDot.displayName = "Inbox.Item.UnreadDot";

// ——— Hover-only floating action bar

export type InboxItemHoverActionsProps = React.ComponentProps<"div">;

const InboxItemHoverActions = React.forwardRef<
  HTMLDivElement,
  InboxItemHoverActionsProps
>(function InboxItemHoverActions({ className, children, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="inbox-item-hover-actions"
      className={cn(inboxItemHoverBarVariants(), className)}
      {...rest}
    >
      {children}
    </div>
  );
});
InboxItemHoverActions.displayName = "Inbox.Item.HoverActions";

export type InboxItemHoverActionProps = Omit<
  React.ComponentProps<"button">,
  "aria-label"
> & {
  /** Tooltip text — also used as the `aria-label`. */
  tooltip: string;
  /** Sticky active visual state (e.g., the currently focused action). */
  active?: boolean;
  /**
   * When `true` (default), wraps the trigger in a `<Tooltip>`. The consumer
   * must mount a single `<Tooltip.Provider>` higher in the tree.
   */
  showTooltip?: boolean;
};

const InboxItemHoverAction = React.forwardRef<
  HTMLButtonElement,
  InboxItemHoverActionProps
>(function InboxItemHoverAction(
  {
    className,
    tooltip,
    active = false,
    showTooltip = true,
    children,
    type,
    ...rest
  },
  ref,
) {
  const button = (
    <button
      ref={ref}
      type={type ?? "button"}
      aria-label={tooltip}
      data-slot="inbox-item-hover-action"
      data-active={active ? "true" : undefined}
      className={cn(inboxItemHoverActionVariants({ active }), className)}
      {...rest}
    >
      {children}
    </button>
  );

  if (!showTooltip) return button;

  return (
    <Tooltip>
      <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
      {/**
       * Dark, compact tooltip matching Figma (static black bg, 12px text,
       * tight 8px padding). Overrides the default light `Tooltip.Content`
       * surface for inbox-row hover actions only — we don't want to change
       * the project-wide tooltip skin.
       */}
      <Tooltip.Content
        side="top"
        sideOffset={6}
        className={cn(
          "ui:rounded-md ui:border-0 ui:bg-[#1a1a1a] ui:px-2 ui:py-1.5",
          "ui:text-[12px] ui:leading-none ui:text-[#f8f8f8]",
          "ui:shadow-[0_2px_2px_rgba(0,0,0,0.08),0_4px_6px_rgba(0,0,0,0.12)]",
        )}
      >
        {tooltip}
      </Tooltip.Content>
    </Tooltip>
  );
});
InboxItemHoverAction.displayName = "Inbox.Item.HoverAction";

// ——— Skeleton (loading row)

export type InboxSkeletonProps = React.ComponentProps<"div">;

const InboxSkeleton = React.forwardRef<HTMLDivElement, InboxSkeletonProps>(
  function InboxSkeleton({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="inbox-skeleton"
        aria-hidden
        className={cn(inboxSkeletonRowVariants(), className)}
        {...rest}
      >
        <div
          className={cn(
            inboxSkeletonBlockVariants(),
            "ui:size-8 ui:rounded-full ui:shrink-0",
          )}
        />
        <div className="ui:flex ui:flex-1 ui:flex-col ui:gap-1.5 ui:min-w-0">
          <div className={cn(inboxSkeletonBlockVariants(), "ui:h-3 ui:w-30")} />
          <div className="ui:flex ui:items-center ui:gap-1 ui:w-full">
            <div
              className={cn(inboxSkeletonBlockVariants(), "ui:h-3 ui:flex-1")}
            />
            <div
              className={cn(inboxSkeletonBlockVariants(), "ui:h-3 ui:flex-1")}
            />
          </div>
          <div className="ui:flex ui:items-center ui:gap-1 ui:w-full">
            <div
              className={cn(inboxSkeletonBlockVariants(), "ui:h-3 ui:flex-1")}
            />
            <div
              className={cn(inboxSkeletonBlockVariants(), "ui:h-3 ui:w-20")}
            />
          </div>
          <div
            className={cn(
              inboxSkeletonBlockVariants(),
              "ui:h-3 ui:w-30 ui:mt-2",
            )}
          />
        </div>
      </div>
    );
  },
);
InboxSkeleton.displayName = "Inbox.Skeleton";

// ——— Compose namespace

type InboxItemComponent = typeof InboxItem & {
  Avatar: typeof InboxItemAvatar;
  Content: typeof InboxItemContent;
  Title: typeof InboxItemTitle;
  Body: typeof InboxItemBody;
  Actions: typeof InboxItemActions;
  Footer: typeof InboxItemFooter;
  UnreadDot: typeof InboxItemUnreadDot;
  HoverActions: typeof InboxItemHoverActions;
  HoverAction: typeof InboxItemHoverAction;
};

const InboxItemNamespace = InboxItem as InboxItemComponent;
InboxItemNamespace.Avatar = InboxItemAvatar;
InboxItemNamespace.Content = InboxItemContent;
InboxItemNamespace.Title = InboxItemTitle;
InboxItemNamespace.Body = InboxItemBody;
InboxItemNamespace.Actions = InboxItemActions;
InboxItemNamespace.Footer = InboxItemFooter;
InboxItemNamespace.UnreadDot = InboxItemUnreadDot;
InboxItemNamespace.HoverActions = InboxItemHoverActions;
InboxItemNamespace.HoverAction = InboxItemHoverAction;

type InboxTabsComponent = typeof InboxTabs & {
  Tab: typeof InboxTab;
};

const InboxTabsNamespace = InboxTabs as InboxTabsComponent;
InboxTabsNamespace.Tab = InboxTab;

type InboxComponent = typeof InboxRoot & {
  Tabs: typeof InboxTabsNamespace;
  Tab: typeof InboxTab;
  List: typeof InboxList;
  Item: typeof InboxItemNamespace;
  Skeleton: typeof InboxSkeleton;
};

export const Inbox = InboxRoot as InboxComponent;
Inbox.Tabs = InboxTabsNamespace;
Inbox.Tab = InboxTab;
Inbox.List = InboxList;
Inbox.Item = InboxItemNamespace;
Inbox.Skeleton = InboxSkeleton;

// Reference `useInboxContext` so its loading state can be consumed by future
// extensions (e.g. a footer pager) — keeps the import warning-free today.
export function useInboxIsLoading(): boolean {
  return useInboxContext("useInboxIsLoading").loading;
}
