import { Story } from "@storybook/react";
import React from "react";
import { LabeledInput, Props } from "./LabeledInput";
// ______________________________________________________
//
const wait = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 600);
  });
  if (Math.random() > 0.8) throw Error("failed");
};
const useAsyncToggle = () => {
  const [checked, setChecked] = React.useState(false);
  const [inProgress, setInProgress] = React.useState(false);
  const handleChange = () => {
    setInProgress(true);
    wait()
      .then(() => {
        setInProgress(false);
        setChecked((prev) => !prev);
      })
      .catch(() => {
        setInProgress(false);
        alert("random fail");
      });
  };
  return [{ checked, inProgress }, { handleChange }] as const;
};
// ______________________________________________________
//
const RadioTemplate: Story<React.PropsWithRef<Props>> = (args) => {
  return (
    <div>
      <LabeledInput {...args}>YES</LabeledInput>
      <br />
      <LabeledInput {...args}>NO</LabeledInput>
      <br />
      <LabeledInput {...args} disabled>
        Disabled
      </LabeledInput>
    </div>
  );
};
const CheckboxTemplate: Story<React.PropsWithRef<Props>> = (args) => {
  const [values, handlers] = useAsyncToggle();
  return (
    <div>
      <LabeledInput {...args}>Uncontrolled</LabeledInput>
      <br />
      <LabeledInput {...args}>Uncontrolled</LabeledInput>
      <br />
      <LabeledInput
        {...args}
        checked={values.checked}
        disabled={values.inProgress}
        onChange={handlers.handleChange}
      >
        {values.inProgress ? "loading..." : "Controlled AsyncToggle"}
      </LabeledInput>
    </div>
  );
};
// ______________________________________________________
//
export const Radio: Story<React.PropsWithRef<Props>> = RadioTemplate.bind({});
Radio.args = { type: "radio", shape: "radio", name: "n1" };
Radio.storyName = "Radio";

export const Checkbox: Story<React.PropsWithRef<Props>> = CheckboxTemplate.bind(
  {}
);
Checkbox.args = { type: "checkbox", shape: "checkbox", name: "n1" };
Checkbox.storyName = "Checkbox";

export const Toggle: Story<React.PropsWithRef<Props>> = CheckboxTemplate.bind(
  {}
);
Toggle.args = { type: "checkbox", shape: "toggle", name: "n1" };
Toggle.storyName = "Toggle";
// ______________________________________________________
//
export default {
  title: "atoms/LabeledInput",
};
