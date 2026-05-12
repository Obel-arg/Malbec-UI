import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "../Button/Button";
import { Combobox } from "../Combobox/Combobox";
import { DatePicker } from "../DatePicker/DatePicker";
import { Field } from "../Field/Field";
import { Input } from "../Input/Input";
import { InputOtp } from "../InputOtp/InputOtp";
import { Label } from "../Label/Label";
import { RadioGroup } from "../RadioGroup/RadioGroup";
import { Select } from "../Select/Select";
import { ToggleGroup } from "../ToggleGroup/ToggleGroup";
import { Form } from "./Form";
import { useForm } from "./use-form";

/** True once the field has been visited (touched/blurred) AND has errors. */
function fieldIsInvalid(meta: {
  isTouched: boolean;
  isBlurred: boolean;
  errors: unknown[];
}): boolean {
  return (meta.isTouched || meta.isBlurred) && meta.errors.length > 0;
}

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

const allInputsSchema = z.object({
  title: z.string().min(5, "At least 5 characters"),
  email: z.email("Enter a valid email address"),
  avatar: z
    .union([z.instanceof(File), z.null()])
    .refine((v): v is File => v instanceof File, "Choose a file"),
  description: z.string().min(20, "Tell us a bit more (min 20 chars)"),
  country: z.string().min(1, "Select a country"),
  framework: z.string().min(1, "Pick a framework"),
  birthday: z.date({ message: "Choose a date" }),
  otp: z.string().length(6, "Enter all 6 digits"),
  format: z.string().min(1, "Pick a format"),
  alignment: z.string().min(1, "Pick alignment"),
});

const allInputsFieldNames = [
  "title",
  "email",
  "avatar",
  "description",
  "country",
  "framework",
  "birthday",
  "otp",
  "format",
  "alignment",
] as const;

const frameworks = ["Next.js", "Svelte.js", "Nuxt.js", "Remix", "Astro"];

