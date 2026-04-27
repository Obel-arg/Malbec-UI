import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";
import { Table, type TableRootProps } from "./Table";
import {
  ArtistCellContent,
  FechasCellContent,
  MoreActionButton,
  StatusLabel,
} from "./events-sample";
import { eventRowsSample, type EventRow } from "./table-events-sample-data";
import { TableSortableHeader } from "./table-sortable-header";
import { type TableSortState, toggleTableSort } from "./table-sort-utils";
import {
  TableStoryHeaderIconArtist,
  TableStoryHeaderIconCalendar,
  TableStoryHeaderIconListStatus,
  TableStoryHeaderIconVenue,
} from "./table-story-header-icons";

/**
 * Composed with `Table`, `Table.Header`, `Table.Body`, `Table.Row`, `Table.Cell`, and optional `colgroup` for column widths.
 *
 * ```tsx
 * <Table>
 *   <colgroup>…</colgroup>
 *   <Table.Header>…</Table.Header>
 *   <Table.Body>…</Table.Body>
 * </Table>
 * ```
 */
const meta = {
  title: "Components/Table",
  component: Table,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<TableRootProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EventsShell: Story = {
  name: "Composition · events",
  render: () => (
    <div className="ui:mx-auto ui:max-w-[1085px]">
      <Table>
        <colgroup>
          <col className="ui:w-[300px] ui:min-w-0" />
          <col className="ui:w-[240px] ui:min-w-0" />
          <col className="ui:min-w-0" />
          <col className="ui:w-[185px] ui:min-w-0" />
          <col className="ui:w-[110px] ui:shrink-0" />
        </colgroup>
        <Table.Header>
          <Table.Row>
            <Table.Head>
              <div className="ui:flex ui:items-center ui:gap-[5px]">
                <TableStoryHeaderIconArtist />
                <span>Artista</span>
              </div>
            </Table.Head>
            <Table.Head>
              <div className="ui:flex ui:items-center ui:gap-[5px]">
                <TableStoryHeaderIconVenue />
                <span>Venue</span>
              </div>
            </Table.Head>
            <Table.Head>
              <div className="ui:flex ui:items-center ui:gap-[5px]">
                <TableStoryHeaderIconCalendar />
                <span>Fechas</span>
              </div>
            </Table.Head>
            <Table.Head>
              <div className="ui:flex ui:items-center ui:gap-[5px]">
                <TableStoryHeaderIconListStatus />
                <span>Status</span>
              </div>
            </Table.Head>
            <Table.Head className="ui:text-right">Acciones</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {eventRowsSample.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell className="ui:pl-[13px]! ui:pr-4">
                <ArtistCellContent name={row.artist} imageUrl={row.imageUrl} />
              </Table.Cell>
              <Table.Cell className="ui:font-medium ui:uppercase">
                {row.venue}
              </Table.Cell>
              <Table.Cell>
                <FechasCellContent
                  dateLabel={row.dateLabel}
                  extraDatesLabel={row.extraDatesLabel}
                  chipShadow={row.dateChipShadow}
                />
              </Table.Cell>
              <Table.Cell>
                <div className="ui:inline-flex">
                  <StatusLabel status={row.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="ui:text-right">
                <div className="ui:flex ui:items-center ui:justify-end">
                  <MoreActionButton />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ),
};

function compareEventRows(
  a: EventRow,
  b: EventRow,
  key: string,
  direction: "asc" | "desc",
) {
  const mult = direction === "asc" ? 1 : -1;
  const va =
    key === "artist"
      ? a.artist
      : key === "venue"
        ? a.venue
        : key === "dateLabel"
          ? a.dateLabel
          : a.status;
  const vb =
    key === "artist"
      ? b.artist
      : key === "venue"
        ? b.venue
        : key === "dateLabel"
          ? b.dateLabel
          : b.status;
  return (
    mult * String(va).localeCompare(String(vb), undefined, { numeric: true })
  );
}

function EventsSortableTable() {
  const [sort, setSort] = useState<TableSortState>(null);

  const sortedRows = useMemo(() => {
    const rows = [...eventRowsSample];
    if (!sort) return rows;
    rows.sort((a, b) => compareEventRows(a, b, sort.key, sort.direction));
    return rows;
  }, [sort]);

  const bind = (columnId: string) => ({
    columnId,
    sort,
    onSort: () => setSort((prev) => toggleTableSort(columnId, prev)),
  });

  return (
    <div className="ui:mx-auto ui:max-w-[1085px]">
      <Table>
        <colgroup>
          <col className="ui:w-[300px] ui:min-w-0" />
          <col className="ui:w-[240px] ui:min-w-0" />
          <col className="ui:min-w-0" />
          <col className="ui:w-[185px] ui:min-w-0" />
          <col className="ui:w-[110px] ui:shrink-0" />
        </colgroup>
        <Table.Header>
          <Table.Row>
            <Table.Head>
              <TableSortableHeader {...bind("artist")}>
                <div className="ui:flex ui:items-center ui:gap-[5px]">
                  <TableStoryHeaderIconArtist />
                  <span>Artista</span>
                </div>
              </TableSortableHeader>
            </Table.Head>
            <Table.Head>
              <TableSortableHeader {...bind("venue")}>
                <div className="ui:flex ui:items-center ui:gap-[5px]">
                  <TableStoryHeaderIconVenue />
                  <span>Venue</span>
                </div>
              </TableSortableHeader>
            </Table.Head>
            <Table.Head>
              <TableSortableHeader {...bind("dateLabel")}>
                <div className="ui:flex ui:items-center ui:gap-[5px]">
                  <TableStoryHeaderIconCalendar />
                  <span>Fechas</span>
                </div>
              </TableSortableHeader>
            </Table.Head>
            <Table.Head>
              <TableSortableHeader {...bind("status")}>
                <div className="ui:flex ui:items-center ui:gap-[5px]">
                  <TableStoryHeaderIconListStatus />
                  <span>Status</span>
                </div>
              </TableSortableHeader>
            </Table.Head>
            <Table.Head className="ui:text-right">Acciones</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedRows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell className="ui:pl-[13px]! ui:pr-4">
                <ArtistCellContent name={row.artist} imageUrl={row.imageUrl} />
              </Table.Cell>
              <Table.Cell className="ui:font-medium ui:uppercase">
                {row.venue}
              </Table.Cell>
              <Table.Cell>
                <FechasCellContent
                  dateLabel={row.dateLabel}
                  extraDatesLabel={row.extraDatesLabel}
                  chipShadow={row.dateChipShadow}
                />
              </Table.Cell>
              <Table.Cell>
                <div className="ui:inline-flex">
                  <StatusLabel status={row.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="ui:text-right">
                <div className="ui:flex ui:items-center ui:justify-end">
                  <MoreActionButton />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export const EventsSortable: Story = {
  name: "Sortable · events",
  render: () => <EventsSortableTable />,
};
