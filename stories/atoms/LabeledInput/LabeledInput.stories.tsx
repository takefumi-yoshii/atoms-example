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
const Template: Story = () => {
  const [values, handlers] = useAsyncToggle();
  return (
    <table>
      <tbody>
        <tr>
          <td style={{ width: "200px" }}>
            <h2>Radio</h2>
            <div>
              <LabeledInput type="radio" shape="radio" name="n1">
                YES
              </LabeledInput>
              <br />
              <LabeledInput type="radio" shape="radio" name="n1">
                NO
              </LabeledInput>
              <br />
              <LabeledInput type="radio" shape="radio" name="n1" disabled>
                Disabled
              </LabeledInput>
            </div>
          </td>
          <td style={{ width: "200px" }}>
            <h2>Checkbox</h2>
            <div>
              <LabeledInput type="checkbox" shape="checkbox" name="n2_1">
                YES
              </LabeledInput>
              <br />
              <LabeledInput type="checkbox" shape="checkbox" name="n2_2">
                NO
              </LabeledInput>
              <br />
              <LabeledInput
                type="checkbox"
                shape="checkbox"
                name="n2_3"
                disabled
              >
                Disabled
              </LabeledInput>
            </div>
          </td>
          <td style={{ width: "300px" }}>
            <h2>Toggle</h2>
            <div>
              <LabeledInput type="checkbox" shape="toggle" name="n3_1">
                Uncontrolled
              </LabeledInput>
              <br />
              <LabeledInput
                type="checkbox"
                shape="toggle"
                name="n3_2"
                checked={values.checked}
                disabled={values.inProgress}
                onChange={handlers.handleChange}
              >
                {values.inProgress ? "loading..." : "Controlled AsyncToggle"}
              </LabeledInput>
              <br />
              <LabeledInput type="checkbox" shape="toggle" name="n3_3" disabled>
                Disabled
              </LabeledInput>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
// ______________________________________________________
//
export const Index: Story<React.PropsWithRef<Props>> = Template.bind({});
export default {
  title: "atoms/LabeledInput",
};
