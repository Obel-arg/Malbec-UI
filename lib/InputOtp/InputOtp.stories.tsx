import type { Meta, StoryObj } from "@storybook/react-vite";
import { REGEXP_ONLY_DIGITS, type OTPInputProps } from "input-otp";
import * as React from "react";

import { InputOtp } from "./InputOtp";

type InputOtpArgs = Partial<
  Omit<Extract<OTPInputProps, { children: React.ReactNode }>, "children">
>;

/**
 * Built on [input-otp](https://input-otp.rodz.dev/); use `InputOtp.Slot` to render per-digit boxes.
 *
 * ```tsx
 * <InputOtp maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={value} onChange={onChange}>
 *   <InputOtp.Slot index={0} />
 *   …
 * </InputOtp>
 * ```
 */
const meta: Meta<InputOtpArgs> = {
  title: "Components/InputOtp",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    maxLength: { control: "number" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    maxLength: 6,
    disabled: false,
    pattern: REGEXP_ONLY_DIGITS,
  },
  render: (args) => (
    <div className="ui:w-[320px]">
      <InputOtp
        maxLength={args.maxLength ?? 6}
        disabled={args.disabled}
        pattern={args.pattern}
        value={args.value}
        onChange={args.onChange}
        containerClassName={args.containerClassName}
        className={args.className}
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
    </div>
  ),
};

export const Default: Story = {
  args: {},
  render: () => (
    <div className="ui:w-[320px]">
      <InputOtp maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
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
    </div>
  ),
};

export const WithSeparators: Story = {
  args: {},
  render: () => (
    <div className="ui:w-[320px]">
      <InputOtp maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
        <InputOtp.Group>
          <InputOtp.Slot index={0} />
          <InputOtp.Slot index={1} />
        </InputOtp.Group>
        <InputOtp.Separator />
        <InputOtp.Group>
          <InputOtp.Slot index={2} />
          <InputOtp.Slot index={3} />
        </InputOtp.Group>
        <InputOtp.Separator />
        <InputOtp.Group>
          <InputOtp.Slot index={4} />
          <InputOtp.Slot index={5} />
        </InputOtp.Group>
      </InputOtp>
    </div>
  ),
};

export const Controlled: Story = {
  args: {},
  render: function ControlledRender() {
    const [value, setValue] = React.useState("");

    return (
      <div className="ui:flex ui:w-[320px] ui:flex-col ui:items-stretch">
        <InputOtp
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={value}
          onChange={setValue}
        >
          <InputOtp.Group>
            <InputOtp.Slot index={0} />
            <InputOtp.Slot index={1} />
            <InputOtp.Slot index={2} />
            <InputOtp.Slot index={3} />
            <InputOtp.Slot index={4} />
            <InputOtp.Slot index={5} />
          </InputOtp.Group>
        </InputOtp>
        <p className="malbec-font-sans ui:mt-2 ui:w-full ui:text-center ui:text-[14px] ui:font-normal ui:leading-5 ui:text-text-default">
          Enter your one-time password.
        </p>
      </div>
    );
  },
};
