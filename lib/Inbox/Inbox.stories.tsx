import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Archive, Bell, Check, Clock, Mail, MailOpen } from "lucide-react";
import { Button } from "../Button/Button";
import { Tooltip } from "../Tooltip/Tooltip";
import { Inbox } from "./Inbox";

const meta = {
  title: "Components/Inbox",
  component: Inbox,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Inbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const SAMPLE_TITLE = "Security Update: Token Management";
const SAMPLE_BODY =
  "Secure your integration with the new token management system to safeguard your API keys.";

/**
 * Hover-bar slot reused across the demo rows so each story stays terse and the
 * action set is consistent. Wraps `Bell` icons so the visual reads as four
 * neutral action chips at the top-right of the row when hovered.
 */
function ItemHoverBar({
  onMarkUnread,
  onMarkRead,
  onSnooze,
  onArchive,
}: {
  onMarkUnread?: () => void;
  onMarkRead?: () => void;
  onSnooze?: () => void;
  onArchive?: () => void;
}) {
  return (
    <Inbox.Item.HoverActions>
      <Inbox.Item.HoverAction
        tooltip="Mark as unread"
        active
        onClick={onMarkUnread}
      >
        <Mail className="ui:size-[14px]" />
      </Inbox.Item.HoverAction>
      <Inbox.Item.HoverAction tooltip="Mark as read" onClick={onMarkRead}>
        <MailOpen className="ui:size-[14px]" />
      </Inbox.Item.HoverAction>
      <Inbox.Item.HoverAction tooltip="Snooze" onClick={onSnooze}>
        <Clock className="ui:size-[14px]" />
      </Inbox.Item.HoverAction>
      <Inbox.Item.HoverAction tooltip="Archive" onClick={onArchive}>
        <Archive className="ui:size-[14px]" />
      </Inbox.Item.HoverAction>
    </Inbox.Item.HoverActions>
  );
}

function InboxFrame({ children }: { children: React.ReactNode }) {
  return <div className="ui:w-[440px] ui:h-[650px]">{children}</div>;
}

function DemoInbox() {
  const [tab, setTab] = React.useState("all");
  return (
    <InboxFrame>
      <Inbox
        title="Inbox"
        filterItems={[
          { value: "all", label: "All inboxes" },
          { value: "mentions", label: "Mentions" },
          { value: "assigned", label: "Assigned to me" },
        ]}
        filterValue="all"
        onFilterChange={() => {}}
        moreActions={[
          {
            value: "mark-all",
            label: "Mark all as resolved",
            icon: <Check className="ui:size-[14px]" />,
            onSelect: () => {},
          },
        ]}
      >
        <Inbox.Tabs value={tab} onValueChange={setTab}>
          <Inbox.Tab value="all" count={1}>
            Todos
          </Inbox.Tab>
          <Inbox.Tab value="unread" count="9+">
            No leídos
          </Inbox.Tab>
          <Inbox.Tab value="archived">Archivados</Inbox.Tab>
        </Inbox.Tabs>

        <Inbox.List>
          {/* Unread row, headline only (timestamp inline with unread dot). */}
          <Inbox.Item unread>
            <Inbox.Item.Avatar>
              <Bell className="ui:size-6" />
            </Inbox.Item.Avatar>
            <Inbox.Item.Content>
              <div className="ui:flex ui:flex-col ui:gap-1 ui:w-full">
                <Inbox.Item.Title>{SAMPLE_TITLE}</Inbox.Item.Title>
                <Inbox.Item.Body>{SAMPLE_BODY}</Inbox.Item.Body>
              </div>
              <Inbox.Item.Footer>Today at 9:42 AM</Inbox.Item.Footer>
            </Inbox.Item.Content>
            <ItemHoverBar />
          </Inbox.Item>

          {/* Default row with a single primary CTA. */}
          <Inbox.Item>
            <Inbox.Item.Avatar>
              <Bell className="ui:size-6" />
            </Inbox.Item.Avatar>
            <Inbox.Item.Content>
              <div className="ui:flex ui:flex-col ui:gap-1 ui:w-full">
                <Inbox.Item.Title>{SAMPLE_TITLE}</Inbox.Item.Title>
                <Inbox.Item.Body>{SAMPLE_BODY}</Inbox.Item.Body>
              </div>
              <Inbox.Item.Actions>
                <Button size="sm">Verify now</Button>
              </Inbox.Item.Actions>
              <Inbox.Item.Footer className="ui:opacity-50">
                Today at 9:42 AM
              </Inbox.Item.Footer>
            </Inbox.Item.Content>
            <ItemHoverBar />
          </Inbox.Item>

          {/* Default row with primary + secondary CTAs. */}
          <Inbox.Item>
            <Inbox.Item.Avatar>
              <Bell className="ui:size-6" />
            </Inbox.Item.Avatar>
            <Inbox.Item.Content>
              <div className="ui:flex ui:flex-col ui:gap-1 ui:w-full">
                <Inbox.Item.Title>{SAMPLE_TITLE}</Inbox.Item.Title>
                <Inbox.Item.Body>{SAMPLE_BODY}</Inbox.Item.Body>
              </div>
              <Inbox.Item.Actions>
                <Button size="sm">Primary action</Button>
                <Button size="sm" variant="outline">
                  Secondary action
                </Button>
              </Inbox.Item.Actions>
              <Inbox.Item.Footer className="ui:opacity-50">
                Today at 9:42 AM
              </Inbox.Item.Footer>
            </Inbox.Item.Content>
            <ItemHoverBar />
          </Inbox.Item>
        </Inbox.List>
      </Inbox>
    </InboxFrame>
  );
}

export const Default: Story = {
  name: "Default",
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { Archive, Bell, Check, Clock, Mail, MailOpen } from "lucide-react";
import { Button, Inbox, Tooltip } from "@obel-arg/malbec-ui";

function ItemActions() {
  return (
    <Inbox.Item.HoverActions>
      <Inbox.Item.HoverAction tooltip="Mark as unread" active>
        <Mail className="size-[14px]" />
      </Inbox.Item.HoverAction>
      <Inbox.Item.HoverAction tooltip="Mark as read">
        <MailOpen className="size-[14px]" />
      </Inbox.Item.HoverAction>
      <Inbox.Item.HoverAction tooltip="Snooze">
        <Clock className="size-[14px]" />
      </Inbox.Item.HoverAction>
      <Inbox.Item.HoverAction tooltip="Archive">
        <Archive className="size-[14px]" />
      </Inbox.Item.HoverAction>
    </Inbox.Item.HoverActions>
  );
}

function InboxExample() {
  const [tab, setTab] = useState("all");
  return (
    <Tooltip.Provider>
      <Inbox
        title="Inbox"
        filterItems={[
          { value: "all", label: "All inboxes" },
          { value: "mentions", label: "Mentions" },
          { value: "assigned", label: "Assigned to me" },
        ]}
        filterValue="all"
        onFilterChange={() => {}}
        moreActions={[
          {
            value: "mark-all",
            label: "Mark all as resolved",
            icon: <Check className="size-[14px]" />,
            onSelect: () => {},
          },
        ]}
      >
        <Inbox.Tabs value={tab} onValueChange={setTab}>
          <Inbox.Tab value="all" count={1}>
            Todos
          </Inbox.Tab>
          <Inbox.Tab value="unread" count="9+">
            No leídos
          </Inbox.Tab>
          <Inbox.Tab value="archived">Archivados</Inbox.Tab>
        </Inbox.Tabs>

        <Inbox.List>
          <Inbox.Item unread>
            <Inbox.Item.Avatar>
              <Bell className="size-6" />
            </Inbox.Item.Avatar>
            <Inbox.Item.Content>
              <div className="flex flex-col gap-1 w-full">
                <Inbox.Item.Title>Security Update: Token Management</Inbox.Item.Title>
                <Inbox.Item.Body>
                  Secure your integration with the new token management system.
                </Inbox.Item.Body>
              </div>
              <Inbox.Item.Footer>Today at 9:42 AM</Inbox.Item.Footer>
            </Inbox.Item.Content>
            <ItemActions />
          </Inbox.Item>

          <Inbox.Item>
            <Inbox.Item.Avatar>
              <Bell className="size-6" />
            </Inbox.Item.Avatar>
            <Inbox.Item.Content>
              <div className="flex flex-col gap-1 w-full">
                <Inbox.Item.Title>Security Update: Token Management</Inbox.Item.Title>
                <Inbox.Item.Body>
                  Secure your integration with the new token management system.
                </Inbox.Item.Body>
              </div>
              <Inbox.Item.Actions>
                <Button size="sm">Verify now</Button>
              </Inbox.Item.Actions>
              <Inbox.Item.Footer className="opacity-50">
                Today at 9:42 AM
              </Inbox.Item.Footer>
            </Inbox.Item.Content>
            <ItemActions />
          </Inbox.Item>

          {/* …more items (e.g. rows with primary + secondary actions) */}
        </Inbox.List>
      </Inbox>
    </Tooltip.Provider>
  );
}`,
      },
    },
  },
  render: () => (
    <Tooltip.Provider>
      <DemoInbox />
    </Tooltip.Provider>
  ),
};

export const Loading: Story = {
  name: "Loading",
  parameters: {
    docs: {
      source: {
        code: `import { Check } from "lucide-react";
import { Inbox, Tooltip } from "@obel-arg/malbec-ui";

function LoadingExample() {
  return (
    <Tooltip.Provider>
      <Inbox
        title="Inbox"
        loading
        skeletonCount={3}
        filterItems={[
          { value: "all", label: "All inboxes" },
          { value: "mentions", label: "Mentions" },
        ]}
        filterValue="all"
        moreActions={[
          {
            value: "mark-all",
            label: "Mark all as resolved",
            icon: <Check className="size-[14px]" />,
          },
        ]}
      >
        <Inbox.Tabs value="all" onValueChange={() => {}}>
          <Inbox.Tab value="all" count={1}>
            Todos
          </Inbox.Tab>
          <Inbox.Tab value="unread" count="9+">
            No leídos
          </Inbox.Tab>
          <Inbox.Tab value="archived">Archivados</Inbox.Tab>
        </Inbox.Tabs>
        {/* loading swaps list children for skeleton rows */}
        <Inbox.List>
          <Inbox.Skeleton />
        </Inbox.List>
      </Inbox>
    </Tooltip.Provider>
  );
}`,
      },
    },
  },
  render: () => (
    <Tooltip.Provider>
      <InboxFrame>
        <Inbox
          title="Inbox"
          loading
          skeletonCount={3}
          filterItems={[
            { value: "all", label: "All inboxes" },
            { value: "mentions", label: "Mentions" },
          ]}
          filterValue="all"
          moreActions={[
            {
              value: "mark-all",
              label: "Mark all as resolved",
              icon: <Check className="ui:size-[14px]" />,
            },
          ]}
        >
          <Inbox.Tabs value="all" onValueChange={() => {}}>
            <Inbox.Tab value="all" count={1}>
              Todos
            </Inbox.Tab>
            <Inbox.Tab value="unread" count="9+">
              No leídos
            </Inbox.Tab>
            <Inbox.Tab value="archived">Archivados</Inbox.Tab>
          </Inbox.Tabs>
          {/**
           * `loading` makes Inbox swap the children of `<Inbox.List>` for
           * skeleton rows, so the structure can still mirror the populated
           * variant — useful for predictable layouts when streaming in data.
           */}
          <Inbox.List>
            <Inbox.Skeleton />
          </Inbox.List>
        </Inbox>
      </InboxFrame>
    </Tooltip.Provider>
  ),
};

/** Matches the three-frame overview from Figma: loading + populated + open menu. */
export const Overview: Story = {
  name: "Overview (Figma frames)",
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { Bell, Check } from "lucide-react";
import { Inbox, Tooltip } from "@obel-arg/malbec-ui";

function PopulatedInbox() {
  const [tab, setTab] = useState("all");
  return (
    <Inbox
      title="Inbox"
      filterItems={[{ value: "all", label: "All inboxes" }]}
      filterValue="all"
      onFilterChange={() => {}}
      moreActions={[
        {
          value: "mark-all",
          label: "Mark all as resolved",
          icon: <Check className="size-[14px]" />,
          onSelect: () => {},
        },
      ]}
    >
      <Inbox.Tabs value={tab} onValueChange={setTab}>
        <Inbox.Tab value="all" count={1}>
          Todos
        </Inbox.Tab>
        <Inbox.Tab value="unread" count="9+">
          No leídos
        </Inbox.Tab>
        <Inbox.Tab value="archived">Archivados</Inbox.Tab>
      </Inbox.Tabs>
      <Inbox.List>
        <Inbox.Item unread>
          <Inbox.Item.Avatar>
            <Bell className="size-6" />
          </Inbox.Item.Avatar>
          <Inbox.Item.Content>
            <Inbox.Item.Title>Security Update: Token Management</Inbox.Item.Title>
            <Inbox.Item.Body>Secure your integration…</Inbox.Item.Body>
            <Inbox.Item.Footer>Today at 9:42 AM</Inbox.Item.Footer>
          </Inbox.Item.Content>
        </Inbox.Item>
        {/* …more items */}
      </Inbox.List>
    </Inbox>
  );
}

function LoadingInbox() {
  return (
    <Inbox
      title="Inbox"
      loading
      skeletonCount={3}
      filterItems={[{ value: "all", label: "All inboxes" }]}
      filterValue="all"
      moreActions={[
        {
          value: "mark-all",
          label: "Mark all as resolved",
          icon: <Check className="size-[14px]" />,
        },
      ]}
    >
      <Inbox.Tabs value="all" onValueChange={() => {}}>
        <Inbox.Tab value="all" count={1}>
          Todos
        </Inbox.Tab>
        <Inbox.Tab value="unread" count="9+">
          No leídos
        </Inbox.Tab>
        <Inbox.Tab value="archived">Archivados</Inbox.Tab>
      </Inbox.Tabs>
      <Inbox.List>
        <Inbox.Skeleton />
      </Inbox.List>
    </Inbox>
  );
}

function OverviewExample() {
  return (
    <Tooltip.Provider>
      <div className="flex flex-wrap gap-6">
        <LoadingInbox />
        <PopulatedInbox />
        <PopulatedInbox />
      </div>
    </Tooltip.Provider>
  );
}`,
      },
    },
  },
  render: () => (
    <Tooltip.Provider>
      <div className="ui:flex ui:flex-wrap ui:gap-6 ui:p-4">
        <InboxFrame>
          <Inbox
            title="Inbox"
            loading
            skeletonCount={3}
            filterItems={[{ value: "all", label: "All inboxes" }]}
            filterValue="all"
            moreActions={[
              {
                value: "mark-all",
                label: "Mark all as resolved",
                icon: <Check className="ui:size-[14px]" />,
              },
            ]}
          >
            <Inbox.Tabs value="all" onValueChange={() => {}}>
              <Inbox.Tab value="all" count={1}>
                Todos
              </Inbox.Tab>
              <Inbox.Tab value="unread" count="9+">
                No leídos
              </Inbox.Tab>
              <Inbox.Tab value="archived">Archivados</Inbox.Tab>
            </Inbox.Tabs>
            <Inbox.List>
              <Inbox.Skeleton />
            </Inbox.List>
          </Inbox>
        </InboxFrame>

        <DemoInbox />
        <DemoInbox />
      </div>
    </Tooltip.Provider>
  ),
};
