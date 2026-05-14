# Changelog

All notable changes to Malbec UI are documented here.

## v1.8.5 — 2026-05-14

- patch(floating-bar): tweak border tone, bump count/trigger text to 13px, and icon to 14px

## v1.8.4 — 2026-05-12

- patch(form): destructure useForm export and add array-field story with zod 0-100 validation

## v1.8.3 — 2026-05-12

- patch(combobox): open popover when clicking anywhere on trigger row

## v1.8.2 — 2026-05-12

- patch(date-picker): set content background to background-100
- patch(combobox): make chevron button toggle popover open state

## v1.8.1 — 2026-05-11

- patch(theming): use theme tokens for badge fg/accent vars, calendar borders, and timegrid grid lines

## v1.8.0 — 2026-05-11

- minor(floating-bar): add FloatingBar component with animated open/close

## v1.7.7 — 2026-05-11

- patch(data-card): switch accent to stripe wrapper + inner panel, add panelClassName and UpcomingShow story

## v1.7.6 — 2026-05-11

- patch(avatar): export AvatarGroupCount and attach as AvatarGroup.Count

## v1.7.5 — 2026-05-11

- patch(avatar): export AvatarGroup from package entry

## v1.7.4 — 2026-05-08

- patch(combobox): reflect aria-invalid via :has() so Field auto-propagation styles the trigger

## v1.7.3 — 2026-05-08

- patch(forms): tighten invalid outline offset and suppress focus ring when invalid

## v1.7.2 — 2026-05-08

- patch(types): expose component prop types and add invalid-by-default form story

## v1.7.1 — 2026-05-08

- patch(theme): render theme tokens and dark class server-side

## v1.7.0 — 2026-05-08

- minor(form): add Form and Field with TanStack Form integration

## v1.6.0 — 2026-05-07

- minor(ci): enforce commit format and auto-publish

## v1.5.1 — 2026-05-07

- fix(storybook): render version in changelog header

## v1.5.0 — 2026-05-07

- feat(storybook,forms): surface version + changelog and unify invalid outline

## v1.4.9 — 2026-05-07

- refactor(input): update focus styles to use :focus-within for better accessibility

## v1.4.8 — 2026-05-07

- refactor(input): change wrapper from div to label for better semantics

## v1.4.7 — 2026-05-07

- refactor(input): use outline instead of ring for focus indicator

## v1.4.6 — 2026-05-06

- feat(input,combobox): add Input.Icon slots and align Combobox trigger with Input
- feat(badge,calendar): align Badge variants and Calendar today indicator with Figma

## v1.4.5 — 2026-05-05

- Refactor Calendar components: update focus styles for better accessibility, implement mouse down event handling to prevent default actions on non-selectable areas, and add onSelectDay logging for debugging in CalendarDay and CalendarWeek stories.
- Enhance Calendar components: add slot selection functionality by mapping vertical grid clicks to time slots, update onSelectDay prop to include time and date, and introduce utility functions for formatting slot times.
- Update z-index values for UI components: change z-index from 50 to 100 for Combobox, DropdownMenu, Popover, Select, and Tooltip to ensure proper layering above modal overlays.

## v1.4.4 — 2026-05-05

- Update DataTable component: add custom class to Table.Body for improved row styling and hover effects.

## v1.4.3 — 2026-05-05

- Enhance DataTable component: add onRowClick prop for row interaction, refactor row selection handling, and introduce utility function to ignore interactions on specific elements.

## v1.4.2 — 2026-05-05

- Update Dialog component styles and stories: increase padding in dialog content, add Steps component to EditProfile story, and adjust DialogFooter layout with a Cancel button.

## v1.4.1 — 2026-05-05

- Refactor Calendar components: enhance CalendarMonthToolbar with consistent styling, add week navigation to CalendarWeek, and streamline CalendarTimeGrid stories by removing unused icons and improving event handling.

## v1.4.0 — 2026-05-01

- Add DataCard component: create DataCard, its variants, and stories for flexible layout and accent customization

## v1.3.2 — 2026-04-30

_No user-facing changes._

## v1.3.1 — 2026-04-29

- Enhance CalendarMonth component: add navigation buttons for previous and next months, improve layout with grid styling, and update select variants for better visual consistency.

## v1.3.0 — 2026-04-29

- Update Button component styles and props: change default size to 'lg', enhance primary variant with font weight, and simplify Button stories by removing size prop.
- Enhance Calendar components: add CalendarWeek and CalendarDay exports, introduce CalendarTimeGrid utilities and types, and implement CalendarTimeGrid layout components for improved event management.

## v1.2.3 — 2026-04-29

- Add tooltip support to Sidebar components for improved accessibility
- Refactor RadioGroup styles: update radio item background and indicator handling. Remove unused dot variant and adjust checked state styling for improved visual consistency.

