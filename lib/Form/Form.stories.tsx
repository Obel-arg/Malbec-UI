import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "../Button/Button";
import { Field } from "../Field/Field";
import { Input } from "../Input/Input";
import { Form } from "./Form";
import { useForm } from "./use-form";

/**
 * `Form` is a thin layer over [TanStack Form](https://tanstack.com/form) that
 * removes per-field error wiring. Validation lives on the form (or per-field)
 * via Standard Schema (Zod / Valibot / Arktype). Use `useForm` for a fully
 * typed form, then `form.AppField` to bind controls — `name` is keyof-checked
 * against your `defaultValues`, and `field.state.value` is typed accordingly.
 *
 * ```tsx
 * const form = useForm({
 *   defaultValues: { email: "" },
 *   validators: { onSubmit: schema },
 *   onSubmit: async ({ value }) => { … },
 * });
 *
 * <Form form={form}>
 *   <form.AppField name="email">
 *     {(field) => (
 *       <field.Field label="Email" required>
 *         <Input
 *           id={field.name}
 *           value={field.state.value}
 *           onChange={(e) => field.handleChange(e.target.value)}
 *           onBlur={field.handleBlur}
 *         />
 *       </field.Field>
 *     )}
 *   </form.AppField>
 *   <Button htmlType="submit"><Button.Text>Submit</Button.Text></Button>
 * </Form>
 * ```
 */
const meta: Meta = {
  title: "Components/Form",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

const profileSchema = z.object({
  title: z
    .string()
    .min(5, "At least 5 characters")
    .max(32, "At most 32 characters"),
  email: z.email("Enter a valid email address"),
  description: z.string().min(20, "Tell us a bit more (min 20 chars)"),
});

export const Default: Story = {
  render: () => {
    const Demo = () => {
      const [submitted, setSubmitted] = useState<unknown>(null);
      const form = useForm({
        defaultValues: { title: "", email: "", description: "" },
        validators: { onSubmit: profileSchema },
        onSubmit: async ({ value }) => {
          setSubmitted(value);
        },
      });

      return (
        <div className="ui:flex ui:flex-col ui:gap-6 ui:w-96">
          <Form form={form}>
            <Field.Group>
              <form.AppField name="title">
                {(field) => (
                  <field.Field label="Title" required>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="My new project"
                    />
                  </field.Field>
                )}
              </form.AppField>

              <form.AppField name="email">
                {(field) => (
                  <field.Field
                    label="Email"
                    description="We'll never share it."
                    required
                  >
                    <Input
                      id={field.name}
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="you@example.com"
                    />
                  </field.Field>
                )}
              </form.AppField>

              <form.AppField name="description">
                {(field) => (
                  <field.Field label="Description" required>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="A short summary…"
                    />
                  </field.Field>
                )}
              </form.AppField>
            </Field.Group>

            <div className="ui:mt-6 ui:flex ui:justify-end">
              <Button htmlType="submit">
                <Button.Text>Submit</Button.Text>
              </Button>
            </div>
          </Form>

          {submitted ? (
            <pre className="ui:rounded ui:bg-background-100 ui:p-3 ui:text-[12px] ui:text-text-default">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          ) : null}
        </div>
      );
    };
    return <Demo />;
  },
};

export const InvalidByDefault: Story = {
  name: "Invalid by default",
  render: () => {
    const Demo = () => {
      const form = useForm({
        defaultValues: { title: "", email: "", description: "" },
        validators: { onMount: profileSchema, onSubmit: profileSchema },
        onSubmit: async () => {},
      });

      useEffect(() => {
        for (const name of ["title", "email", "description"] as const) {
          form.setFieldMeta(name, (prev) => ({
            ...prev,
            isTouched: true,
            isBlurred: true,
          }));
        }
      }, [form]);

      return (
        <div className="ui:flex ui:flex-col ui:gap-6 ui:w-96">
          <Form form={form}>
            <Field.Group>
              <form.AppField name="title">
                {(field) => (
                  <field.Field label="Title" required>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="My new project"
                    />
                  </field.Field>
                )}
              </form.AppField>

              <form.AppField name="email">
                {(field) => (
                  <field.Field
                    label="Email"
                    description="We'll never share it."
                    required
                  >
                    <Input
                      id={field.name}
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="you@example.com"
                    />
                  </field.Field>
                )}
              </form.AppField>

              <form.AppField name="description">
                {(field) => (
                  <field.Field label="Description" required>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="A short summary…"
                    />
                  </field.Field>
                )}
              </form.AppField>
            </Field.Group>

            <div className="ui:mt-6 ui:flex ui:justify-end">
              <Button htmlType="submit">
                <Button.Text>Submit</Button.Text>
              </Button>
            </div>
          </Form>
        </div>
      );
    };
    return <Demo />;
  },
};

export const PerFieldValidators: Story = {
  name: "Per-field validators",
  render: () => {
    const Demo = () => {
      const form = useForm({
        defaultValues: { username: "" },
        onSubmit: async ({ value }) => alert(JSON.stringify(value)),
      });

      return (
        <div className="ui:w-80">
          <Form form={form}>
            <form.AppField
              name="username"
              validators={{
                onChange: ({ value }) => {
                  if (value.length < 3) return "Too short";
                  if (value.length > 16) return "Too long";
                  if (!/^[a-z0-9]+$/.test(value)) return "Invalid characters";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <field.Field
                  label="Username"
                  description="3–16 characters, lowercase letters and digits."
                  required
                >
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="janedoe"
                  />
                </field.Field>
              )}
            </form.AppField>

            <div className="ui:mt-6 ui:flex ui:justify-end">
              <Button htmlType="submit" size="sm">
                <Button.Text>Submit</Button.Text>
              </Button>
            </div>
          </Form>
        </div>
      );
    };
    return <Demo />;
  },
};
