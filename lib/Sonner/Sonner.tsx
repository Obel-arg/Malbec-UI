"use client";

import * as React from "react";
import { Toaster, toast, type ToasterProps } from "sonner";
import { useTheme } from "../theme";
import { cn } from "../utils/cn";
import {
  mergeSonnerToastClassNames,
  sonnerDefaultToastClassNames,
  sonnerToasterStyle,
} from "./sonner-variants";

export type SonnerProps = Omit<ToasterProps, "theme">;

const SonnerRoot = React.forwardRef<HTMLElement, SonnerProps>(function SonnerRoot(
  { className, style, toastOptions, ...rest },
  ref,
) {
  const { resolvedMode } = useTheme();
  return (
    <Toaster
      ref={ref}
      theme={resolvedMode}
      className={cn("malbec-font-sans", className)}
      style={{ ...sonnerToasterStyle, ...style }}
      toastOptions={{
        ...toastOptions,
        classNames: mergeSonnerToastClassNames(
          sonnerDefaultToastClassNames,
          toastOptions?.classNames,
        ),
      }}
      {...rest}
    />
  );
});

type SonnerComponent = typeof SonnerRoot & { toast: typeof toast };

export const Sonner = SonnerRoot as SonnerComponent;
Sonner.toast = toast;
