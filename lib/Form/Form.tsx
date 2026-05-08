"use client";

import * as React from "react";
import { type AnyFormApi } from "@tanstack/react-form";

export interface FormProps
  extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  /** Form instance from `useForm`. */
  form: AnyFormApi;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form(
  { form, children, noValidate = true, ...rest },
  ref,
) {
  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      void form.handleSubmit();
    },
    [form],
  );

  return (
    <form
      ref={ref}
      data-slot="form"
      noValidate={noValidate}
      onSubmit={handleSubmit}
      {...rest}
    >
      {children}
    </form>
  );
});
