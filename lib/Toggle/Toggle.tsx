import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "../utils/cn";
import { toggleIconVariants, toggleVariants } from "./toggle-variants";
import type { ToggleSize, ToggleVariant } from "./toggle-variants";

export type ToggleProps = React.ComponentPropsWithoutRef<
  typeof TogglePrimitive.Root
> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
};

type ToggleInternalContext = {
  size: ToggleSize;
  variant: ToggleVariant;
};

const ToggleContext = React.createContext<ToggleInternalContext | null>(null);

function useToggleContext(component: string): ToggleInternalContext {
  const ctx = React.useContext(ToggleContext);
  if (!ctx) {
    throw new Error(
      `<${component}> must be rendered inside a <Toggle> component.`,
    );
  }
  return ctx;
}

const ToggleRoot = React.forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(function ToggleRoot(
  { className, variant = "default", size = "md", children, ...rest },
  ref,
) {
  const ctx = React.useMemo<ToggleInternalContext>(
    () => ({ variant, size }),
    [variant, size],
  );

  return (
    <ToggleContext.Provider value={ctx}>
      <TogglePrimitive.Root
        ref={ref}
        data-slot="toggle"
        className={cn(toggleVariants({ variant, size }), className)}
        data-variant={variant}
        data-size={size}
        {...rest}
      >
        {children}
      </TogglePrimitive.Root>
    </ToggleContext.Provider>
  );
});

export interface ToggleIconProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** When true, the icon is hidden from assistive tech (decorative). */
  decorative?: boolean;
}

const ToggleIcon = React.forwardRef<HTMLSpanElement, ToggleIconProps>(
  function ToggleIcon(
    { className, children, decorative = true, ...rest },
    ref,
  ) {
    useToggleContext("Toggle.Icon");
    return (
      <span
        ref={ref}
        className={cn(toggleIconVariants(), className)}
        aria-hidden={decorative || undefined}
        data-slot="toggle-icon"
        {...rest}
      >
        {children}
      </span>
    );
  },
);

type ToggleComponent = typeof ToggleRoot & { Icon: typeof ToggleIcon };

export const Toggle = ToggleRoot as ToggleComponent;
Toggle.Icon = ToggleIcon;

ToggleRoot.displayName = "Toggle";
ToggleIcon.displayName = "Toggle.Icon";
