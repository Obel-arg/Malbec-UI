import "@fontsource-variable/inter";
import "./styles.css";

export { MalbecThemeProvider, useTheme } from "./theme";
export * as themes from "./theme/presets";
export { MalbecLabelsProvider, useMalbecLabels } from "./i18n/MalbecLabelsProvider";
export type { MalbecLabelsProviderProps } from "./i18n/MalbecLabelsProvider";
export { labelsEn, labelsEs } from "./i18n/labels";
export type { MalbecLabels, MalbecLocale } from "./i18n/labels";

export { Spinner } from "./Spinner/Spinner";
export { Button } from "./Button/Button";
/** Button classes for elements that can't be a <Button> (e.g. a framework Link without asChild). */
export { buttonVariants } from "./Button/button-variants";
export { Alert } from "./Alert/Alert";
export { AlertDialog } from "./AlertDialog/AlertDialog";
export { Avatar, AvatarGroup, AvatarGroupCount } from "./Avatar/Avatar";
export { Badge } from "./Badge/Badge";
export { StatusBadge } from "./Badge/StatusBadge";
export { PRIORITY_TONE } from "./Badge/status-tone";
export { Breadcrumb } from "./Breadcrumb/Breadcrumb";
export { Checkbox } from "./Checkbox/Checkbox";
export { Combobox } from "./Combobox/Combobox";
export { Command } from "./Command/Command";
export { Calendar } from "./Calendar/Calendar";
export { CalendarMonth } from "./CalendarMonth/CalendarMonth";
export { CalendarWeek } from "./CalendarTimeGrid/CalendarWeek";
export { CalendarDay } from "./CalendarTimeGrid/CalendarDay";
export type { CalendarTimeGridEvent } from "./CalendarTimeGrid/calendar-timegrid-types";
export type { CalendarWeekProps } from "./CalendarTimeGrid/CalendarWeek";
export type { CalendarDayProps } from "./CalendarTimeGrid/CalendarDay";
export { DatePicker } from "./DatePicker/DatePicker";
export { Inbox } from "./Inbox/Inbox";
export { Input } from "./Input/Input";
export { InputOtp } from "./InputOtp/InputOtp";
export { Label } from "./Label/Label";
export { Popover } from "./Popover/Popover";
export { Select } from "./Select/Select";
export { Dialog } from "./Dialog/Dialog";
export { Sheet } from "./Sheet/Sheet";
export { Sidebar, useSidebar } from "./Sidebar/Sidebar";
export { DropdownMenu } from "./DropdownMenu/DropdownMenu";
export { Field } from "./Field/Field";
export { FileDropzone } from "./FileDropzone/FileDropzone";
export { FloatingBar } from "./FloatingBar/FloatingBar";
export type {
  FloatingBarProps,
  FloatingBarPlacement,
  FloatingBarTriggerTone,
} from "./FloatingBar/FloatingBar";
export { Pagination } from "./Pagination/Pagination";
export { RadioGroup } from "./RadioGroup/RadioGroup";
export { Sonner } from "./Sonner/Sonner";
export { Switch } from "./Switch/Switch";
export { Toggle } from "./Toggle/Toggle";
export { ToggleGroup } from "./ToggleGroup/ToggleGroup";
export { Tabs } from "./Tabs/Tabs";
export { Textarea } from "./Textarea/Textarea";
export { Tooltip } from "./Tooltip/Tooltip";
export { Card } from "./Card/Card";
export { Chart } from "./Chart/Chart";
export { DataCard } from "./DataCard/DataCard";
export { DataTable } from "./DataTable/DataTable";
export { SortableColumnHeader } from "./DataTable/sortable-column-header";
export { Steps } from "./Steps/Steps";
export { Table } from "./Table/Table";

// Round B: shell
export { NotificationBell } from "./NotificationBell/NotificationBell";
export { ConfirmDialog } from "./ConfirmDialog/ConfirmDialog";

