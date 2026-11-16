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
  useCommandState,
} from "cmdk";
import type { DialogProps } from "../Dialog/Dialog";
import { DialogPrimitive } from "../Dialog/Dialog";
import { useMalbecLabels } from "../i18n/MalbecLabelsProvider";
import { cn } from "../utils/cn";
import {
  commandDialogContentVariants,
  commandDialogOverlayVariants,
  commandContextVariants,
  commandEmptyVariants,
  commandFooterVariants,
  commandGroupVariants,
  commandInputShellVariants,
  commandKbdVariants,
  commandInputVariants,
  commandItemVariants,
  commandListVariants,
  commandLoadingVariants,
  commandRootVariants,
  commandSeparatorVariants,
  commandShortcutVariants,
} from "./command-variants";

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
    <div data-slot="command-input-shell" className={commandInputShellVariants()}>
      <CmdkCommandInput
        ref={ref}
        data-slot="command-input"
        className={cn(commandInputVariants(), className)}
        {...rest}
      />
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
>(function CommandEmpty({ className, children, ...rest }, ref) {
  const labels = useMalbecLabels();
  const search = useCommandState((state) => state.search);
  return (
    <CmdkCommandEmpty
      ref={ref}
      data-slot="command-empty"
      className={cn(commandEmptyVariants(), className)}
      {...rest}
    >
      {children ?? labels.commandNoResults(search)}
    </CmdkCommandEmpty>
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

export type CommandShortcutProps = React.ComponentProps<"span"> & {
  /** Keys drawn as boxed caps, e.g. `["⇧", "C"]`. Without `keys`, renders its children as text. */
  keys?: string[];
  /** The keys are pressed one after the other ("G then S"), not together. */
  sequence?: boolean;
};

const CommandShortcut = React.forwardRef<HTMLSpanElement, CommandShortcutProps>(
  function CommandShortcut({ className, keys, sequence = false, children, ...rest }, ref) {
    const labels = useMalbecLabels();
    return (
      <span
        ref={ref}
        data-slot="command-shortcut"
        className={cn(commandShortcutVariants(), className)}
        {...rest}
      >
        {keys
          ? keys.map((key, i) => (
              <React.Fragment key={`${key}-${i}`}>
                {sequence && i > 0 ? <span>{labels.keysThen}</span> : null}
                <kbd className={commandKbdVariants()}>{key}</kbd>
              </React.Fragment>
            ))
          : children}
      </span>
    );
  },
);

export type CommandContextProps = React.ComponentProps<"div">;

/** What the commands act on, as a chip above the input ("Show · Rosario · Metropolitano"). */
const CommandContext = React.forwardRef<HTMLDivElement, CommandContextProps>(
  function CommandContext({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="command-context"
        className={cn(commandContextVariants(), className)}
        {...rest}
      />
    );
  },
);

export type CommandFooterProps = React.ComponentProps<"div">;

/** Keyboard hints under the list (↑↓ navigate, ↵ open, esc close). Pass children to replace them. */
const CommandFooter = React.forwardRef<HTMLDivElement, CommandFooterProps>(
  function CommandFooter({ className, children, ...rest }, ref) {
    const labels = useMalbecLabels();
    const hint = (keys: string[], text: string) => (
      <span className="ui:inline-flex ui:items-center ui:gap-1.5">
        {keys.map((k) => (
          <kbd key={k} className={commandKbdVariants()}>
            {k}
          </kbd>
        ))}
        {text}
      </span>
    );
    return (
      <div
        ref={ref}
        data-slot="command-footer"
        className={cn(commandFooterVariants(), className)}
        {...rest}
      >
        {children ?? (
          <>
            {hint(["↑", "↓"], labels.commandNavigate)}
            {hint(["↵"], labels.commandOpen)}
            {hint(["esc"], labels.commandClose)}
          </>
        )}
      </div>
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
            className={cn(commandDialogOverlayVariants(), overlayClassName)}
          />
          <DialogPrimitive.Content
            data-slot="command-dialog-content"
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
  Context: typeof CommandContext;
  Footer: typeof CommandFooter;
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
  Context: CommandContext,
  Footer: CommandFooter,
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
CommandContext.displayName = "Command.Context";
CommandFooter.displayName = "Command.Footer";
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