export const InvalidByDefault: Story = {
  name: "Invalid by default",
  render: () => {
    const Demo = () => {
      const form = useForm({
        defaultValues: {
          title: "",
          email: "",
          avatar: null as File | null,
          description: "",
          country: "",
          framework: "",
          birthday: undefined as Date | undefined,
          otp: "",
          format: "",
          alignment: "",
        },
        validators: {
          onMount: allInputsSchema,
          onSubmit: allInputsSchema,
        },
        onSubmit: async () => {},
      });

      useEffect(() => {
        for (const name of allInputsFieldNames) {
          form.setFieldMeta(name, (prev) => ({
            ...prev,
            isTouched: true,
            isBlurred: true,
          }));
        }
      }, [form]);

      return (
        <div className="ui:flex ui:flex-col ui:gap-6 ui:w-[28rem]">
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

              <form.AppField name="avatar">
                {(field) => (
                  <field.Field label="Avatar" required>
                    <Input
                      id={field.name}
                      type="file"
                      onChange={(e) =>
                        field.handleChange(e.target.files?.[0] ?? null)
                      }
                      onBlur={field.handleBlur}
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

              <form.AppField name="country">
                {(field) => (
                  <field.Field label="Country" required>
                    <Select
                      value={field.state.value || undefined}
                      onValueChange={(v) => {
                        field.handleChange(v);
                        field.handleBlur();
                      }}
                    >
                      <Select.Trigger id={field.name} aria-label="Country">
                        <Select.Value placeholder="Choose a country" />
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value="ar">Argentina</Select.Item>
                        <Select.Item value="cl">Chile</Select.Item>
                        <Select.Item value="uy">Uruguay</Select.Item>
                      </Select.Content>
                    </Select>
                  </field.Field>
                )}
              </form.AppField>

              <form.AppField name="framework">
                {(field) => {
                  const invalid = fieldIsInvalid(field.state.meta);
                  return (
                    <field.Field label="Framework" required>
                      <Combobox
                        items={frameworks}
                        value={field.state.value || null}
                        onValueChange={(v) => {
                          field.handleChange(typeof v === "string" ? v : "");
                          field.handleBlur();
                        }}
                        className="ui:w-full"
                      >
                        <Combobox.Input
                          id={field.name}
                          placeholder="Pick a framework"
                          aria-invalid={invalid || undefined}
                        />
                        <Combobox.Content>
                          <Combobox.List>
                            {(item) => (
                              <Combobox.Item
                                key={String(item)}
                                value={item}
                              >
                                {String(item)}
                              </Combobox.Item>
                            )}
                          </Combobox.List>
                        </Combobox.Content>
                      </Combobox>
                    </field.Field>
                  );
                }}
              </form.AppField>

              <form.AppField name="birthday">
                {(field) => {
                  const invalid = fieldIsInvalid(field.state.meta);
                  return (
                    <field.Field label="Birthday" required>
                      <DatePicker
                        date={field.state.value}
                        onDateChange={(d) => {
                          field.handleChange(d);
                          field.handleBlur();
                        }}
                      >
                        <DatePicker.Trigger
                          id={field.name}
                          aria-invalid={invalid || undefined}
                        />
                        <DatePicker.Content>
                          <DatePicker.Calendar />
                        </DatePicker.Content>
                      </DatePicker>
                    </field.Field>
                  );
                }}
              </form.AppField>

              <form.AppField name="otp">
                {(field) => {
                  const invalid = fieldIsInvalid(field.state.meta);
                  return (
                    <field.Field label="One-time code" required>
                      <InputOtp
                        id={field.name}
                        maxLength={6}
                        value={field.state.value}
                        onChange={(v) => field.handleChange(v)}
                        onBlur={field.handleBlur}
                        aria-invalid={invalid || undefined}
                      >
                        <InputOtp.Group>
                          <InputOtp.Slot index={0} />
                          <InputOtp.Slot index={1} />
                          <InputOtp.Slot index={2} />
                        </InputOtp.Group>
                        <InputOtp.Separator />
                        <InputOtp.Group>
                          <InputOtp.Slot index={3} />
                          <InputOtp.Slot index={4} />
                          <InputOtp.Slot index={5} />
                        </InputOtp.Group>
                      </InputOtp>
                    </field.Field>
                  );
                }}
              </form.AppField>

              <form.AppField name="format">
                {(field) => {
                  const invalid = fieldIsInvalid(field.state.meta);
                  return (
                    <field.Field label="Preferred format" required>
                      <RadioGroup
                        value={field.state.value}
                        onValueChange={(v) => {
                          field.handleChange(v);
                          field.handleBlur();
                        }}
                        className="ui:gap-3"
                      >
                        <div className="ui:flex ui:items-center ui:gap-2">
                          <RadioGroup.Item
                            value="vinyl"
                            id={`${field.name}-vinyl`}
                            aria-invalid={invalid || undefined}
                          />
                          <Label htmlFor={`${field.name}-vinyl`}>Vinyl</Label>
                        </div>
                        <div className="ui:flex ui:items-center ui:gap-2">
                          <RadioGroup.Item
                            value="cd"
                            id={`${field.name}-cd`}
                            aria-invalid={invalid || undefined}
                          />
                          <Label htmlFor={`${field.name}-cd`}>CD</Label>
                        </div>
                        <div className="ui:flex ui:items-center ui:gap-2">
                          <RadioGroup.Item
                            value="digital"
                            id={`${field.name}-digital`}
                            aria-invalid={invalid || undefined}
                          />
                          <Label htmlFor={`${field.name}-digital`}>Digital</Label>
                        </div>
                      </RadioGroup>
                    </field.Field>
                  );
                }}
              </form.AppField>

              <form.AppField name="alignment">
                {(field) => {
                  const invalid = fieldIsInvalid(field.state.meta);
                  return (
                    <field.Field label="Alignment" required>
                      <ToggleGroup
                        type="single"
                        value={field.state.value}
                        onValueChange={(v) => {
                          field.handleChange(v);
                          field.handleBlur();
                        }}
                        aria-invalid={invalid || undefined}
                      >
                        <ToggleGroup.Item value="left" aria-label="Left">
                          Left
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value="center" aria-label="Center">
                          Center
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value="right" aria-label="Right">
                          Right
                        </ToggleGroup.Item>
                      </ToggleGroup>
                    </field.Field>
                  );
                }}
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

type ContractRow = {
  rowKey: string;
  categoryId: string | null;
  percentInput: string;
};

const contractRowsSchema = z.object({
  contractRows: z.array(
    z.object({
      rowKey: z.string(),
      categoryId: z.string().nullable(),
      percentInput: z
        .string()
        .min(1, "Required")
        .refine((v) => !Number.isNaN(Number(v)), "Must be a number")
        .refine((v) => {
          const n = Number(v);
          return n >= 0 && n <= 100;
        }, "Must be between 0 and 100"),
    }),
  ),
});

export const ArrayField: Story = {
  name: "Array field",
  render: () => {
    const Demo = () => {
      const [submitted, setSubmitted] = useState<unknown>(null);
      const form = useForm({
        defaultValues: {
          contractRows: [
            {
              rowKey: crypto.randomUUID(),
              categoryId: null,
              percentInput: "",
            },
          ] as ContractRow[],
        },
        validators: { onChange: contractRowsSchema, onSubmit: contractRowsSchema },
        onSubmit: async ({ value }) => {
          setSubmitted(value);
        },
      });

      return (
        <div className="ui:flex ui:flex-col ui:gap-6 ui:w-[28rem]">
          <Form form={form}>
            <form.AppField mode="array" name="contractRows">
              {(arrayField) => (
                <div className="ui:flex ui:flex-col ui:gap-3">
                  {arrayField.state.value.map((row, i) => (
                    <div
                      key={row.rowKey}
                      className="ui:flex ui:items-end ui:gap-2"
                    >
                      <form.AppField name={`contractRows[${i}].percentInput`}>
                        {(percentField) => (
                          <percentField.Field label={`Row ${i + 1} %`}>
                            <Input
                              id={percentField.name}
                              type="number"
                              value={percentField.state.value}
                              onChange={(e) =>
                                percentField.handleChange(e.target.value)
                              }
                              onBlur={percentField.handleBlur}
                              placeholder="0"
                            />
                          </percentField.Field>
                        )}
                      </form.AppField>
                      <Button
                        variant="secondary"
                        onClick={() => arrayField.removeValue(i)}
                      >
                        <Button.Text>Remove</Button.Text>
                      </Button>
                    </div>
                  ))}
                  <div>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        arrayField.pushValue({
                          rowKey: crypto.randomUUID(),
                          categoryId: null,
                          percentInput: "",
                        })
                      }
                    >
                      <Button.Text>Add row</Button.Text>
                    </Button>
                  </div>
                </div>
              )}
            </form.AppField>

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
