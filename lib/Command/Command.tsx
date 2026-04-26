"use client";

import * as React from "react";
import {
  Command as CmdkCommand,
  CommandEmpty as CmdkCommandEmpty,
  CommandGroup as CmdkCommandGroup,
  CommandInput as CmdkCommandInput,
  CommandItem as CmdkCommandItem,
  CommandList as CmdkCommandList,
  CommandLoading as CmdkCommandLoading,
  CommandSeparator as CmdkCommandSeparator,
} from "cmdk";
import type { DialogProps } from "../Dialog/Dialog";
import { DialogPrimitive } from "../Dialog/Dialog";
import { cn } from "../utils/cn";
import {
  commandDialogContentVariants,
  commandDialogOverlayVariants,
  commandEmptyVariants,
  commandGroupVariants,
  commandInputInnerRowVariants,
  commandInputShellVariants,
  commandInputVariants,
  commandItemVariants,
  commandListVariants,
  commandLoadingVariants,
  commandRootVariants,
  commandSeparatorVariants,
  commandShortcutVariants,
} from "./command-variants";

function SearchGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export type CommandProps = React.ComponentPropsWithoutRef<typeof CmdkCommand>;

const CommandRoot = React.forwardRef<
  React.ComponentRef<typeof CmdkCommand>,
  CommandProps
>(function CommandRoot({ className, ...rest }, ref) {
  return (
    <CmdkCommand
      ref={ref}
      data-slot="command"
      className={cn(commandRootVariants(), className)}
      {...rest}
    />
  );
});

export type CommandInputProps = React.ComponentPropsWithoutRef<
  typeof CmdkCommandInput
>;

const CommandInput = React.forwardRef<
  React.ComponentRef<typeof CmdkCommandInput>,
  CommandInputProps
>(function CommandInput({ className, ...rest }, ref) {
  return (
    <div
      data-slot="command-input-shell"
      className={commandInputShellVariants()}
    >
      <span className="ui:pointer-events-none ui:absolute ui:left-2 ui:top-1/2 ui:size-4 ui:-translate-y-1/2 ui:text-text-default ui:opacity-50">
        <SearchGlyph className="ui:size-full" />
      </span>
      <div className={commandInputInnerRowVariants()}>
        <CmdkCommandInput
          ref={ref}
          data-slot="command-input"
          className={cn(commandInputVariants(), className)}
          {...rest}
        />
      </div>
    </div>
  );
});

export type CommandListProps = React.ComponentPropsWithoutRef<
  typeof CmdkCommandList
>;

const CommandList = React.forwardRef<
  React.ComponentRef<typeof CmdkCommandList>,
  CommandListProps
>(function CommandList({ className, ...rest }, ref) {
  return (
    <CmdkCommandList
      ref={ref}
      data-slot="command-list"
      className={cn(commandListVariants(), className)}
      {...rest}
    />
  );
});

export type CommandEmptyProps = React.ComponentPropsWithoutRef<
  typeof CmdkCommandEmpty
>;

const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof CmdkCommandEmpty>,
  CommandEmptyProps
>(function CommandEmpty({ className, ...rest }, ref) {
  return (
    <CmdkCommandEmpty
      ref={ref}
      data-slot="command-empty"
      className={cn(commandEmptyVariants(), className)}
      {...rest}
    />
  );
});

export type CommandGroupProps = React.ComponentPropsWithoutRef<
  typeof CmdkCommandGroup
>;

const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof CmdkCommandGroup>,
  CommandGroupProps
>(function CommandGroup({ className, ...rest }, ref) {
  return (
    <CmdkCommandGroup
      ref={ref}
      data-slot="command-group"
      className={cn(commandGroupVariants(), className)}
      {...rest}
    />
  );
});

export type CommandItemProps = React.ComponentPropsWithoutRef<
  typeof CmdkCommandItem
>;

const CommandItem = React.forwardRef<
  React.ComponentRef<typeof CmdkCommandItem>,
  CommandItemProps
>(function CommandItem({ className, ...rest }, ref) {
  return (
    <CmdkCommandItem
      ref={ref}
      data-slot="command-item"
      className={cn(commandItemVariants(), className)}
      {...rest}
    />
  );
});

export type CommandSeparatorProps = React.ComponentPropsWithoutRef<
  typeof CmdkCommandSeparator
