"use client";

import * as React from "react";
import { cn } from "../utils/cn";
import { textareaVariants, type TextareaVariant } from "./textarea-variants";

export type { TextareaVariant };

export type TextareaProps = React.ComponentPropsWithoutRef<"textarea"> & {
  /** `bare` for inline editing without a box. */
  variant?: TextareaVariant;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, rows = 4, variant = "default", ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        data-slot="textarea"
        data-variant={variant}
        className={cn(textareaVariants({ variant }), className)}
        {...rest}
      />
    );
  },
);
Textarea.displayName = "Textarea";
