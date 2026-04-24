import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../Avatar/Avatar";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { cn } from "../utils/cn";
import { Sidebar, type SidebarProps } from "./Sidebar";

/**
 * Compound layout: `Sidebar.Provider` → `Sidebar.Gap` → `Sidebar` + `Sidebar.Inset`.
 * Mobile navigation opens in a sheet; desktop uses a sticky column.
 */
const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<SidebarProps>;

export default meta;

type Story = StoryObj<typeof meta>;

function IconBookOpen(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function IconTerminal(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="m7 11 2 2 4-4" />
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <path d="M12 19v2" />
    </svg>
  );
}

function IconBot(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function IconTicket(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  );
}

function IconSettings2(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M20 7h-9" />
      <path d="M14 17H5" />
      <circle cx="17" cy="17" r="3" />
      <circle cx="7" cy="7" r="3" />
    </svg>
  );
}

function IconChevronRight(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function IconChevronsUpDown(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  );
}

function IconGalleryVertical(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M10 3h4" />
      <path d="M12 3v18" />
      <rect width="18" height="8" x="3" y="8" rx="1" />
    </svg>
  );
}

function IconSparkles(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}

function IconBadgeCheck(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconCreditCard(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

function IconBell(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function IconLogOut(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function IconPlus(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function IconWaveform(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M3 12h4l3-9 4 18 3-9h4" />
    </svg>
  );
}

function IconCommand(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  );
}

function TeamMenuIconBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "ui:flex ui:size-8 ui:shrink-0 ui:items-center ui:justify-center ui:rounded-lg ui:bg-background-200",
        className,
      )}
    >
      {children}
    </span>
  );
}

function sidebarMenuFlipSide(side: "left" | "right"): "left" | "right" {
  return side === "left" ? "right" : "left";
}

