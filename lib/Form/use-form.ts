import { createFormHook } from "@tanstack/react-form";
import { FieldLayout } from "./FieldLayout";
import { fieldContext, formContext } from "./form-context";

const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: { Field: FieldLayout },
  formComponents: {},
  fieldContext,
  formContext,
});

/** Typed `useForm` — TanStack's `useAppForm` configured with malbec-ui field components. */
export const useForm = useAppForm;

export { withForm, withFieldGroup };
