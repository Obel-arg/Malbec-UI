import * as React from "react";
import { cn } from "../utils/cn";
import { stepsRootVariants, stepsSegmentVariants } from "./steps-variants";

export interface StepsProps extends React.ComponentProps<"div"> {
  /** Total number of segments (e.g. 3). */
  total: number;
  /** Current step (1-based). Segments with index &lt; `value` are filled. */
  value: number;
}

const StepsRoot = React.forwardRef<HTMLDivElement, StepsProps>(
  function StepsRoot({ total, value, className, ...rest }, ref) {
    const safeTotal = Math.max(1, Math.floor(total));
    const safeValue = Math.min(
      safeTotal,
      Math.max(1, Math.floor(value)),
    );

    return (
      <div
        ref={ref}
        data-slot="steps"
        role="progressbar"
        aria-valuenow={safeValue}
        aria-valuemin={1}
        aria-valuemax={safeTotal}
        aria-label={`Step ${safeValue} of ${safeTotal}`}
        className={cn(stepsRootVariants(), className)}
        {...rest}
      >
        {Array.from({ length: safeTotal }, (_, index) => (
          <div
            key={index}
            data-slot="steps-segment"
            data-state={index < safeValue ? "active" : "inactive"}
            className={stepsSegmentVariants({
              state: index < safeValue ? "active" : "inactive",
            })}
          />
        ))}
      </div>
    );
  },
);

export const Steps = StepsRoot;
