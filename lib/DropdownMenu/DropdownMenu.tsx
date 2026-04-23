/* eslint-disable react-refresh/only-export-components -- compound menu: many forwardRef subcomponents, single public export */
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "../utils/cn";
import {
  dropdownMenuCheckboxIndicatorVariants,
  dropdownMenuContentVariants,
  dropdownMenuItemIconSlotVariants,
  dropdownMenuItemVariants,
  dropdownMenuLabelVariants,
  dropdownMenuRadioIndicatorVariants,
  dropdownMenuRadioItemIndicatorVariants,
  dropdownMenuSeparatorVariants,
  dropdownMenuShortcutVariants,
  dropdownMenuSubContentVariants,
  dropdownMenuSubTriggerVariants,
} from "./dropdown-menu-variants";

type DropdownMenuProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Root
>;

/**
 * Defaults `modal` to `false` so nested `Sub` / `SubContent` and pointer focus behave
 * correctly (Radix modal menu traps focus and blocks nested menus when `modal` is true).
 */
function DropdownMenuRoot({ modal = false, ...props }: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root data-slot="dropdown-menu" modal={modal} {...props} />
  );
}
DropdownMenuRoot.displayName = "DropdownMenu";

type DropdownMenuTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Trigger
>;

const DropdownMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Trigger>,
  DropdownMenuTriggerProps
>(function DropdownMenuTrigger({ className, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Trigger
      ref={ref}
      data-slot="dropdown-menu-trigger"
      className={cn(className)}
      {...rest}
    />
  );
});
DropdownMenuTrigger.displayName = "DropdownMenu.Trigger";

type DropdownMenuPortalProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Portal
>;

function DropdownMenuPortal(props: DropdownMenuPortalProps) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}
DropdownMenuPortal.displayName = "DropdownMenu.Portal";

type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;

const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(function DropdownMenuContent(
  {
    className,
    sideOffset = 4,
    collisionPadding = 8,
    ...rest
  },
  ref,
) {
  return (
    <DropdownMenuPrimitive.Content
      ref={ref}
      data-slot="dropdown-menu-content"
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      className={cn(dropdownMenuContentVariants(), className)}
      {...rest}
    />
  );
});
DropdownMenuContent.displayName = "DropdownMenu.Content";

type DropdownMenuGroupProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Group
>;

const DropdownMenuGroup = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Group>,
  DropdownMenuGroupProps
>(function DropdownMenuGroup({ className, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Group
      ref={ref}
      data-slot="dropdown-menu-group"
      className={cn(className)}
      {...rest}
    />
  );
});
DropdownMenuGroup.displayName = "DropdownMenu.Group";

type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
>;

const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(function DropdownMenuLabel({ className, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      data-slot="dropdown-menu-label"
      className={cn(dropdownMenuLabelVariants(), className)}
      {...rest}
    />
  );
});
DropdownMenuLabel.displayName = "DropdownMenu.Label";

type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
>;

const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(function DropdownMenuItem({ className, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      className={cn(dropdownMenuItemVariants(), "ui:justify-between", className)}
      {...rest}
    />
  );
});
DropdownMenuItem.displayName = "DropdownMenu.Item";

