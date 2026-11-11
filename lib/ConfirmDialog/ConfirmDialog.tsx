"use client";

import * as React from "react";
import { AlertDialog } from "../AlertDialog/AlertDialog";
import { Field } from "../Field/Field";
import { useMalbecLabels } from "../i18n/MalbecLabelsProvider";
import { Textarea } from "../Textarea/Textarea";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  /**
   * Runs on confirm. Async work keeps the dialog open with both buttons disabled; it closes when
   * the promise resolves and stays open if it rejects (show the failure with `error`).
   * With `requireReason`, receives the trimmed reason.
   */
  onConfirm: (reason?: string) => void | Promise<void>;
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
  cancelLabel?: React.ReactNode;
  reasonLabel?: React.ReactNode;
  reasonPlaceholder?: string;
}

/**
 * A confirmation on top of `AlertDialog`: title, optional description, cancel and confirm, with the
 * pending state of an async confirm handled for you (from Records' `ConfirmDialog`).
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  tone = "default",
  requireReason = false,
  error,
  confirmLabel,
  cancelLabel,
  reasonLabel,
  reasonPlaceholder,
}: ConfirmDialogProps) {
  const labels = useMalbecLabels();
  const [pending, setPending] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [attempted, setAttempted] = React.useState(false);
  const missingReason = requireReason && reason.trim() === "";
  const reasonId = React.useId();

  const setOpen = (next: boolean) => {
    if (pending) return;
    if (!next) {
      setReason("");
      setAttempted(false);
    }
    onOpenChange(next);
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
      await onConfirm(requireReason ? reason.trim() : undefined);
      setPending(false);
      setOpen(false);
    } catch {
      // The consumer reports the failure through `error`; the dialog stays open to retry.
      setPending(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialog.Content aria-busy={pending || undefined}>
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
          <Field invalid={attempted && missingReason}>
            <Field.Label htmlFor={reasonId}>{reasonLabel ?? labels.reason}</Field.Label>
            <Textarea
              id={reasonId}
              value={reason}
              placeholder={reasonPlaceholder}
              disabled={pending}
              onChange={(e) => setReason(e.target.value)}
            />
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
            {pending ? labels.confirming : (confirmLabel ?? labels.confirm)}
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
