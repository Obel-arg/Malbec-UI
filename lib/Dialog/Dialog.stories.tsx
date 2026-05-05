import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Combobox } from "../Combobox/Combobox";
import { Dialog } from "./Dialog";
import { Steps } from "@obel-arg/malbec-ui";

const comboboxItems = [
  "Next.js",
  "Svelte.js",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

/**
 * `Dialog.Trigger` opens `Dialog.Content` with `Dialog.Header`, `Dialog.Body` / `Dialog.InlineField`, `Dialog.Footer`.
 *
 * ```tsx
 * <Dialog>
 *   <Dialog.Trigger asChild>
 *     <Button variant="outline">…</Button>
 *   </Dialog.Trigger>
 *   <Dialog.Content>
 *     <Dialog.Header>…</Dialog.Header>
 *     <Dialog.Body>…</Dialog.Body>
 *     <Dialog.Footer>…</Dialog.Footer>
 *   </Dialog.Content>
 * </Dialog>
 * ```
 */
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
        <Steps total={3} value={1} />
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

          <Dialog.InlineField>
            <Dialog.InlineLabel htmlFor="dialog-framework">
              Framework
            </Dialog.InlineLabel>
            <div className="ui:flex-1 ui:min-w-0">
              <Combobox items={[...comboboxItems]} className="ui:w-full">
                <Combobox.Input
                  id="dialog-framework"
                  placeholder="Select a framework"
                />
                <Combobox.Content>
                  <Combobox.Empty>No items found.</Combobox.Empty>
                  <Combobox.List>
                    {(item) => (
                      <Combobox.Item key={String(item)} value={item}>
                        {String(item)}
                      </Combobox.Item>
                    )}
                  </Combobox.List>
                </Combobox.Content>
              </Combobox>
            </div>
          </Dialog.InlineField>
        </Dialog.Body>

        <Dialog.Footer className="ui:flex ui:justify-between">
          <Button
            variant="outline"
            size="lg"
            className="ui:border-background-300"
          >
            <Button.Text className="ui:text-sm">Cancel</Button.Text>
          </Button>
          <Dialog.Action>Save changes</Dialog.Action>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};
