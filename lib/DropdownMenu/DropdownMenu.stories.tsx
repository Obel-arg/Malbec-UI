import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SVGProps } from "react";
import { useState } from "react";
import { Button } from "../Button/Button";
import { DropdownMenu } from "./DropdownMenu";

const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">
          <Button.Text>Open menu</Button.Text>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="ui:w-64" align="start">
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Group>
            <DropdownMenu.Item>
              <span className="ui:flex-1">Profile</span>
              <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item disabled>
              <span className="ui:flex-1">Billing</span>
              <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <span className="ui:flex-1">Settings</span>
              <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <span className="ui:flex-1">Keyboard shortcuts</span>
              <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item>
              <span className="ui:flex-1">Team</span>
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>
                <span className="ui:flex-1 ui:text-left">Invite users</span>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent className="ui:w-48">
                <DropdownMenu.Item>
                  <span className="ui:flex-1">Email</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <span className="ui:flex-1">Message</span>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                  <span className="ui:flex-1">More…</span>
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
            <DropdownMenu.Item>
              <span className="ui:flex-1">New Team</span>
              <DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item>
              <span className="ui:flex-1">GitHub</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <span className="ui:flex-1">Support</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item disabled>
              <span className="ui:flex-1">API</span>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <span className="ui:flex-1">Log out</span>
            <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  ),
};

export const Checkboxes: Story = {
  render: function CheckboxesStory() {
    const [showPanel, setShowPanel] = useState(true);
    const [showActivity, setShowActivity] = useState(false);

    return (
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">
            <Button.Text>Notifications</Button.Text>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content align="start" className="ui:w-56">
            <DropdownMenu.Label>Appearance</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.CheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Show panel
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem
              checked={showActivity}
              onCheckedChange={setShowActivity}
            >
              Show activity
            </DropdownMenu.CheckboxItem>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>
    );
  },
};

export const Radios: Story = {
  render: function RadiosStory() {
    const [position, setPosition] = useState("bottom");

    return (
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">
            <Button.Text>Panel position</Button.Text>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content align="start" className="ui:w-56">
            <DropdownMenu.Label>Panel position</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.RadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenu.RadioItem value="top">Top</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="bottom">
                Bottom
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="right">
                Right
              </DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>
    );
  },
};

function MailGlyph(props: SVGProps<SVGSVGElement>) {
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
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function MessageSquareGlyph(props: SVGProps<SVGSVGElement>) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function PlusCircleGlyph(props: SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

export const WithSubmenu: Story = {
  name: "With icons",
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">
          <Button.Text>Actions</Button.Text>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="start" className="ui:w-48">
          <DropdownMenu.Item>
            <DropdownMenu.ItemIcon>
              <MailGlyph className="ui:size-full" />
            </DropdownMenu.ItemIcon>
            <span className="ui:flex-1">Email</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <DropdownMenu.ItemIcon>
              <MessageSquareGlyph className="ui:size-full" />
            </DropdownMenu.ItemIcon>
            <span className="ui:flex-1">Message</span>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <DropdownMenu.ItemIcon>
              <PlusCircleGlyph className="ui:size-full" />
            </DropdownMenu.ItemIcon>
            <span className="ui:flex-1">More…</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  ),
};
