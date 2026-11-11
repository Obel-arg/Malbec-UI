"use client";

import * as React from "react";
import { Lock } from "lucide-react";
import { Field } from "../Field/Field";
import { Input } from "../Input/Input";
import { Tooltip } from "../Tooltip/Tooltip";

export interface LockedFieldProps {
  id: string;
  label: React.ReactNode;
  value: string;
  /**
   * Why it is fixed. Goes in the tooltip of the lock, not as a line below; it is also tied to the
   * field (`aria-describedby`) so screen readers read it.
   */
  hint?: string;
  className?: string;
}

const lockClass = "ui:size-3.5 ui:text-text-default-muted";

/**
 * A field you can see but not edit: the same box as an `Input`, disabled, with a small lock on
 * the right. It replaces loose "🔒 value" lines, so a fixed value takes the same place and
 * geometry as the editable fields next to it. Base: Records locked-field.
 */
export function LockedField({ id, label, value, hint, className }: LockedFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <Field className={className}>
      <Field.Label htmlFor={id}>{label}</Field.Label>
      <div className="ui:relative">
        <Input
          id={id}
          value={value}
          disabled
          readOnly
          aria-describedby={hintId}
          data-slot="locked-field-input"
          className="ui:truncate ui:pr-9 ui:text-text-default-muted ui:disabled:opacity-100"
        />
        <span className="ui:absolute ui:top-1/2 ui:right-3 ui:flex ui:-translate-y-1/2">
          {hint ? (
            <Tooltip.Provider>
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <span data-slot="locked-field-lock" className="ui:flex ui:cursor-default">
                    <Lock aria-hidden className={lockClass} />
                  </span>
                </Tooltip.Trigger>
                <Tooltip.Content>{hint}</Tooltip.Content>
              </Tooltip>
            </Tooltip.Provider>
          ) : (
            <Lock aria-hidden data-slot="locked-field-lock" className={lockClass} />
          )}
        </span>
      </div>
      {hint ? (
        <span id={hintId} className="ui:sr-only">
          {hint}
        </span>
      ) : null}
    </Field>
  );
}