function SidebarDemo({ side }: { side: "left" | "right" }) {
  const menuSide = sidebarMenuFlipSide(side);

  return (
    <Sidebar.Provider defaultSide={side} className="ui:min-h-svh">
      <Sidebar.Gap side={side}>
        <Sidebar side={side}>
          <Sidebar.Header>
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Sidebar.WorkspaceButton type="button">
                  <Sidebar.WorkspaceIcon>
                    <IconGalleryVertical />
                  </Sidebar.WorkspaceIcon>
                  <Sidebar.RowTextStack>
                    <Sidebar.RowTitle>Acme Inc</Sidebar.RowTitle>
                    <Sidebar.RowSubtitle>Enterprise</Sidebar.RowSubtitle>
                  </Sidebar.RowTextStack>
                  <Sidebar.Icon className="ui:ml-auto">
                    <IconChevronsUpDown />
                  </Sidebar.Icon>
                </Sidebar.WorkspaceButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="ui:w-64"
                  side={menuSide}
                  align="start"
                  sideOffset={8}
                >
                  <DropdownMenu.Label className="ui:text-text-default-muted ui:font-normal">
                    Teams
                  </DropdownMenu.Label>
                  <DropdownMenu.Group>
                    <DropdownMenu.Item>
                      <TeamMenuIconBox>
                        <IconGalleryVertical className="ui:size-4" />
                      </TeamMenuIconBox>
                      <span className="ui:flex-1">Acme Inc</span>
                      <DropdownMenu.Shortcut>⌘1</DropdownMenu.Shortcut>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <TeamMenuIconBox>
                        <IconWaveform className="ui:size-4" />
                      </TeamMenuIconBox>
                      <span className="ui:flex-1">Acme Corp.</span>
                      <DropdownMenu.Shortcut>⌘2</DropdownMenu.Shortcut>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <TeamMenuIconBox>
                        <IconCommand className="ui:size-4" />
                      </TeamMenuIconBox>
                      <span className="ui:flex-1">Evil Corp.</span>
                      <DropdownMenu.Shortcut>⌘3</DropdownMenu.Shortcut>
                    </DropdownMenu.Item>
                  </DropdownMenu.Group>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>
                    <TeamMenuIconBox>
                      <IconPlus className="ui:size-4" />
                    </TeamMenuIconBox>
                    <span className="ui:flex-1">Add team</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
              <Sidebar.GroupContent>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton type="button">
                      <Sidebar.Icon>
                        <IconBookOpen />
                      </Sidebar.Icon>
                      <span>Project Hub</span>
                      <Sidebar.Icon className="ui:ml-auto">
                        <IconChevronRight />
                      </Sidebar.Icon>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.Collapsible defaultOpen>
                      <Sidebar.CollapsibleTrigger asChild>
                        <Sidebar.MenuButton type="button">
                          <Sidebar.Icon>
                            <IconTerminal />
                          </Sidebar.Icon>
                          <span>Business</span>
                          <Sidebar.MenuChevron className="ui:ml-auto" />
                        </Sidebar.MenuButton>
                      </Sidebar.CollapsibleTrigger>
                      <Sidebar.CollapsibleContent>
                        <Sidebar.MenuSub>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton type="button">P&L</Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton type="button">Payments</Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton type="button">Billing</Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                        </Sidebar.MenuSub>
                      </Sidebar.CollapsibleContent>
                    </Sidebar.Collapsible>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton type="button">
                      <Sidebar.Icon>
                        <IconBot />
                      </Sidebar.Icon>
                      <span>Operations</span>
                      <Sidebar.Icon className="ui:ml-auto">
                        <IconChevronRight />
                      </Sidebar.Icon>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton type="button">
                      <Sidebar.Icon>
                        <IconTicket />
                      </Sidebar.Icon>
                      <span>Ticketing</span>
                      <Sidebar.Icon className="ui:ml-auto">
                        <IconChevronRight />
                      </Sidebar.Icon>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton type="button">
                      <Sidebar.Icon>
                        <IconSettings2 />
                      </Sidebar.Icon>
                      <span>System</span>
                      <Sidebar.Icon className="ui:ml-auto">
                        <IconChevronRight />
                      </Sidebar.Icon>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          </Sidebar.Content>
          <Sidebar.Footer>
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Sidebar.WorkspaceButton type="button">
                  <Avatar className="ui:size-8 ui:rounded-lg ui:shrink-0" size="sm">
                    <Avatar.Image
                      alt=""
                      src="https://avatars.githubusercontent.com/u/124599?v=4"
                    />
                    <Avatar.Fallback>CN</Avatar.Fallback>
                  </Avatar>
                  <Sidebar.RowTextStack>
                    <Sidebar.RowTitle>shadcn</Sidebar.RowTitle>
                    <Sidebar.RowSubtitle>m@example.com</Sidebar.RowSubtitle>
                  </Sidebar.RowTextStack>
                  <Sidebar.Icon className="ui:ml-auto">
                    <IconChevronsUpDown />
                  </Sidebar.Icon>
                </Sidebar.WorkspaceButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="ui:w-64"
                  side={menuSide}
                  align="end"
                  sideOffset={8}
                >
                  <div className="ui:flex ui:gap-2 ui:px-2 ui:py-2">
                    <Avatar className="ui:size-10 ui:rounded-lg ui:shrink-0" size="sm">
                      <Avatar.Image
                        alt=""
                        src="https://avatars.githubusercontent.com/u/124599?v=4"
                      />
                      <Avatar.Fallback>CN</Avatar.Fallback>
                    </Avatar>
                    <div className="ui:flex ui:min-w-0 ui:flex-1 ui:flex-col ui:justify-center ui:gap-0.5">
                      <span className="ui:truncate ui:text-sm ui:font-semibold ui:text-text-default">
                        shadcn
                      </span>
                      <span className="ui:truncate ui:text-xs ui:text-text-default-muted">
                        m@example.com
                      </span>
                    </div>
                  </div>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>
                    <IconSparkles className="ui:size-4 ui:shrink-0" />
                    <span className="ui:flex-1">Upgrade to Pro</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Group>
                    <DropdownMenu.Item>
                      <IconBadgeCheck className="ui:size-4 ui:shrink-0" />
                      <span className="ui:flex-1">Account</span>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <IconCreditCard className="ui:size-4 ui:shrink-0" />
                      <span className="ui:flex-1">Billing</span>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <IconBell className="ui:size-4 ui:shrink-0" />
                      <span className="ui:flex-1">Notifications</span>
                    </DropdownMenu.Item>
                  </DropdownMenu.Group>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>
                    <IconLogOut className="ui:size-4 ui:shrink-0" />
                    <span className="ui:flex-1">Log out</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu>
          </Sidebar.Footer>
        </Sidebar>
        <Sidebar.Inset>
          <header className="ui:flex ui:h-14 ui:items-center ui:border-b ui:border-background-300 ui:px-4">
            <Sidebar.Trigger className="ui:md:hidden" />
            <span className="ui:ml-2 ui:text-sm ui:font-medium ui:text-text-default ui:md:ml-0">
              Main
            </span>
          </header>
          <div className="ui:flex ui:flex-1 ui:items-center ui:justify-center ui:p-8 ui:text-text-default-muted">
            Content area
          </div>
        </Sidebar.Inset>
      </Sidebar.Gap>
    </Sidebar.Provider>
  );
}

export const Left: Story = {
  render: () => <SidebarDemo side="left" />,
};

export const Right: Story = {
  render: () => <SidebarDemo side="right" />,
};
