"use client";

import * as React from "react";
import { Field } from "../Field/Field";
import { useFieldContext } from "./form-context";

function extractErrorMessage(err: unknown): string {
  if (err == null) return "";
  if (typeof err === "string") return err;
  if (
    typeof err === "object" &&
    "message" in err &&
    typeof (err as { message: unknown }).message === "string"
  ) {
    return (err as { message: string }).message;
  }
  return String(err);
}

export interface FieldLayoutProps {
  /** Renders a `<Field.Label>` above the control. */
  label?: React.ReactNode;
  /** Renders a `<Field.Description>` below the control. */
  description?: React.ReactNode;
  /** Append a destructive asterisk after the label. */
  required?: boolean;
  /** The control(s) — typically your `<Input>` / `<Select>` / etc. */
  children: React.ReactNode;
}

/**
 * Typed layout wrapper accessed inside `form.AppField` as `field.Field`. Reads
 * the field's error state from TanStack's field context and renders the
 * standard label + control + description + error layout via the headless
 * `Field` primitives.
 */
export function FieldLayout({
  label,
  description,
  required,
  children,
}: FieldLayoutProps) {
  const field = useFieldContext();
  const errors = field.state.meta.errors as unknown[];
  const isVisible = field.state.meta.isTouched || field.state.meta.isBlurred;
  const showError = isVisible && errors.length > 0;
  const message = showError ? extractErrorMessage(errors[0]) : "";

  return (
    <Field invalid={showError} id={field.name}>
      {label !== undefined ? (
        <Field.Label required={required}>{label}</Field.Label>
      ) : null}
      {children}
      {description !== undefined ? (
        <Field.Description>{description}</Field.Description>
      ) : null}
      <Field.Error>{message || null}</Field.Error>
    </Field>
  );
}
