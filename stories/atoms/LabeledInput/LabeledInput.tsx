import React from "react";
import styles from "./styles.module.css";

export type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  shape: "checkbox" | "radio" | "toggle";
};

export const LabeledInput = React.forwardRef<HTMLInputElement, Props>(
  ({ children, shape, ...props }, ref) => (
    <label className={styles[shape]}>
      <input {...props} ref={ref} />
      <span />
      {children}
    </label>
  )
);
