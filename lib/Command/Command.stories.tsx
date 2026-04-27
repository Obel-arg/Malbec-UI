import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Button } from "../Button/Button";
import { Command, type CommandProps } from "./Command";

/**
 * `Command` is composed with namespaced parts (`Command.Input`, `Command.List`,
 * …). Registry-style flat imports (`CommandInput`, …) are also available from
 * the package entry.
 *
 * ```tsx
 * <Command>
 *   <Command.Input placeholder="Search…" />
 *   <Command.List>
 *     <Command.Group heading="Group">
 *       <Command.Item>Item</Command.Item>
 *     </Command.Group>
 *   </Command.List>
 * </Command>
 * ```
 */
const meta = {
  title: "Components/Command",
  /** Document the root surface; stories compose `Command.*` parts. */
  component: Command,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<CommandProps>;

export default meta;

type Story = StoryObj<typeof meta>;

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="ui:size-4 ui:shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function SmileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="ui:size-4 ui:shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="ui:size-4 ui:shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 10h8M8 14h8M8 18h4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="ui:size-4 ui:shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="ui:size-4 ui:shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <path d="M1 10h22" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="ui:size-4 ui:shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export const WithGroups: Story = {
  render: () => (
    <div className="ui:malbec-font-sans ui:w-[min(100vw-2rem,450px)]">
      <Command defaultValue="calendar" label="Command menu">
        <Command.Input placeholder="Do stuff or ask questions" />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            <Command.Item value="calendar">
              <span className="ui:mr-2 ui:inline-flex ui:items-center">
                <CalendarIcon />
              </span>
              Create new show
            </Command.Item>
            <Command.Item value="emoji">
              <span className="ui:mr-2 ui:inline-flex ui:items-center">
                <SmileIcon />
              </span>
              Search emoji
            </Command.Item>
            <Command.Item value="calculator" disabled>
              <span className="ui:mr-2 ui:inline-flex ui:items-center">
                <CalculatorIcon />
              </span>
              Calculator
            </Command.Item>
          </Command.Group>
          <Command.Group heading="Settings">
            <Command.Item value="profile">
              <span className="ui:mr-2 ui:inline-flex ui:items-center">
                <UserIcon />
              </span>
              Profile
            </Command.Item>
            <Command.Item value="billing">
              <span className="ui:mr-2 ui:inline-flex ui:items-center">
                <CreditCardIcon />
              </span>
              Billing
            </Command.Item>
            <Command.Item value="settings">
              <span className="ui:mr-2 ui:inline-flex ui:items-center">
                <SettingsIcon />
              </span>
              Go to settings
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  ),
};

export const InDialog: Story = {
  render: function CommandInDialog() {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="ui:malbec-font-sans">
        <Button
          htmlType="button"
          variant="secondary"
          onClick={() => setOpen(true)}
        >
          Open palette
        </Button>
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Command palette"
          defaultValue="calendar"
        >
          <Command.Input placeholder="Do stuff or ask questions" />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group heading="Suggestions">
              <Command.Item value="calendar" onSelect={() => setOpen(false)}>
                <span className="ui:mr-2 ui:inline-flex ui:items-center">
                  <CalendarIcon />
                </span>
                Create new show
              </Command.Item>
              <Command.Item value="emoji" onSelect={() => setOpen(false)}>
                <span className="ui:mr-2 ui:inline-flex ui:items-center">
                  <SmileIcon />
                </span>
                Search emoji
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command.Dialog>
      </div>
    );
  },
};
