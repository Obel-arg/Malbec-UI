"use client";

import * as React from "react";
import { cn } from "../utils/cn";
import {
  fileDropzoneActionVariants,
  fileDropzoneCaptionVariants,
  fileDropzoneIconVariants,
  fileDropzoneRootVariants,
} from "./file-dropzone-variants";

type FileDropzoneContextValue = {
  /** Open the native file picker. */
  openPicker: () => void;
  disabled: boolean;
};

const FileDropzoneContext =
  React.createContext<FileDropzoneContextValue | null>(null);

function useFileDropzoneContext(component: string): FileDropzoneContextValue {
  const ctx = React.useContext(FileDropzoneContext);
  if (!ctx) {
    throw new Error(
      `<${component}> must be rendered inside a <FileDropzone> component.`,
    );
  }
  return ctx;
}

const ACTION_DISPLAY_NAME = "FileDropzone.Action";

function hasActionChild(children: React.ReactNode): boolean {
  return React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type as { displayName?: string }).displayName ===
        ACTION_DISPLAY_NAME,
  );
}

export interface FileDropzoneProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Mirrors the native `multiple` attribute on the hidden `<input type="file">`. */
  multiple?: boolean;
  /** Comma-separated list forwarded to the input's `accept` attribute. */
  accept?: string;
  /** Disables interaction (click, keyboard, drag-and-drop) and dims the surface. */
  disabled?: boolean;
  /** Name forwarded to the hidden input — set when the dropzone is part of a `<form>` submission. */
  name?: string;
  /** Fires when the user selects files via the picker or drops them onto the surface. */
  onFilesSelected?: (files: File[]) => void;
}

const FileDropzoneRoot = React.forwardRef<HTMLDivElement, FileDropzoneProps>(
  function FileDropzoneRoot(
    {
      multiple = false,
      accept,
      disabled = false,
      name,
      onFilesSelected,
      className,
      children,
      onClick,
      onKeyDown,
      onDragOver,
      onDragEnter,
      onDrop,
      ...rest
    },
    ref,
  ) {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const hasAction = hasActionChild(children);

    const openPicker = React.useCallback(() => {
      if (disabled) return;
      inputRef.current?.click();
    }, [disabled]);

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        openPicker();
      },
      [onClick, openPicker],
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (hasAction) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPicker();
        }
      },
      [hasAction, onKeyDown, openPicker],
    );

    const handleDragOver = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        onDragOver?.(e);
        if (e.defaultPrevented) return;
        if (disabled) return;
        e.preventDefault();
      },
      [disabled, onDragOver],
    );

    const handleDragEnter = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        onDragEnter?.(e);
        if (e.defaultPrevented) return;
        if (disabled) return;
        e.preventDefault();
      },
      [disabled, onDragEnter],
    );

    const handleDrop = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        onDrop?.(e);
        if (e.defaultPrevented) return;
        if (disabled) return;
        e.preventDefault();
        const files = e.dataTransfer?.files;
        if (files?.length) {
          onFilesSelected?.(Array.from(files));
        }
      },
      [disabled, onDrop, onFilesSelected],
    );

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files?.length) {
          onFilesSelected?.(Array.from(files));
        }
        // Reset so reselecting the same file still fires `change`.
        e.target.value = "";
      },
      [onFilesSelected],
    );

    const ctx = React.useMemo<FileDropzoneContextValue>(
      () => ({ openPicker, disabled }),
      [openPicker, disabled],
    );

    return (
      <FileDropzoneContext.Provider value={ctx}>
        <div
          ref={ref}
          data-slot="file-dropzone"
          data-disabled={disabled || undefined}
          role={hasAction ? undefined : "button"}
          tabIndex={hasAction || disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          className={cn(fileDropzoneRootVariants(), className)}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDrop={handleDrop}
          {...rest}
        >
          {children}
          <input
            ref={inputRef}
            type="file"
            data-slot="file-dropzone-input"
            className="ui:sr-only"
            tabIndex={-1}
            aria-hidden
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            name={name}
            onChange={handleInputChange}
          />
        </div>
      </FileDropzoneContext.Provider>
    );
  },
);
FileDropzoneRoot.displayName = "FileDropzone";

export type FileDropzoneIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** When true, the icon is hidden from assistive tech (purely decorative). */
  decorative?: boolean;
};

const FileDropzoneIcon = React.forwardRef<
  HTMLSpanElement,
  FileDropzoneIconProps
>(function FileDropzoneIcon(
  { className, children, decorative = true, ...rest },
  ref,
) {
  useFileDropzoneContext("FileDropzone.Icon");
  return (
    <span
      ref={ref}
      data-slot="file-dropzone-icon"
      aria-hidden={decorative || undefined}
      className={cn(fileDropzoneIconVariants(), className)}
      {...rest}
    >
      {children}
    </span>
  );
});
FileDropzoneIcon.displayName = "FileDropzone.Icon";

export type FileDropzoneCaptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const FileDropzoneCaption = React.forwardRef<
  HTMLParagraphElement,
  FileDropzoneCaptionProps
>(function FileDropzoneCaption({ className, children, ...rest }, ref) {
  useFileDropzoneContext("FileDropzone.Caption");
  return (
    <p
      ref={ref}
      data-slot="file-dropzone-caption"
      className={cn(fileDropzoneCaptionVariants(), className)}
      {...rest}
    >
      {children}
    </p>
  );
});
FileDropzoneCaption.displayName = "FileDropzone.Caption";

export type FileDropzoneActionProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
>;

const FileDropzoneAction = React.forwardRef<
  HTMLButtonElement,
  FileDropzoneActionProps
>(function FileDropzoneAction(
  { className, children, onClick, disabled: disabledProp, ...rest },
  ref,
) {
  const { openPicker, disabled } = useFileDropzoneContext(
    "FileDropzone.Action",
  );
  const isDisabled = disabledProp ?? disabled;

  return (
    <button
      ref={ref}
      type="button"
      data-slot="file-dropzone-action"
      disabled={isDisabled}
      className={cn(fileDropzoneActionVariants(), className)}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        // Stop the root's onClick from firing a second open — the action
        // already opens the picker, no need to bubble.
        e.stopPropagation();
        openPicker();
      }}
      {...rest}
    >
      {children}
    </button>
  );
});
FileDropzoneAction.displayName = ACTION_DISPLAY_NAME;

type FileDropzoneComponent = typeof FileDropzoneRoot & {
  Icon: typeof FileDropzoneIcon;
  Caption: typeof FileDropzoneCaption;
  Action: typeof FileDropzoneAction;
};

export const FileDropzone = FileDropzoneRoot as FileDropzoneComponent;
FileDropzone.Icon = FileDropzoneIcon;
FileDropzone.Caption = FileDropzoneCaption;
FileDropzone.Action = FileDropzoneAction;