## v1.2.2 — 2026-04-28

- Remove shadow styles from DatePicker, Command, and Combobox variants for a cleaner design.

## v1.2.1 — 2026-04-28

- Remove shadow styles from select trigger and content variants for a cleaner design.

## v1.2.0 — 2026-04-28

- Enhance Tabs component with underline variant support and update README for installation instructions. Add new stories for underline navigation and disabled states.
- Added new codeoners
- Add cursor pointer styles to various components for improved user interaction

## v1.1.9 — 2026-04-27

_No user-facing changes._

## v1.1.8 — 2026-04-27

- Refactor SidebarMenuSub component to use a <ul> element for better semantic structure and update sidebarMenuSubRailVariants to include additional utility classes for improved styling.

## v1.1.7 — 2026-04-27

- Enhance Storybook documentation by adding code examples for various components, including Alert, AlertDialog, Avatar, Badge, Calendar, and more. Introduce SortableColumnHeader export in DataTable for improved usability.

## v1.1.6 — 2026-04-27

- Update padding in cardRootVariants from 10 to 6 for improved layout consistency.

## v1.1.5 — 2026-04-26

- Refactor Dialog and Sheet components to ensure unique function identities for Root, Trigger, and Portal. This prevents aliasing issues with Radix components, enhancing modular integrity.

## v1.1.4 — 2026-04-26

- Refactor dialog and sheet components to utilize new animation keyframes and improve motion handling. Remove deprecated dialog motion styles and replace with Tailwind utilities for overlay and content animations. Update imports to use SheetPrimitive for sheet components.

## v1.1.3 — 2026-04-26

- Add rollup-plugin-preserve-directives to package.json and update Vite configuration to utilize it for preserving client/server directives in modules. Mark multiple components as client components by adding "use client" directive.

## v1.1.2 — 2026-04-26

- Refactor package.json and pnpm-lock.yaml to reorganize dependencies and devDependencies; add new packages for enhanced functionality and update Vite configuration to improve module resolution and external dependency handling.

## v1.1.1 — 2026-04-26

- Update Vite configuration to preserve module structure and set root for module output.
- Add CalendarMonth component with variants and Storybook stories; update main exports in `lib/main.ts`, introduce new badge variants in `lib/Badge`, and enhance styling for categorical badges.

## v1.1.0 — 2026-04-25

- Remove custom icons path from TypeScript configurations and Vite build settings to streamline exports and improve clarity.
- Refactor package exports and add custom icons; update package.json to include new icons path, add lucide-react dependency, and enhance README with import instructions for custom icons. Update TypeScript configurations and Vite build settings for improved icon handling.
- Update README.md to clarify npm installation instructions for @obel-arg/malbec-ui, specifying the need for a read-only Personal Access Token for GitHub Packages.
- Enhance Sidebar component with collapsed state support; add new constants for collapsed width, update variants for responsive behavior, and improve Storybook demo with collapse instructions.

## v1.0.0 — 2026-04-24

- Add DataTable component with variants and Storybook stories; update main exports in `lib/main.ts`, enhance styles in `lib/styles.css`, and include new dependencies in `package.json` and `pnpm-lock.yaml` for improved table functionality.
- Add DataTable component with variants and Storybook stories; update main exports in `lib/main.ts`, enhance styles in `lib/styles.css`, and include new dependencies in `package.json` and `pnpm-lock.yaml` for improved table functionality.
- Add Chart component with variants and Storybook stories; update main exports in `lib/main.ts`, enhance styles in `lib/styles.css`, and include new dependencies in `package.json` and `pnpm-lock.yaml` for improved charting functionality.
- Add Card and Steps components with variants and Storybook stories; update main exports in `lib/main.ts` for enhanced UI functionality.
- Add Tooltip component with variants and Storybook stories; update main exports in `lib/main.ts` to include Tooltip for enhanced UI functionality.
- Add Tabs, Toggle, and ToggleGroup components with variants and Storybook stories; update main exports in `lib/main.ts`, and include new dependencies in `package.json` and `pnpm-lock.yaml` for enhanced UI functionality.
- Update Vite configuration to exclude Storybook stories from TypeScript declaration generation, preventing TS4023 errors related to unexported types.

## v0.0.7 — 2026-04-24

