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
  render: () => (
    <Tooltip.Provider>
      <DemoInbox />
    </Tooltip.Provider>
  ),
};

export const Loading: Story = {
  name: "Loading",
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
