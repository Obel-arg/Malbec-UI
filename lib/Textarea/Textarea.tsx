"use client";

import * as React from "react";
import { cn } from "../utils/cn";
import { textareaVariants } from "./textarea-variants";

export type TextareaProps = React.ComponentPropsWithoutRef<"textarea">;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, rows = 4, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        data-slot="textarea"
        className={cn(textareaVariants(), className)}
        {...rest}
      />
    );
  },
);
Textarea.displayName = "Textarea";
