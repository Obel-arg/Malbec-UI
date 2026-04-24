import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Sheet } from "./Sheet";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EditProfile: Story = {
  render: () => (
    <Sheet defaultOpen>
      <div className="ui:box-border ui:flex ui:min-h-[min(480px,calc(100svh-120px))] ui:w-full ui:max-w-4xl ui:flex-col ui:text-left">
        <div className="ui:flex ui:max-w-md ui:flex-col ui:gap-4 ui:rounded-lg ui:border ui:border-background-300 ui:bg-background-200 ui:p-6">
          <p className="ui:text-sm ui:font-medium ui:text-text-default">
            Main content stays here; the panel is fixed to the viewport edge.
          </p>
          <Sheet.Trigger asChild>
            <Button variant="outline" size="md">
              <Button.Text>Open sheet</Button.Text>
            </Button>
          </Sheet.Trigger>
        </div>
      </div>

      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Edit profile</Sheet.Title>
          <Sheet.Description>
            Make changes to your profile here. Click save when you're done.
          </Sheet.Description>
        </Sheet.Header>

        <Sheet.Body>
          <Sheet.InlineField>
            <Sheet.InlineLabel htmlFor="sheet-name">Name</Sheet.InlineLabel>
            <Sheet.InlineInput id="sheet-name" defaultValue="@peduarte" />
          </Sheet.InlineField>

          <Sheet.InlineField>
            <Sheet.InlineLabel htmlFor="sheet-username">Username</Sheet.InlineLabel>
            <Sheet.InlineInput id="sheet-username" defaultValue="@peduarte" />
          </Sheet.InlineField>
        </Sheet.Body>

        <Sheet.Footer>
          <Sheet.Action>Save changes</Sheet.Action>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  ),
};
