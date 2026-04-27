"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { Button } from "../Button/Button";
import { Sheet } from "../Sheet/Sheet";
import { cn } from "../utils/cn";
import {
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_MOBILE,
} from "./sidebar-constants";
import {
  sidebarCollapsibleChevronVariants,
  sidebarCollapsibleWrapperVariants,
  sidebarContentVariants,
  sidebarDesktopVariants,
  sidebarFooterInnerVariants,
  sidebarFooterVariants,
  sidebarGapVariants,
  sidebarGroupContentVariants,
  sidebarGroupLabelTextVariants,
  sidebarGroupLabelVariants,
  sidebarGroupVariants,
  sidebarHeaderVariants,
  sidebarIconBoxVariants,
  sidebarInsetVariants,
  sidebarMenuButtonVariants,
  sidebarMenuItemVariants,
  sidebarMenuSubButtonVariants,
  sidebarMenuSubItemVariants,
  sidebarMenuSubRailVariants,
  sidebarMenuSubVariants,
  sidebarMenuVariants,
  sidebarProviderVariants,
  sidebarRootVariants,
  sidebarRowButtonVariants,
  sidebarRowSubtitleVariants,
  sidebarRowTextStackVariants,
  sidebarRowTitleVariants,
  sidebarSheetContentVariants,
  sidebarWorkspaceIconVariants,
  type SidebarSide,
} from "./sidebar-variants";

function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setIsMobile(mql.matches);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isMobile;
}

type SidebarContextValue = {
  defaultSide: SidebarSide;
  sidebarId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
  state: "expanded" | "collapsed";
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components -- public hook paired with compound root
export function useSidebar(): SidebarContextValue {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) {
    throw new Error(
      "useSidebar must be used within a <Sidebar.Provider> component.",
    );
  }
  return ctx;
}

const SidebarInstanceContext = React.createContext<{
  side: SidebarSide;
} | null>(null);

function useSidebarPanelSide(): SidebarSide {
  const inst = React.useContext(SidebarInstanceContext);
  const parent = React.useContext(SidebarContext);
  if (!parent) {
    throw new Error(
      "Sidebar panel parts must be used within <Sidebar.Provider>.",
    );
  }
  return inst?.side ?? parent.defaultSide;
}

export interface SidebarProviderProps extends React.ComponentProps<"div"> {
  defaultSide?: SidebarSide;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  function SidebarProvider(
    {
      defaultSide = "left",
      defaultOpen = true,
      open: openProp,
      onOpenChange,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    const isMobile = useIsMobile();
    const sidebarId = React.useId().replace(/:/g, "");
    const [openMobile, setOpenMobile] = React.useState(false);
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);

    const open = openProp ?? uncontrolledOpen;

    const setOpen = React.useCallback(
      (next: boolean) => {
        onOpenChange?.(next);
        if (openProp === undefined) {
          setUncontrolledOpen(next);
        }
      },
      [onOpenChange, openProp],
    );

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((o) => !o);
      } else {
        setOpen(!open);
      }
    }, [isMobile, open, setOpen]);

    React.useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key?.toLowerCase() !== SIDEBAR_KEYBOARD_SHORTCUT) return;
        if (!(e.metaKey || e.ctrlKey)) return;
        e.preventDefault();
        toggleSidebar();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [toggleSidebar]);

    const value = React.useMemo<SidebarContextValue>(
      () => ({
        defaultSide,
        sidebarId,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
        state: open ? "expanded" : "collapsed",
      }),
      [
        defaultSide,
        sidebarId,
        open,
        setOpen,
        openMobile,
        isMobile,
        toggleSidebar,
      ],
    );

    return (
      <SidebarContext.Provider value={value}>
        <div
          ref={ref}
          className={cn(
            sidebarProviderVariants({ side: defaultSide }),
            className,
          )}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-collapsed": SIDEBAR_WIDTH_COLLAPSED,
              "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
              ...style,
            } as React.CSSProperties
          }
          {...rest}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  },
);

export interface SidebarProps extends React.ComponentProps<"div"> {
  side?: SidebarSide;
}

