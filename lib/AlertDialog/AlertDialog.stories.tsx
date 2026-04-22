import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SVGProps } from "react";
import { Button } from "../Button/Button";
import { AlertDialog } from "./AlertDialog";

const BluetoothIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M6.5 6.5l11 11L12 22V2L5.5 8.5" />
  </svg>
);

/**
 * `AlertDialog` is a compound component (like `Button`). Use
 * `AlertDialog.Trigger`, `AlertDialog.Content`, `AlertDialog.Description`, …
 * or the shadcn-style `AlertDialogTrigger` / `AlertDialogDescription` exports
 * (they are the same).
 *
 * Radix: [Alert Dialog](https://ui.shadcn.com/docs/components/radix/alert-dialog).  
 * Figma: [Alert Dialog / Malbec OS](https://www.figma.com/design/xpeITaQp7zbkU4htYHvHXo/Malbec-OS-Design-System?node-id=56-602).
 */
const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MalbecDefault: Story = {
  name: "Default",
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <Button variant="outline" size="md">
          <Button.Text>Show dialog</Button.Text>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>Continue</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  ),
};

/**
 * Stacked, full-width actions (Figma `size="sm"`). Put **`AlertDialog.Action`**
 * first, then `AlertDialog.Cancel`, so the primary action sits on top.
 */
export const SizeSmall: Story = {
  name: "Size small",
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <Button variant="outline" size="md">
          <Button.Text>Small</Button.Text>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content size="sm">
        <AlertDialog.Header>
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Action>Continue</AlertDialog.Action>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  ),
};

export const WithMedia: Story = {
  name: "With media",
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <Button variant="outline" size="md">
          <Button.Text>With icon</Button.Text>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Media>
            <BluetoothIcon className="ui:size-10 ui:text-text-default" />
          </AlertDialog.Media>
          <AlertDialog.Title>Connect device</AlertDialog.Title>
          <AlertDialog.Description>
            Pair a Bluetooth accessory to use it with this application.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Not now</AlertDialog.Cancel>
          <AlertDialog.Action>Connect</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  ),
};

export const Destructive: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <Button variant="outline" size="md">
          <Button.Text>Delete</Button.Text>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Delete chat</AlertDialog.Title>
          <AlertDialog.Description>
            This will permanently remove the chat from your account. This action
            cannot be undone.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action variant="destructive">Delete</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  ),
};
