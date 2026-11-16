import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Popover } from "../Popover/Popover";
import { NotificationBell } from "./NotificationBell";

/**
 * The header bell (malbec-ux-ui `campanita-inbox.md`). Up to date it is an outline; with unread
 * notifications it fills in ink, its sound waves come out and a dot shows. A rise of `unreadCount`
 * is an arrival: the bell shakes and the dot pops in again. The halo stops while the inbox is open.
 *
 * ```tsx
 * <Popover open={open} onOpenChange={setOpen}>
 *   <Popover.Trigger asChild>
 *     <NotificationBell unreadCount={unreadCount} />
 *   </Popover.Trigger>
 *   <Popover.Content align="end">{inbox}</Popover.Content>
 * </Popover>
 * ```
 */
const meta = {
  title: "Components/NotificationBell",
  component: NotificationBell,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { unreadCount: 0 },
} satisfies Meta<typeof NotificationBell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { NotificationBell } from "@obel-arg/malbec-ui";

<NotificationBell unreadCount={0} />
<NotificationBell unreadCount={3} />`,
      },
    },
  },
  render: () => (
    <div className="ui:flex ui:items-center ui:gap-4">
      <NotificationBell unreadCount={0} />
      <NotificationBell unreadCount={3} />
    </div>
  ),
};

function ArrivalDemo() {
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <div className="ui:flex ui:items-center ui:gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <NotificationBell unreadCount={unread} />
        </Popover.Trigger>
        <Popover.Content align="end" className="ui:w-64 ui:text-sm">
          {unread} sin leer
        </Popover.Content>
      </Popover>
      <Button variant="outline" onClick={() => setUnread((n) => n + 1)}>
        Llega un aviso
      </Button>
      <Button variant="ghost" onClick={() => setUnread(0)}>
        Marcar todo como leído
      </Button>
    </div>
  );
}

export const InHeader: Story = {
  name: "With the inbox popover",
  parameters: {
    docs: {
      source: {
        code: `import { NotificationBell, Popover } from "@obel-arg/malbec-ui";

function HeaderBell({ unreadCount }: { unreadCount: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <NotificationBell unreadCount={unreadCount} />
      </Popover.Trigger>
      <Popover.Content align="end">{/* inbox */}</Popover.Content>
    </Popover>
  );
}`,
      },
    },
  },
  render: () => <ArrivalDemo />,
};
