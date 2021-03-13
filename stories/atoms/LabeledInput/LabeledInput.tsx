import React from "react";
import styles from "./styles.module.css";
// ______________________________________________________
//
type Props = {
  shape: "checkbox" | "radio" | "toggle";
  inputProps: React.ComponentPropsWithRef<"input">;
  labelProps?: React.ComponentPropsWithRef<"label">;
};
// ______________________________________________________
//
const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>((props, ref) => <input {...props} ref={ref} />);

const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<"label">
>((props, ref) => <label {...props} ref={ref} />);
// ______________________________________________________
//
export const LabeledInput: React.FC<Props> = ({
  children,
  shape,
  inputProps,
  labelProps,
}) => (
  <Label {...labelProps} className={styles[shape]}>
    <Input {...inputProps} />
    <span />
    {children}
  </Label>
);
