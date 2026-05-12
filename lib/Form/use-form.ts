import { createFormHook } from "@tanstack/react-form";
import { FieldLayout } from "./FieldLayout";
import { fieldContext, formContext } from "./form-context";

export const {
  useAppForm: useForm,
  withForm,
  withFieldGroup,
} = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { Field: FieldLayout },
  formComponents: {},
});