- Add Switch component with variants and Storybook stories; update main exports in `lib/main.ts`, and include new dependencies in `package.json` and `pnpm-lock.yaml` for enhanced toggle functionality.
- Add Sonner component with variants and Storybook stories; update main exports in `lib/main.ts`, enhance styles for toast notifications in `lib/styles.css`, and include new dependencies in `package.json` and `pnpm-lock.yaml` for improved notification functionality.
- Add Sidebar component with variants and Storybook stories; update main exports in `lib/main.ts`, enhance styles for improved usability, and include new dependencies in `package.json` and `pnpm-lock.yaml` for collapsible functionality.
- Add Sheet component with variants and Storybook stories; update main exports in `lib/main.ts` and enhance styles for improved animations and usability.
- Add RadioGroup component with variants and Storybook stories; update main exports in `lib/main.ts` and include new dependencies in `package.json` and `pnpm-lock.yaml` for enhanced form functionality.
- Add Pagination component with variants and Storybook stories; update main exports in `lib/main.ts` to include Pagination for enhanced navigation functionality.
- Add InputOtp component with variants and Storybook stories; update main exports in `lib/main.ts`, and include new dependencies in `package.json` and `pnpm-lock.yaml` for enhanced OTP input functionality.
- Add Input and Label components with variants and Storybook stories; update main exports in `lib/main.ts` and include new dependencies in `package.json` and `pnpm-lock.yaml` for enhanced form functionality.
- Add ChevronDownIcon component and Dropdown functionality to Calendar; enhance DatePicker with locale support for better internationalization. Update styles and props for improved usability.
- Add DropdownMenu component with variants and Storybook stories; update package.json and pnpm-lock.yaml to include new dependencies.
- Implement dialog component with animations and styles; integrate into Command component for enhanced user experience. Update dialog variants and styles for improved accessibility and visual consistency.

## v0.0.6 — 2026-04-23

- Enhance component library with new Calendar and DatePicker components, including variants and Storybook stories. Update main exports in `lib/main.ts` and add necessary dependencies in `package.json` and `pnpm-lock.yaml` for improved functionality and accessibility.

## v0.0.5 — 2026-04-22

- Refactor main exports to streamline component accessibility; removed unused exports and retained essential components including Button, Alert, AlertDialog, Avatar, Spinner, Breadcrumb, Checkbox, Combobox, and Command.
- Add Command component with variants and Storybook stories; update main exports and include new dependencies in package.json and pnpm-lock.yaml.
- Add Combobox component with variants and Storybook stories; update main exports and include new dependencies in package.json and pnpm-lock.yaml.
- Add Checkbox component with variants and Storybook stories; update package.json and pnpm-lock.yaml to include new dependencies.

## v0.0.4 — 2026-04-22

- Add @storybook/addon-docs to package.json and pnpm-lock.yaml; update Storybook configuration to include the addon for enhanced documentation support.
- Add Breadcrumb component with subcomponents and variants; include associated Storybook stories and update main exports. Enhance Badge component with new Icon and Text subcomponents, and update Badge stories to reflect the new structure.
- Add Badge component with variants and associated Storybook stories; update main exports and package dependencies in package.json and pnpm-lock.yaml.
- Add Avatar component with subcomponents and variants; update main exports and introduce avatar-variants utility. Add Storybook stories for Avatar configurations and update package.json and pnpm-lock.yaml with new dependencies.
- Add AlertDialog component with subcomponents and variants; update main exports and introduce alert-dialog-variants utility. Add Storybook stories for various AlertDialog configurations.
- Implement Alert component with subcomponents and variants; update Button exports and add new alert-variants utility. Modify Storybook preview for improved styling consistency.
- Add Button component with variants and loading state support; introduce Spinner component and utility for class name merging. Update package.json and pnpm-lock.yaml with new dependencies.
- Refactor Storybook preview configuration by replacing preview.ts with preview.tsx, enhancing theming support with MalbecThemeProvider and theme presets. Introduce fontsource declaration for Inter variable font and update styles to apply new font family. Add Button component stories for better documentation and testing.
- Update ESLint configuration to ignore Storybook static files, enhance package.json with new CSS and Storybook dependencies, and implement theme context and provider for improved theming support. Refactor Button component for better styling and add new theme presets and tokens for consistent design.
- Enhance project setup with Storybook integration and Tailwind CSS support. Updated .gitignore to exclude Storybook logs, modified eslint configuration to include Storybook plugin, and added Storybook configuration files. Updated package.json and pnpm-lock.yaml to include Storybook dependencies and scripts for development and building. Introduced Tailwind CSS styles and updated main.ts to import styles.

## v0.0.3 — 2026-04-22

- Update TypeScript definitions path in package.json and disable rollupTypes in vite.config.ts to fix consumer imports.

## v0.0.2 — 2026-04-22

- Update package.json to include pnpm as package manager and add TypeScript definitions. Modify GitHub Actions workflow to use pnpm for dependency installation, building, and publishing.
- Refactor package structure and add GitHub Actions for publishing. Updated package name to @obel-arg/malbec-ui, added .npmrc for GitHub Packages, and enhanced README with installation and publishing instructions. Included vite-plugin-dts for TypeScript definitions and configured GitHub Actions workflow for automated version bumping and publishing.
- init

