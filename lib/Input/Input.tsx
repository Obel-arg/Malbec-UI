import * as React from "react";
import { cn } from "../utils/cn";
import { inputVariants } from "./input-variants";

export type InputProps = React.ComponentProps<"input">;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, type = "text", ...rest }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(inputVariants(), className)}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