type DropdownMenuCheckboxItemProps =
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(function DropdownMenuCheckboxItem({ className, children, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="dropdown-menu-checkbox-item"
      className={cn(dropdownMenuItemVariants(), className)}
      {...rest}
    >
      <span className={dropdownMenuCheckboxIndicatorVariants()}>
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckGlyph className="ui:size-3.5" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      <span className="ui:flex ui:min-w-0 ui:flex-1 ui:items-center ui:justify-between ui:gap-2">
        {children}
      </span>
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = "DropdownMenu.CheckboxItem";

type DropdownMenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioGroup
>;

const DropdownMenuRadioGroup = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioGroup>,
  DropdownMenuRadioGroupProps
>(function DropdownMenuRadioGroup({ className, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      ref={ref}
      data-slot="dropdown-menu-radio-group"
      className={cn(className)}
      {...rest}
    />
  );
});
DropdownMenuRadioGroup.displayName = "DropdownMenu.RadioGroup";

type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioItem
>;

const DropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(function DropdownMenuRadioItem({ className, children, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      data-slot="dropdown-menu-radio-item"
      className={cn(dropdownMenuItemVariants(), className)}
      {...rest}
    >
      <span className={dropdownMenuRadioIndicatorVariants()}>
        <DropdownMenuPrimitive.ItemIndicator
          forceMount
          className={cn(dropdownMenuRadioItemIndicatorVariants())}
        >
          <span
            className="ui:pointer-events-none ui:size-2 ui:rounded-full ui:bg-text-default ui:opacity-0 ui:transition-opacity ui:group-data-[state=checked]:ui:opacity-100"
            aria-hidden
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      <span className="ui:flex ui:min-w-0 ui:flex-1 ui:items-center ui:justify-between ui:gap-2">
        {children}
      </span>
    </DropdownMenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = "DropdownMenu.RadioItem";

type DropdownMenuItemIndicatorProps =
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.ItemIndicator>;

const DropdownMenuItemIndicator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.ItemIndicator>,
  DropdownMenuItemIndicatorProps
>(function DropdownMenuItemIndicator({ className, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.ItemIndicator
      ref={ref}
      data-slot="dropdown-menu-item-indicator"
      className={cn(className)}
      {...rest}
    />
  );
});
DropdownMenuItemIndicator.displayName = "DropdownMenu.ItemIndicator";

type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
>;

const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(function DropdownMenuSeparator({ className, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      data-slot="dropdown-menu-separator"
      className={cn(dropdownMenuSeparatorVariants(), className)}
      {...rest}
    />
  );
});
DropdownMenuSeparator.displayName = "DropdownMenu.Separator";

type DropdownMenuShortcutProps = React.ComponentPropsWithoutRef<"span">;

const DropdownMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  DropdownMenuShortcutProps
>(function DropdownMenuShortcut({ className, ...rest }, ref) {
  return (
    <span
      ref={ref}
      data-slot="dropdown-menu-shortcut"
      className={cn(dropdownMenuShortcutVariants(), className)}
      {...rest}
    />
  );
});
DropdownMenuShortcut.displayName = "DropdownMenu.Shortcut";

type DropdownMenuSubProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Sub
>;

function DropdownMenuSub(props: DropdownMenuSubProps) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}
DropdownMenuSub.displayName = "DropdownMenu.Sub";

type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
>;

/**
 * Radix only arms the submenu open timer from `pointermove` with `pointerType === "mouse"`.
 * Hover often delivers `pointerenter` first with no move, so the submenu never opens until the
 * cursor wiggles. Relay a synthetic `pointermove` (`pointerType: "mouse"`) on enter so hover opens.
 */
function relaySyntheticPointerMove(
  target: HTMLElement,
  source: React.PointerEvent<Element>,
) {
  if (typeof PointerEvent === "undefined") return;
  target.dispatchEvent(
    new PointerEvent("pointermove", {
      bubbles: true,
      cancelable: true,
      composed: true,
      pointerId: source.pointerId,
      /** Match Radix `whenMouse` so the submenu open timer runs. */
      pointerType: "mouse",
      clientX: source.clientX,
      clientY: source.clientY,
      screenX: source.screenX,
      screenY: source.screenY,
      button: source.button,
      buttons: source.buttons,
    }),
  );
}

const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(function DropdownMenuSubTrigger(
  { className, children, onPointerEnter, ...rest },
  ref,
) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      data-slot="dropdown-menu-sub-trigger"
      className={cn(dropdownMenuSubTriggerVariants(), className)}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        if (event.defaultPrevented) return;
        if (event.currentTarget instanceof HTMLElement) {
          relaySyntheticPointerMove(event.currentTarget, event);
        }
      }}
      {...rest}
    >
      {children}
      <ChevronRightGlyph className="ui:ml-auto ui:size-3.5 ui:shrink-0 ui:opacity-60" />
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenu.SubTrigger";

type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
>;

const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(function DropdownMenuSubContent(
  { className, sideOffset = 4, collisionPadding = 8, ...rest },
  ref,
) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        ref={ref}
        data-slot="dropdown-menu-sub-content"
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(dropdownMenuSubContentVariants(), className)}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuSubContent.displayName = "DropdownMenu.SubContent";

/** Optional leading icon slot for items (Figma 14px + mr-2). */
function DropdownMenuItemIconSlot({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="dropdown-menu-item-icon"
      className={cn(dropdownMenuItemIconSlotVariants(), className)}
      {...rest}
    />
  );
}
DropdownMenuItemIconSlot.displayName = "DropdownMenu.ItemIcon";

function CheckGlyph(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronRightGlyph(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

type DropdownMenuNamespace = typeof DropdownMenuRoot & {
  Trigger: typeof DropdownMenuTrigger;
  Portal: typeof DropdownMenuPortal;
  Content: typeof DropdownMenuContent;
  Group: typeof DropdownMenuGroup;
  Label: typeof DropdownMenuLabel;
  Item: typeof DropdownMenuItem;
  CheckboxItem: typeof DropdownMenuCheckboxItem;
  RadioGroup: typeof DropdownMenuRadioGroup;
  RadioItem: typeof DropdownMenuRadioItem;
  ItemIndicator: typeof DropdownMenuItemIndicator;
  Separator: typeof DropdownMenuSeparator;
  Shortcut: typeof DropdownMenuShortcut;
  Sub: typeof DropdownMenuSub;
  SubTrigger: typeof DropdownMenuSubTrigger;
  SubContent: typeof DropdownMenuSubContent;
  ItemIcon: typeof DropdownMenuItemIconSlot;
};

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Trigger: DropdownMenuTrigger,
  Portal: DropdownMenuPortal,
  Content: DropdownMenuContent,
  Group: DropdownMenuGroup,
  Label: DropdownMenuLabel,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  ItemIndicator: DropdownMenuItemIndicator,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
  ItemIcon: DropdownMenuItemIconSlot,
}) as DropdownMenuNamespace;
