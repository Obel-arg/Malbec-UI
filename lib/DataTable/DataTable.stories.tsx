import type { ColumnDef } from "@tanstack/react-table";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo } from "react";
import {
  ArtistCellContent,
  FechasCellContent,
  MoreActionButton,
  StatusLabel,
} from "../Table/events-sample";
import {
  eventRowsSample,
  type EventRow,
} from "../Table/table-events-sample-data";
import {
  TableStoryHeaderIconArtist,
  TableStoryHeaderIconCalendar,
  TableStoryHeaderIconListStatus,
  TableStoryHeaderIconVenue,
} from "../Table/table-story-header-icons";
import { DataTable, type DataTableProps } from "./DataTable";
import { SortableColumnHeader } from "./sortable-column-header";

/**
 * [TanStack Table](https://tanstack.com/table) wrapper. Build a `ColumnDef[]` (see `useEventColumns` in this
 * file), then pass `data`, `getRowId`, and optional `tableChildrenStart` (e.g. `<colgroup>`) and `rowSelection`.
 *
 * ```tsx
 * <DataTable
 *   tableAppearance="default"
 *   getRowId={(r) => r.id}
 *   columns={columns}
 *   data={rows}
 *   tableChildrenStart={colgroup}
 * />
 * ```
 */
const meta = {
  title: "Components/DataTable",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const colgroup = (
  <colgroup>
    <col className="ui:w-8" />
    <col className="ui:w-[300px] ui:min-w-0" />
    <col className="ui:w-[240px] ui:min-w-0" />
    <col className="ui:min-w-0" />
    <col className="ui:w-[185px] ui:min-w-0" />
    <col className="ui:w-[110px] ui:shrink-0" />
  </colgroup>
);

const colgroupNoSelect = (
  <colgroup>
    <col className="ui:w-[300px] ui:min-w-0" />
    <col className="ui:w-[240px] ui:min-w-0" />
    <col className="ui:min-w-0" />
    <col className="ui:w-[185px] ui:min-w-0" />
    <col className="ui:w-[110px] ui:shrink-0" />
  </colgroup>
);

function useEventColumns() {
  return useMemo<ColumnDef<EventRow>[]>(
    () => [
      {
        id: "artist",
        accessorKey: "artist",
        header: ({ column }) => (
          <SortableColumnHeader column={column}>
            <div className="ui:flex ui:items-center ui:gap-[5px]">
              <TableStoryHeaderIconArtist />
              <span>Artista</span>
            </div>
          </SortableColumnHeader>
        ),
        cell: ({ row }) => (
          <ArtistCellContent
            name={row.original.artist}
            imageUrl={row.original.imageUrl}
          />
        ),
      },
      {
        accessorKey: "venue",
        header: ({ column }) => (
          <SortableColumnHeader column={column}>
            <div className="ui:flex ui:items-center ui:gap-[5px]">
              <TableStoryHeaderIconVenue />
              <span>Venue</span>
            </div>
          </SortableColumnHeader>
        ),
        cell: (ctx) => (
          <span className="ui:font-medium ui:uppercase">
            {String(ctx.getValue())}
          </span>
        ),
      },
      {
        id: "fechas",
        accessorKey: "dateLabel",
        header: ({ column }) => (
          <SortableColumnHeader column={column}>
            <div className="ui:flex ui:items-center ui:gap-[5px]">
              <TableStoryHeaderIconCalendar />
              <span>Fechas</span>
            </div>
          </SortableColumnHeader>
        ),
        cell: ({ row }) => (
          <FechasCellContent
            dateLabel={row.original.dateLabel}
            extraDatesLabel={row.original.extraDatesLabel}
            chipShadow={row.original.dateChipShadow}
          />
        ),
      },
      {
        id: "status",
        accessorKey: "status",
        header: ({ column }) => (
          <SortableColumnHeader column={column}>
            <div className="ui:flex ui:items-center ui:gap-[5px]">
              <TableStoryHeaderIconListStatus />
              <span>Status</span>
            </div>
          </SortableColumnHeader>
        ),
        cell: (ctx) => (
          <div className="ui:inline-flex">
            <StatusLabel status={ctx.row.original.status} />
          </div>
        ),
      },
      {
        id: "actions",
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            className="ui:w-full ui:justify-end"
          >
            <span>Acciones</span>
          </SortableColumnHeader>
        ),
        cell: () => (
          <div className="ui:flex ui:items-center ui:justify-end">
            <MoreActionButton />
          </div>
        ),
        enableSorting: false,
      },
    ],
    [],
  );
}

function DataTableWithColumns(
  props: Pick<
    DataTableProps<EventRow, unknown>,
    "data" | "emptyLabel" | "rowSelection" | "tableChildrenStart"
  >,
) {
  const columns = useEventColumns();
  return (
    <div className="ui:mx-auto ui:max-w-[1085px]">
      <DataTable
        tableChildrenStart={props.tableChildrenStart}
        tableAppearance="default"
        getRowId={(r) => r.id}
        rowSelection={props.rowSelection}
        columns={columns}
        data={props.data}
        emptyLabel={props.emptyLabel}
      />
    </div>
  );
}

export const Events: Story = {
  render: () => (
    <DataTableWithColumns
      data={eventRowsSample}
      tableChildrenStart={colgroup}
    />
  ),
};

export const NoRowSelection: Story = {
  name: "Without row checkboxes",
  render: () => (
    <DataTableWithColumns
      data={eventRowsSample}
      rowSelection={false}
      tableChildrenStart={colgroupNoSelect}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataTableWithColumns
      data={[]}
      emptyLabel="No rows."
      tableChildrenStart={colgroup}
    />
  ),
};
