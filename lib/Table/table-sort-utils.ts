export type TableSortState =
  | { key: string; direction: "asc" | "desc" }
  | null;

export function toggleTableSort(
  key: string,
  prev: TableSortState,
): TableSortState {
  if (prev?.key !== key) {
    return { key, direction: "asc" };
  }
  if (prev.direction === "asc") {
    return { key, direction: "desc" };
  }
  return { key, direction: "asc" };
}
