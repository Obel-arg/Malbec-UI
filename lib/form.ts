/**
 * Form API (TanStack Form). A separate subpath so `@tanstack/react-form` stays an optional
 * peer: apps that never import `malbec-ui/form` don't need it installed.
 */
export { Form } from "./Form/Form";
export type { FormProps } from "./Form/Form";
export { useForm, withForm, withFieldGroup } from "./Form/use-form";
export type { FieldLayoutProps } from "./Form/FieldLayout";
