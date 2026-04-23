import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Dialog } from "./Dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EditProfile: Story = {
  render: () => (
    <Dialog defaultOpen>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="md">
          <Button.Text>Edit profile</Button.Text>
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
        </Dialog.Header>

        <Dialog.Body>
          <Dialog.InlineField>
            <Dialog.InlineLabel htmlFor="dialog-name">Name</Dialog.InlineLabel>
            <Dialog.InlineInput id="dialog-name" defaultValue="@peduarte" />
          </Dialog.InlineField>

          <Dialog.InlineField>
            <Dialog.InlineLabel htmlFor="dialog-username">
              Username
            </Dialog.InlineLabel>
            <Dialog.InlineInput id="dialog-username" defaultValue="@peduarte" />
          </Dialog.InlineField>
        </Dialog.Body>

        <Dialog.Footer>
          <Dialog.Action>Save changes</Dialog.Action>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};
