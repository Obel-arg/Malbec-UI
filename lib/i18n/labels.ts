/**
 * Every piece of text a malbec-ui component renders on its own (aria-labels, default
 * placeholders, nav labels). Apps are ES + EN, so none of it is hardcoded: wrap the app in
 * `MalbecLabelsProvider` to pick a locale or override single labels.
 */
export interface MalbecLabels {
  /** Dialog close button. */
  closeDialog: string;
  /** Sheet close button. */
  closeSheet: string;
  /** FloatingBar close button. */
  close: string;
  /** Pagination `<nav>` label. */
  pagination: string;
  previous: string;
  next: string;
  previousPage: string;
  nextPage: string;
  morePages: string;
  /** Breadcrumb `<nav>` label. */
  breadcrumb: string;
  /** Collapsed breadcrumb items. */
  more: string;
  sidebarNavigation: string;
  toggleSidebar: string;
  selectAllRows: string;
  selectRow: string;
  /** Combobox trigger with nothing selected. */
  selectPlaceholder: string;
  /** Combobox trigger with several values selected. */
  selectedCount: (count: number) => string;
  clearSelection: string;
  remove: string;
  datePlaceholder: string;
  datePreset: string;
  previousMonth: string;
  nextMonth: string;
  month: string;
  year: string;
  previousWeek: string;
  nextWeek: string;
  previousDay: string;
  nextDay: string;
  /** Overflow button of a calendar day ("+3"). */
  moreEvents: (count: number) => string;
  inbox: string;
  filterInbox: string;
  moreActions: string;
  unread: string;
  /** DataTable.ColumnsToggle trigger. */
  columns: string;
}

export type MalbecLocale = "en" | "es";

export const labelsEn: MalbecLabels = {
  closeDialog: "Close dialog",
  closeSheet: "Close sheet",
  close: "Close",
  pagination: "Pagination",
  previous: "Previous",
  next: "Next",
  previousPage: "Go to previous page",
  nextPage: "Go to next page",
  morePages: "More pages",
  breadcrumb: "Breadcrumb",
  more: "More",
  sidebarNavigation: "Navigation menu",
  toggleSidebar: "Toggle sidebar",
  selectAllRows: "Select all",
  selectRow: "Select row",
  selectPlaceholder: "Select…",
  selectedCount: (count) => `${count} selected`,
  clearSelection: "Clear selection",
  remove: "Remove",
  datePlaceholder: "Pick a date",
  datePreset: "Date preset",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  month: "Month",
  year: "Year",
  previousWeek: "Previous week",
  nextWeek: "Next week",
  previousDay: "Previous day",
  nextDay: "Next day",
  moreEvents: (count) => `${count} more events`,
  inbox: "Inbox",
  filterInbox: "Filter inbox",
  moreActions: "More actions",
  unread: "Unread",
  columns: "Columns",
};

export const labelsEs: MalbecLabels = {
  closeDialog: "Cerrar diálogo",
  closeSheet: "Cerrar panel",
  close: "Cerrar",
  pagination: "Paginación",
  previous: "Anterior",
  next: "Siguiente",
  previousPage: "Ir a la página anterior",
  nextPage: "Ir a la página siguiente",
  morePages: "Más páginas",
  breadcrumb: "Ruta de navegación",
  more: "Más",
  sidebarNavigation: "Menú de navegación",
  toggleSidebar: "Mostrar u ocultar la barra lateral",
  selectAllRows: "Seleccionar todas",
  selectRow: "Seleccionar fila",
  selectPlaceholder: "Seleccionar…",
  selectedCount: (count) => `${count} seleccionados`,
  clearSelection: "Borrar selección",
  remove: "Quitar",
  datePlaceholder: "Elegí una fecha",
  datePreset: "Rango de fechas",
  previousMonth: "Mes anterior",
  nextMonth: "Mes siguiente",
  month: "Mes",
  year: "Año",
  previousWeek: "Semana anterior",
  nextWeek: "Semana siguiente",
  previousDay: "Día anterior",
  nextDay: "Día siguiente",
  moreEvents: (count) => `${count} eventos más`,
  inbox: "Notificaciones",
  filterInbox: "Filtrar notificaciones",
  moreActions: "Más acciones",
  unread: "Sin leer",
  columns: "Columnas",
};

export const LABELS_BY_LOCALE: Record<MalbecLocale, MalbecLabels> = {
  en: labelsEn,
  es: labelsEs,
};