export type { MalbecThemeProviderProps } from "./theme";
export type {
  AlertProps,
  AlertIconProps,
  AlertTitleProps,
  AlertDescriptionProps,
  AlertActionProps,
} from "./Alert/Alert";
export type {
  AlertDialogOverlayProps,
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogFooterProps,
  AlertDialogMediaProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
} from "./AlertDialog/AlertDialog";
export type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
  AvatarBadgeProps,
  AvatarGroupProps,
  AvatarGroupCountProps,
} from "./Avatar/Avatar";
export type {
  BadgeProps,
  BadgeSize,
  BadgeVariant,
  BadgeIconProps,
  BadgeTextProps,
} from "./Badge/Badge";
export type { StatusBadgeProps } from "./Badge/StatusBadge";
export type { StatusTone, Priority } from "./Badge/status-tone";
export type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
  BreadcrumbEllipsisProps,
} from "./Breadcrumb/Breadcrumb";
export type {
  ButtonProps,
  ButtonIconProps,
  ButtonTextProps,
  ButtonSpinnerProps,
  ButtonSize,
  ButtonTone,
  ButtonVariant,
} from "./Button/Button";
export type {
  CalendarProps,
  CalendarDayButtonProps,
} from "./Calendar/Calendar";
export type {
  CalendarMonthProps,
  CalendarMonthHeaderProps,
  CalendarMonthBodyProps,
  CalendarMonthWeekProps,
  CalendarMonthDayProps,
  CalendarMonthEventBlockProps,
  CalendarMonthEvent,
  CalendarMonthEventColor,
} from "./CalendarMonth/CalendarMonth";
export type { CalendarTimeGridEventBlockProps } from "./CalendarTimeGrid/CalendarTimeGridEventBlock";
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardActionProps,
  CardContentProps,
  CardFooterProps,
} from "./Card/Card";
export type {
  ChartContainerProps,
  ChartTooltipContentProps,
  ChartLegendContentProps,
} from "./Chart/Chart";
export type {
  CheckboxProps,
  CheckboxIndicatorProps,
} from "./Checkbox/Checkbox";
export type {
  ComboboxProps,
  ComboboxInputProps,
  ComboboxTriggerProps,
  ComboboxContentProps,
  ComboboxListProps,
  ComboboxItemProps,
  ComboboxEmptyProps,
  ComboboxSeparatorProps,
  ComboboxGroupProps,
  ComboboxLabelProps,
  ComboboxCollectionProps,
  ComboboxChipsProps,
  ComboboxValueProps,
  ComboboxChipProps,
  ComboboxChipsInputProps,
} from "./Combobox/Combobox";
export type {
  CommandProps,
  CommandInputProps,
  CommandListProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandItemProps,
  CommandSeparatorProps,
  CommandShortcutProps,
  CommandLoadingProps,
  CommandDialogProps,
} from "./Command/Command";
export type { DataCardProps } from "./DataCard/DataCard";
export type {
  DataTableProps,
  DataTableRenderFooterContext,
  DataTableRowEvent,
} from "./DataTable/DataTable";
export type {
  DatePickerProps,
  DatePickerTriggerProps,
  DatePickerContentProps,
  DatePickerPresetProps,
  DatePickerCalendarProps,
} from "./DatePicker/DatePicker";
export type {
  DialogProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogSize,
  OverlayVeil,
  DialogHeaderProps,
  DialogFooterProps,
  DialogActionProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
  DialogBodyProps,
  DialogInlineFieldProps,
  DialogInlineLabelProps,
  DialogInlineInputProps,
  DialogCloseIconProps,
} from "./Dialog/Dialog";
export type {
  FieldProps,
  FieldLabelProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldGroupProps,
  FieldSetProps,
  FieldLegendProps,
} from "./Field/Field";
export type {
  InboxProps,
  InboxFilterItem,
  InboxMoreActionItem,
  InboxTabsProps,
  InboxTabProps,
  InboxListProps,
  InboxItemProps,
  InboxItemAvatarProps,
  InboxItemContentProps,
  InboxItemTitleProps,
  InboxItemBodyProps,
  InboxItemActionsProps,
  InboxItemFooterProps,
  InboxItemUnreadDotProps,
  InboxItemHoverActionsProps,
  InboxItemHoverActionProps,
  InboxSkeletonProps,
} from "./Inbox/Inbox";
export type {
  InputProps,
  InputVariant,
  InputIconProps,
} from "./Input/Input";
export type { LabelProps } from "./Label/Label";
export type {
  PaginationProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationPreviousProps,
  PaginationNextProps,
  PaginationEllipsisProps,
} from "./Pagination/Pagination";
export type {
  PopoverTriggerProps,
  PopoverAnchorProps,
  PopoverContentProps,
} from "./Popover/Popover";
export type {
  RadioGroupProps,
  RadioGroupItemProps,
  RadioGroupCardProps,
} from "./RadioGroup/RadioGroup";
export type {
  SelectProps,
  SelectGroupProps,
  SelectValueProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
} from "./Select/Select";
export type {
  SheetProps,
  SheetOverlayProps,
  SheetContentProps,
  SheetSize,
  SheetHeaderProps,
  SheetFooterProps,
  SheetActionProps,
  SheetTitleProps,
  SheetDescriptionProps,
  SheetCloseProps,
  SheetBodyProps,
  SheetInlineFieldProps,
  SheetInlineLabelProps,
  SheetInlineInputProps,
  SheetCloseIconProps,
} from "./Sheet/Sheet";
export type {
  SidebarProviderProps,
  SidebarProps,
  SidebarGapProps,
  SidebarTriggerProps,
  SidebarMenuButtonProps,
  SidebarMenuSubButtonProps,
  SidebarWorkspaceButtonProps,
} from "./Sidebar/Sidebar";
export type { SonnerProps } from "./Sonner/Sonner";
export type { SpinnerProps } from "./Spinner/Spinner";
export type { StepsProps } from "./Steps/Steps";
export type { SwitchProps } from "./Switch/Switch";
export type {
  TableRootProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from "./Table/Table";
export type {
  TabsProps,
  TabsVariant,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from "./Tabs/Tabs";
export type { TextareaProps } from "./Textarea/Textarea";
export type {
  ToggleProps,
  ToggleIconProps,
} from "./Toggle/Toggle";
export type { ToggleGroupItemProps } from "./ToggleGroup/ToggleGroup";
export type {
  TooltipProps,
  TooltipProviderProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipVariant,
} from "./Tooltip/Tooltip";
export type {
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuPortalProps,
  DropdownMenuContentProps,
  DropdownMenuGroupProps,
  DropdownMenuLabelProps,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuItemIndicatorProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
  DropdownMenuItemIconProps,
} from "./DropdownMenu/DropdownMenu";
export type {
  InputOtpProps,
  InputOtpSlotProps,
  InputOtpGroupProps,
  InputOtpSeparatorProps,
} from "./InputOtp/InputOtp";

// Round B: shell
export type { SidebarCollapsible } from "./Sidebar/Sidebar";
export type { NotificationBellProps } from "./NotificationBell/NotificationBell";
export type { ConfirmDialogProps } from "./ConfirmDialog/ConfirmDialog";