>;

const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof CmdkCommandSeparator>,
  CommandSeparatorProps
>(function CommandSeparator({ className, ...rest }, ref) {
  return (
    <CmdkCommandSeparator
      ref={ref}
      data-slot="command-separator"
      className={cn(commandSeparatorVariants(), className)}
      {...rest}
    />
  );
});

export type CommandShortcutProps = React.ComponentProps<"span">;

const CommandShortcut = React.forwardRef<HTMLSpanElement, CommandShortcutProps>(
  function CommandShortcut({ className, ...rest }, ref) {
    return (
      <span
        ref={ref}
        data-slot="command-shortcut"
        className={cn(commandShortcutVariants(), className)}
        {...rest}
      />
    );
  },
);

export type CommandLoadingProps = React.ComponentPropsWithoutRef<
  typeof CmdkCommandLoading
>;

const CommandLoading = React.forwardRef<
  React.ComponentRef<typeof CmdkCommandLoading>,
  CommandLoadingProps
>(function CommandLoading({ className, ...rest }, ref) {
  return (
    <CmdkCommandLoading
      ref={ref}
      data-slot="command-loading"
      className={cn(commandLoadingVariants(), className)}
      {...rest}
    />
  );
});

/** Command palette in a dialog; dialog shell uses `Dialog`, behavior matches cmdk `CommandDialog`. */
export type CommandDialogProps = DialogProps & {
  label?: string;
  shouldFilter?: boolean;
  filter?: (value: string, search: string, keywords?: string[]) => number;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  loop?: boolean;
  disablePointerSelection?: boolean;
  vimBindings?: boolean;
  /** Passed to the inner command surface (`cmdk-root`). */
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  container?: HTMLElement;
};

const CommandDialog = React.forwardRef<HTMLDivElement, CommandDialogProps>(
  function CommandDialog(
    {
      children,
      className,
      contentClassName,
      overlayClassName,
      container,
      label,
      shouldFilter,
      filter,
      defaultValue,
      value,
      onValueChange,
      loop,
      disablePointerSelection,
      vimBindings,
      open,
      defaultOpen,
      onOpenChange,
      modal,
    },
    ref,
  ) {
    return (
      <DialogPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        modal={modal}
      >
        <DialogPrimitive.Portal container={container}>
          <DialogPrimitive.Overlay
            data-slot="command-dialog-overlay"
            data-malbec-motion="dialog-overlay"
            className={cn(commandDialogOverlayVariants(), overlayClassName)}
          />
          <DialogPrimitive.Content
            data-slot="command-dialog-content"
            data-malbec-motion="dialog-content"
            className={cn(commandDialogContentVariants(), contentClassName)}
            aria-label={label}
          >
            <CmdkCommand
              ref={ref}
              label={label}
              shouldFilter={shouldFilter}
              filter={filter}
              defaultValue={defaultValue}
              value={value}
              onValueChange={onValueChange}
              loop={loop}
              disablePointerSelection={disablePointerSelection}
              vimBindings={vimBindings}
              className={cn(commandRootVariants(), className)}
            >
              {children}
            </CmdkCommand>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  },
);

type CommandNamespace = typeof CommandRoot & {
  Input: typeof CommandInput;
  List: typeof CommandList;
  Empty: typeof CommandEmpty;
  Group: typeof CommandGroup;
  Item: typeof CommandItem;
  Separator: typeof CommandSeparator;
  Shortcut: typeof CommandShortcut;
  Loading: typeof CommandLoading;
  Dialog: typeof CommandDialog;
};

const Command = Object.assign(CommandRoot, {
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Separator: CommandSeparator,
  Shortcut: CommandShortcut,
  Loading: CommandLoading,
  Dialog: CommandDialog,
}) as CommandNamespace;

CommandRoot.displayName = "Command";
CommandInput.displayName = "Command.Input";
CommandList.displayName = "Command.List";
CommandEmpty.displayName = "Command.Empty";
CommandGroup.displayName = "Command.Group";
CommandItem.displayName = "Command.Item";
CommandSeparator.displayName = "Command.Separator";
CommandShortcut.displayName = "Command.Shortcut";
CommandLoading.displayName = "Command.Loading";
CommandDialog.displayName = "Command.Dialog";

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandLoading,
  CommandDialog,
};
