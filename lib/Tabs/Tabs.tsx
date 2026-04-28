"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../utils/cn";
import {
  type TabsVariant,
  tabsContentVariants,
  tabsListVariants,
  tabsTriggerVariants,
} from "./tabs-variants";

type TabsContextValue = {
  variant: TabsVariant;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

export type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  variant?: TabsVariant;
};

const TabsRoot = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  TabsProps
>(function TabsRoot({ className, variant = "segmented", ...props }, ref) {
  const ctx = React.useMemo<TabsContextValue>(() => ({ variant }), [variant]);
  return (
    <TabsContext.Provider value={ctx}>
      <TabsPrimitive.Root
        ref={ref}
        data-slot="tabs"
        data-variant={variant}
        className={cn("malbec-font-sans ui:flex ui:flex-col ui:gap-2", className)}
        {...props}
      />
    </TabsContext.Provider>
  );
});

export type TabsListProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.List
> & {
  variant?: TabsVariant;
};

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsListProps
>(function TabsList({ className, variant, ...props }, ref) {
  const parentVariant = React.useContext(TabsContext)?.variant;
  const resolvedVariant = variant ?? parentVariant ?? "segmented";

  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      data-variant={resolvedVariant}
      className={cn(tabsListVariants({ variant: resolvedVariant }), className)}
      {...props}
    />
  );
});

export type TabsTriggerProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
> & {
  variant?: TabsVariant;
};

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(function TabsTrigger({ className, variant, ...props }, ref) {
  const parentVariant = React.useContext(TabsContext)?.variant;
  const resolvedVariant = variant ?? parentVariant ?? "segmented";

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      data-variant={resolvedVariant}
      className={cn(tabsTriggerVariants({ variant: resolvedVariant }), className)}
      {...props}
    />
  );
});

export type TabsContentProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Content
>;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(function TabsContent({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      data-slot="tabs-content"
      className={cn(tabsContentVariants(), className)}
      {...props}
    />
  );
});

type TabsComponent = typeof TabsRoot & {
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Content: typeof TabsContent;
};

export const Tabs = TabsRoot as TabsComponent;
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

TabsRoot.displayName = "Tabs";
TabsList.displayName = "Tabs.List";
TabsTrigger.displayName = "Tabs.Trigger";
TabsContent.displayName = "Tabs.Content";
