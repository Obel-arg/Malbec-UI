"use client";

import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { cn } from "../utils/cn";
import type { EventStatus } from "./table-events-sample-data";

const statusBadgeClass: Record<EventStatus, string> = {
  open: "ui:!border-transparent ui:!bg-[#d0dfd0]",
  closed: "ui:!border-transparent ui:!bg-[#dfd0d0]",
  private: "ui:!border-transparent ui:!bg-[#d0d0df]",
};

const statusTextClass: Record<EventStatus, string> = {
  open: "ui:!text-[#2a602c]",
  closed: "ui:!text-[#602a2a]",
  private: "ui:!text-[#2a3660]",
};

export function StatusLabel({ status }: { status: EventStatus }) {
  const label =
    status === "open" ? "Open" : status === "closed" ? "Closed" : "Private";
  return (
    <Badge
      variant="secondary"
      className={statusBadgeClass[status]}
      data-status={status}
    >
      <Badge.Text
        className={["ui:capitalize", statusTextClass[status]].join(" ")}
      >
        {label}
      </Badge.Text>
    </Badge>
  );
}

function MoreHorizontalGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="ui:size-6"
      aria-hidden
    >
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

export function MoreActionButton() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button
          htmlType="button"
          variant="ghost"
          size="icon"
          className="ui:h-6! ui:w-6! ui:min-h-0 ui:min-w-0 ui:shrink-0 ui:p-0"
          aria-label="Open menu"
        >
          <Button.Icon>
            <MoreHorizontalGlyph />
          </Button.Icon>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" className="ui:min-w-40">
          <DropdownMenu.Label>Actions</DropdownMenu.Label>
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>View details</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  );
}

export function ArtistCellContent({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl: string;
}) {
  return (
    <div className="ui:flex ui:min-w-0 ui:items-center ui:gap-2">
      <div className="ui:box-border ui:size-[33px] ui:shrink-0 ui:overflow-hidden ui:rounded ui:border ui:border-background-200">
        <img
          alt=""
          className="ui:h-full ui:w-full ui:object-cover"
          src={imageUrl}
        />
      </div>
      <span className="ui:truncate ui:text-left ui:text-sm ui:font-semibold ui:leading-4 ui:tracking-[-0.42px] ui:text-text-default">
        {name}
      </span>
    </div>
  );
}

export function FechasCellContent({
  dateLabel,
  extraDatesLabel,
}: {
  dateLabel: string;
  extraDatesLabel: string;
  chipShadow?: boolean;
}) {
  return (
    <div className="ui:flex ui:items-center ui:gap-3">
      <span className="ui:font-normal ui:text-[13px] ui:text-text-default">
        {dateLabel}
      </span>
      <span
        className={cn(
          "ui:inline-flex ui:shrink-0 ui:items-center ui:whitespace-nowrap ui:rounded ui:px-2 ui:py-[3px]",
          "ui:text-[11px] ui:font-normal ui:leading-[normal] ui:text-[#595961]",
          "ui:bg-background-200 ui:shadow-[0px_0px_2px_0px_rgba(0,0,0,0.2)]",
        )}
      >
        {extraDatesLabel}
      </span>
    </div>
  );
}
