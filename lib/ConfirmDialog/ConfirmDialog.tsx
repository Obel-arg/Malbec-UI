"use client";

import * as React from "react";
import { AlertDialog, type AlertDialogSize } from "../AlertDialog/AlertDialog";
import { Field } from "../Field/Field";
import { useMalbecLabels } from "../i18n/MalbecLabelsProvider";
import { Textarea, type TextareaProps } from "../Textarea/Textarea";

export interface ConfirmDialogProps {
  /** Controlled open state. Leave it out with `trigger` and the dialog handles it. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Element that opens the dialog (rendered as `AlertDialog.Trigger asChild`), so the consumer
   * doesn't keep `open` state just to show it.
   */
  trigger?: React.ReactElement;
  /** `sm` for the compact dialog. @default "default" */
  size?: AlertDialogSize;
  title: React.ReactNode;
  description?: React.ReactNode;
  /**
   * Runs on confirm. Async work keeps the dialog open with both buttons disabled. It closes when
   * it settles, except when it returns (or resolves to) `false` or throws (rejects): then it stays
   * open to retry, and you show why with `error`. With `requireReason`, receives the trimmed reason.
   */
  onConfirm: (reason?: string) => void | boolean | Promise<void | boolean>;
  /** `destructive` paints the confirm button red (deleting, rejecting). @default "default" */
  tone?: "default" | "destructive";
  /**
   * Asks for the reason before confirming (rejections). Confirm stays enabled: with an empty reason
   * it marks the field invalid and says why, instead of a disabled button that says nothing.
   */
  requireReason?: boolean;
  /** Message under the description, e.g. why the last confirm failed. */
  error?: React.ReactNode;
  confirmLabel?: React.ReactNode;
  /** Confirm button text while `onConfirm` runs ("Eliminando…"). Defaults to the `confirming` label. */
  confirmingLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  reasonLabel?: React.ReactNode;
  reasonPlaceholder?: string;
  /** Help under the reason field ("Lo ve el proveedor."). */
  reasonHint?: React.ReactNode;
  /** Extra props for the reason `Textarea` (`maxLength`, `rows`, `autoFocus`…). */
  reasonProps?: Omit<TextareaProps, "id" | "value" | "defaultValue" | "onChange" | "disabled">;
}

/**
 * A confirmation on top of `AlertDialog`: title, optional description, cancel and confirm, with the
 * pending state of an async confirm handled for you (from Records' `ConfirmDialog`).
 */
export function ConfirmDialog({
  open: openProp,
  onOpenChange,
  trigger,
  size,
  title,
  description,
  onConfirm,
  tone = "default",
  requireReason = false,
  error,
  confirmLabel,
  confirmingLabel,
  cancelLabel,
  reasonLabel,
  reasonPlaceholder,
  reasonHint,
  reasonProps,
}: ConfirmDialogProps) {
  const labels = useMalbecLabels();
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = openProp ?? uncontrolledOpen;
  const [pending, setPending] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [attempted, setAttempted] = React.useState(false);
  const missingReason = requireReason && reason.trim() === "";
  const reasonId = React.useId();
  const fieldId = React.useId();

  const setOpen = (next: boolean) => {
    if (pending) return;
    if (!next) {
      setReason("");
      setAttempted(false);
    }
    if (openProp === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const confirm = async (event: React.MouseEvent) => {
    // AlertDialog.Action closes on click; the dialog closes only after onConfirm settles.
    event.preventDefault();
    if (missingReason) {
      setAttempted(true);
      return;
    }
    setPending(true);
    try {
      const result = await onConfirm(requireReason ? reason.trim() : undefined);
      setPending(false);
      // `false` means "didn't go through": stay open, like a rejection.
      if (result !== false) setOpen(false);
    } catch {
      // The consumer reports the failure through `error`; the dialog stays open to retry.
      setPending(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger ? <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger> : null}
      <AlertDialog.Content size={size} aria-busy={pending || undefined}>
        <AlertDialog.Header>
          <AlertDialog.Title>{title}</AlertDialog.Title>
          {description ? <AlertDialog.Description>{description}</AlertDialog.Description> : null}
          {error ? (
            <p role="alert" className="ui:text-sm ui:font-medium ui:text-destructive">
              {error}
            </p>
          ) : null}
        </AlertDialog.Header>
        {requireReason ? (
          <Field id={fieldId} invalid={attempted && missingReason}>
            <Field.Label htmlFor={reasonId}>{reasonLabel ?? labels.reason}</Field.Label>
            <Textarea
              {...reasonProps}
              aria-describedby={
                [reasonProps?.["aria-describedby"], reasonHint ? `${fieldId}-description` : null, `${fieldId}-error`]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
              id={reasonId}
              value={reason}
              placeholder={reasonPlaceholder}
              disabled={pending}
              onChange={(e) => setReason(e.target.value)}
            />
            {reasonHint ? <Field.Description>{reasonHint}</Field.Description> : null}
            <Field.Error>{attempted && missingReason ? labels.reasonRequired : null}</Field.Error>
          </Field>
        ) : null}
        <AlertDialog.Footer>
          <AlertDialog.Cancel disabled={pending}>{cancelLabel ?? labels.cancel}</AlertDialog.Cancel>
          <AlertDialog.Action
            variant={tone === "destructive" ? "destructive" : "default"}
            disabled={pending}
            onClick={confirm}
          >
            {pending ? (confirmingLabel ?? labels.confirming) : (confirmLabel ?? labels.confirm)}
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