const SidebarRoot = React.forwardRef<HTMLDivElement, SidebarProps>(
  function SidebarRoot({ side: sideProp, className, children, ...rest }, ref) {
    const { defaultSide, isMobile, openMobile, setOpenMobile, sidebarId, state } =
      useSidebar();
    const side = sideProp ?? defaultSide;
    const panelState = isMobile ? "expanded" : state;

    const panel = (
      <div
        ref={ref}
        id={sidebarId}
        data-slot="sidebar"
        data-side={side}
        data-state={panelState}
        className={cn(sidebarRootVariants({ side }), className)}
        {...rest}
      >
        {children}
      </div>
    );

    if (isMobile) {
      return (
        <SidebarInstanceContext.Provider value={{ side }}>
          <Sheet open={openMobile} onOpenChange={setOpenMobile}>
            <Sheet.Content
              side={side}
              unstyled
              showCloseButton={false}
              className={cn(sidebarSheetContentVariants({ side }))}
              aria-describedby={undefined}
            >
              <Sheet.Title className="ui:sr-only">Navigation menu</Sheet.Title>
              {panel}
            </Sheet.Content>
          </Sheet>
        </SidebarInstanceContext.Provider>
      );
    }

    return (
      <SidebarInstanceContext.Provider value={{ side }}>
        <div className={cn(sidebarDesktopVariants({ side }))}>{panel}</div>
      </SidebarInstanceContext.Provider>
    );
  },
);

export interface SidebarGapProps extends React.ComponentProps<"div"> {
  side?: SidebarSide;
}

const SidebarGap = React.forwardRef<HTMLDivElement, SidebarGapProps>(
  function SidebarGap({ className, side: sideProp, ...rest }, ref) {
    const { defaultSide } = useSidebar();
    const side = sideProp ?? defaultSide;
    return (
      <div
        ref={ref}
        data-slot="sidebar-gap"
        className={cn(sidebarGapVariants({ side }), className)}
        {...rest}
      />
    );
  },
);

export type SidebarTriggerProps = Omit<
  React.ComponentProps<typeof Button>,
  "variant" | "size" | "htmlType"
>;

const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  function SidebarTrigger({ className, children, onClick, ...rest }, ref) {
    const { toggleSidebar, sidebarId, isMobile, openMobile, open } =
      useSidebar();
    const expanded = isMobile ? openMobile : open;

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn("ui:shrink-0", className)}
        htmlType="button"
        aria-controls={sidebarId}
        aria-expanded={expanded}
        aria-label="Toggle sidebar"
        onClick={(e) => {
          onClick?.(e);
          toggleSidebar();
        }}
        {...rest}
      >
        {children ?? <SidebarPanelIcon />}
      </Button>
    );
  },
);

function SidebarPanelIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("ui:size-5", className)}
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
    </svg>
  );
}

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function SidebarHeader({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-header"
      className={cn(sidebarHeaderVariants(), className)}
      {...rest}
    />
  );
});

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function SidebarFooter({ className, children, ...rest }, ref) {
  const panelSide = useSidebarPanelSide();
  return (
    <div
      ref={ref}
      data-slot="sidebar-footer"
      className={cn(sidebarFooterVariants({ side: panelSide }), className)}
      {...rest}
    >
      <div className={sidebarFooterInnerVariants()}>{children}</div>
    </div>
  );
});

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function SidebarContent({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-content"
      className={cn(sidebarContentVariants(), className)}
      {...rest}
    />
  );
});

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function SidebarGroup({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-group"
      className={cn(sidebarGroupVariants(), className)}
      {...rest}
    />
  );
});

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function SidebarGroupLabel({ className, children, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-group-label"
      className={cn(sidebarGroupLabelVariants(), className)}
      {...rest}
    >
      <div className={sidebarGroupLabelTextVariants()}>{children}</div>
    </div>
  );
});

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function SidebarGroupContent({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-group-content"
      className={cn(sidebarGroupContentVariants(), className)}
      {...rest}
    />
  );
});

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(function SidebarMenu({ className, ...rest }, ref) {
  return (
    <ul
      ref={ref}
      data-slot="sidebar-menu"
      className={cn(sidebarMenuVariants(), className)}
      {...rest}
    />
  );
});

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(function SidebarMenuItem({ className, ...rest }, ref) {
  return (
    <li
      ref={ref}
      data-slot="sidebar-menu-item"
      className={cn(sidebarMenuItemVariants(), className)}
      {...rest}
    />
  );
});

export interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  isActive?: boolean;
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(function SidebarMenuButton(
  { asChild, isActive, className, type, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : (type ?? "button")}
      data-slot="sidebar-menu-button"
      data-active={isActive || undefined}
      className={cn(sidebarMenuButtonVariants({ isActive }), className)}
      {...rest}
    />
  );
});

const SidebarMenuSub = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function SidebarMenuSub({ className, children, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-menu-sub"
      className={cn(sidebarMenuSubVariants(), className)}
      {...rest}
    >
      <ul className={sidebarMenuSubRailVariants()} role="list">
        {children}
      </ul>
    </div>
  );
});

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(function SidebarMenuSubItem({ className, ...rest }, ref) {
  return (
    <li
      ref={ref}
      data-slot="sidebar-menu-sub-item"
      className={cn(sidebarMenuSubItemVariants(), className)}
      {...rest}
    />
  );
});

export interface SidebarMenuSubButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  isActive?: boolean;
}

const SidebarMenuSubButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuSubButtonProps
>(function SidebarMenuSubButton(
  { asChild, isActive, className, type, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : (type ?? "button")}
      data-slot="sidebar-menu-sub-button"
      data-active={isActive || undefined}
      className={cn(sidebarMenuSubButtonVariants({ isActive }), className)}
      {...rest}
    />
  );
});

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function SidebarInset({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-inset"
      className={cn(sidebarInsetVariants(), className)}
      {...rest}
    />
  );
});

/** Lets `Sidebar.CollapsibleTrigger` force its parent collapsible open when the sidebar expands from a collapsed click. */
const SidebarCollapsibleStateContext = React.createContext<{
  setOpen: (open: boolean) => void;
} | null>(null);

const SidebarCollapsible = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(function SidebarCollapsible(
  { className, open: openProp, defaultOpen, onOpenChange, ...rest },
  ref,
) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen ?? false,
  );
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      onOpenChange?.(next);
      if (!isControlled) setUncontrolledOpen(next);
    },
    [isControlled, onOpenChange],
  );

  const ctx = React.useMemo(() => ({ setOpen }), [setOpen]);

  return (
    <SidebarCollapsibleStateContext.Provider value={ctx}>
      <CollapsiblePrimitive.Root
        ref={ref}
        data-slot="sidebar-collapsible"
        className={cn(sidebarCollapsibleWrapperVariants(), className)}
        open={open}
        onOpenChange={setOpen}
        {...rest}
      />
    </SidebarCollapsibleStateContext.Provider>
  );
});

const SidebarCollapsibleTrigger = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(function SidebarCollapsibleTrigger({ className, onClick, ...rest }, ref) {
  const { state, isMobile, setOpen: setSidebarOpen } = useSidebar();
  const collapsible = React.useContext(SidebarCollapsibleStateContext);

  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      data-slot="sidebar-collapsible-trigger"
      className={cn("ui:group ui:cursor-pointer", className)}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (!isMobile && state === "collapsed") {
          // Skip Radix's default toggle; instead expand the sidebar and open this group.
          e.preventDefault();
          setSidebarOpen(true);
          collapsible?.setOpen(true);
        }
      }}
      {...rest}
    />
  );
});

const SidebarCollapsibleContent = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(function SidebarCollapsibleContent({ className, ...rest }, ref) {
  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      data-slot="sidebar-collapsible-content"
      className={cn(
        "ui:overflow-hidden ui:data-[state=closed]:hidden",
        className,
      )}
      {...rest}
    />
  );
});

const SidebarWorkspaceButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(function SidebarWorkspaceButton(
  { className, type = "button", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      data-slot="sidebar-workspace-button"
      className={cn(sidebarRowButtonVariants(), className)}
      {...rest}
    />
  );
});

const SidebarWorkspaceIcon = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function SidebarWorkspaceIcon({ className, ...rest }, ref) {
  const panelSide = useSidebarPanelSide();
  return (
    <div
      ref={ref}
      data-slot="sidebar-workspace-icon"
      className={cn(
        sidebarWorkspaceIconVariants({ side: panelSide }),
        className,
      )}
      {...rest}
    />
  );
});

const SidebarRowTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function SidebarRowTitle({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-row-title"
      className={cn(sidebarRowTitleVariants(), className)}
      {...rest}
    />
  );
});

const SidebarRowSubtitleRoot = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function SidebarRowSubtitle({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-row-subtitle"
      className={cn(sidebarRowSubtitleVariants(), className)}
      {...rest}
    />
  );
});

const SidebarRowTextStack = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function SidebarRowTextStack({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-row-text-stack"
      className={cn(sidebarRowTextStackVariants(), className)}
      {...rest}
    />
  );
});

const SidebarIcon = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span">
>(function SidebarIcon({ className, ...rest }, ref) {
  return (
    <span
      ref={ref}
      data-slot="sidebar-icon"
      className={cn(sidebarIconBoxVariants(), className)}
      {...rest}
    />
  );
});

const SidebarMenuChevron = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span">
>(function SidebarMenuChevron({ className, ...rest }, ref) {
  return (
    <span
      ref={ref}
      data-slot="sidebar-menu-chevron"
      className={cn(sidebarCollapsibleChevronVariants(), className)}
      {...rest}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ui:size-full"
        aria-hidden
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </span>
  );
});

type SidebarComponent = typeof SidebarRoot & {
  Provider: typeof SidebarProvider;
  Gap: typeof SidebarGap;
  Trigger: typeof SidebarTrigger;
  Header: typeof SidebarHeader;
  Footer: typeof SidebarFooter;
  Content: typeof SidebarContent;
  Group: typeof SidebarGroup;
  GroupLabel: typeof SidebarGroupLabel;
  GroupContent: typeof SidebarGroupContent;
  Menu: typeof SidebarMenu;
  MenuItem: typeof SidebarMenuItem;
  MenuButton: typeof SidebarMenuButton;
  MenuSub: typeof SidebarMenuSub;
  MenuSubItem: typeof SidebarMenuSubItem;
  MenuSubButton: typeof SidebarMenuSubButton;
  Inset: typeof SidebarInset;
  Collapsible: typeof SidebarCollapsible;
  CollapsibleTrigger: typeof SidebarCollapsibleTrigger;
  CollapsibleContent: typeof SidebarCollapsibleContent;
  WorkspaceButton: typeof SidebarWorkspaceButton;
  WorkspaceIcon: typeof SidebarWorkspaceIcon;
  RowTextStack: typeof SidebarRowTextStack;
  RowTitle: typeof SidebarRowTitle;
  RowSubtitle: typeof SidebarRowSubtitleRoot;
  Icon: typeof SidebarIcon;
  MenuChevron: typeof SidebarMenuChevron;
};

export const Sidebar = SidebarRoot as SidebarComponent;
Sidebar.Provider = SidebarProvider;
Sidebar.Gap = SidebarGap;
Sidebar.Trigger = SidebarTrigger;
Sidebar.Header = SidebarHeader;
Sidebar.Footer = SidebarFooter;
Sidebar.Content = SidebarContent;
Sidebar.Group = SidebarGroup;
Sidebar.GroupLabel = SidebarGroupLabel;
Sidebar.GroupContent = SidebarGroupContent;
Sidebar.Menu = SidebarMenu;
Sidebar.MenuItem = SidebarMenuItem;
Sidebar.MenuButton = SidebarMenuButton;
Sidebar.MenuSub = SidebarMenuSub;
Sidebar.MenuSubItem = SidebarMenuSubItem;
Sidebar.MenuSubButton = SidebarMenuSubButton;
Sidebar.Inset = SidebarInset;
Sidebar.Collapsible = SidebarCollapsible;
Sidebar.CollapsibleTrigger = SidebarCollapsibleTrigger;
Sidebar.CollapsibleContent = SidebarCollapsibleContent;
Sidebar.WorkspaceButton = SidebarWorkspaceButton;
Sidebar.WorkspaceIcon = SidebarWorkspaceIcon;
Sidebar.RowTextStack = SidebarRowTextStack;
Sidebar.RowTitle = SidebarRowTitle;
Sidebar.RowSubtitle = SidebarRowSubtitleRoot;
Sidebar.Icon = SidebarIcon;
Sidebar.MenuChevron = SidebarMenuChevron;
