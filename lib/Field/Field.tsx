"use client";

import * as React from "react";
import { Label } from "../Label/Label";
import type { LabelProps } from "../Label/Label";
import { cn } from "../utils/cn";
import {
  fieldDescriptionVariants,
  fieldErrorVariants,
  fieldGroupVariants,
  fieldLabelRequiredMarkVariants,
  fieldLegendVariants,
  fieldRootVariants,
  fieldSetVariants,
} from "./field-variants";

type FieldContextValue = {
  id: string;
  descriptionId: string;
  errorId: string;
  invalid: boolean;
  hasError: boolean;
};

const FieldContext = React.createContext<FieldContextValue | null>(null);

/** Internal hook so subcomponents can be optionally rendered outside a Field. */
function useOptionalFieldContext(): FieldContextValue | null {
  return React.useContext(FieldContext);
}

/**
 * Selector list (from Malbec-Management `form-field.tsx`) for focusable controls
 * that should receive `aria-invalid`. Covers native inputs and Radix-style
 * triggers used by malbec-ui Select/Combobox/etc.
 */
const FOCUSABLE_SELECTOR = [
  "input",
  "textarea",
  "select",
  'button[role="combobox"]',
  '[role="textbox"]',
  '[role="combobox"]',
  '[contenteditable="true"]',
].join(", ");

export interface FieldProps extends React.ComponentProps<"div"> {
  /** When true, focusable descendants get `aria-invalid="true"` and `data-invalid` is set on the wrapper. */
  invalid?: boolean;
  /** Optional explicit id; falls back to a generated one shared via context. */
  id?: string;
}

const FieldRoot = React.forwardRef<HTMLDivElement, FieldProps>(function FieldRoot(
  { invalid = false, id, className, children, ...rest },
  ref,
) {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const descriptionId = `${fieldId}-description`;
  const errorId = `${fieldId}-error`;

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      wrapperRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  React.useEffect(() => {
    const root = wrapperRef.current;
    if (!root) return;
    const targets = root.querySelectorAll(FOCUSABLE_SELECTOR);
    targets.forEach((el) => {
      if (invalid) {
        el.setAttribute("aria-invalid", "true");
      } else {
        el.removeAttribute("aria-invalid");
      }
    });
  }, [invalid, children]);

  const ctx = React.useMemo<FieldContextValue>(
    () => ({
      id: fieldId,
      descriptionId,
      errorId,
      invalid,
      hasError: invalid,
    }),
    [fieldId, descriptionId, errorId, invalid],
  );

  return (
    <FieldContext.Provider value={ctx}>
      <div
        ref={setRefs}
        data-slot="field"
        data-invalid={invalid ? "" : undefined}
        className={cn(fieldRootVariants(), className)}
        {...rest}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
});

export interface FieldLabelProps extends LabelProps {
  /** Append a destructive-colored asterisk after the label text. */
  required?: boolean;
}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  function FieldLabel({ required = false, children, htmlFor, ...rest }, ref) {
    const ctx = useOptionalFieldContext();
    return (
      <Label
        ref={ref}
        htmlFor={htmlFor ?? ctx?.id}
        data-slot="field-label"
        {...rest}
      >
        {children}
        {required ? (
          <span
            aria-hidden
            className={cn(fieldLabelRequiredMarkVariants())}
          >
            *
          </span>
        ) : null}
      </Label>
    );
  },
);

export type FieldDescriptionProps = React.ComponentProps<"p">;

const FieldDescription = React.forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  function FieldDescription({ id, className, ...rest }, ref) {
    const ctx = useOptionalFieldContext();
    return (
      <p
        ref={ref}
        id={id ?? ctx?.descriptionId}
        data-slot="field-description"
        className={cn(fieldDescriptionVariants(), className)}
        {...rest}
      />
    );
  },
);

export interface FieldErrorProps extends React.ComponentProps<"p"> {
  /** When false, render a non-breaking placeholder so layout stays put. */
  children?: React.ReactNode;
}

/**
 * Always renders so the field stack height is constant. When the field is not
 * invalid (or `children` is empty) the message is hidden via `invisible` and a
 * non-breaking-space keeps the line height.
 */
const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  function FieldError({ id, className, children, ...rest }, ref) {
    const ctx = useOptionalFieldContext();
    const visible = Boolean(children) && (ctx?.invalid ?? true);
    return (
      <p
        ref={ref}
        id={id ?? ctx?.errorId}
        data-slot="field-error"
        aria-hidden={visible ? undefined : true}
        className={cn(
          fieldErrorVariants(),
          !visible && "ui:invisible",
          className,
        )}
        {...rest}
      >
        {visible ? children : " "}
      </p>
    );
  },
);

export type FieldGroupProps = React.ComponentProps<"div">;

const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  function FieldGroup({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="field-group"
        className={cn(fieldGroupVariants(), className)}
        {...rest}
      />
    );
  },
);

export type FieldSetProps = React.ComponentProps<"fieldset">;

const FieldSet = React.forwardRef<HTMLFieldSetElement, FieldSetProps>(
  function FieldSet({ className, ...rest }, ref) {
    return (
      <fieldset
        ref={ref}
        data-slot="field-set"
        className={cn(fieldSetVariants(), className)}
        {...rest}
      />
    );
  },
);

export type FieldLegendProps = React.ComponentProps<"legend">;

const FieldLegend = React.forwardRef<HTMLLegendElement, FieldLegendProps>(
  function FieldLegend({ className, ...rest }, ref) {
    return (
      <legend
        ref={ref}
        data-slot="field-legend"
        className={cn(fieldLegendVariants(), className)}
        {...rest}
      />
    );
  },
);

type FieldComponent = typeof FieldRoot & {
  Label: typeof FieldLabel;
  Description: typeof FieldDescription;
  Error: typeof FieldError;
  Group: typeof FieldGroup;
  Set: typeof FieldSet;
  Legend: typeof FieldLegend;
};

export const Field = FieldRoot as FieldComponent;
Field.Label = FieldLabel;
Field.Description = FieldDescription;
Field.Error = FieldError;
Field.Group = FieldGroup;
Field.Set = FieldSet;
Field.Legend = FieldLegend;
