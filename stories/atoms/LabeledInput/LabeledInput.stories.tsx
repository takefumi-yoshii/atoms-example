import { Story } from "@storybook/react";
import React from "react";
import { LabeledInput } from "./LabeledInput";
// ______________________________________________________
//
const wait = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 600);
  });
  if (Math.random() > 0.5) throw Error("failed");
};
function useAsyncToggle<T>(props: {
  asyncFuntion: (event: React.ChangeEvent<HTMLInputElement>) => Promise<T>;
  handleSuccess?: (res: T) => void;
  handleError?: (err: any) => void;
}) {
  const [checked, setChecked] = React.useState(false);
  const [inProgress, setInProgress] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInProgress(true);
    props
      .asyncFuntion(event)
      .then((res) => {
        setInProgress(false);
        setChecked((prev) => !prev);
        props.handleSuccess && props.handleSuccess(res);
      })
      .catch((err) => {
        setInProgress(false);
        props.handleError && props.handleError(err);
      });
  };
  return [{ checked, inProgress }, { handleChange }] as const;
}
// ______________________________________________________
//
const Template: Story = () => {
  const [values, handlers] = useAsyncToggle({
    asyncFuntion: wait,
    handleError: () => {
      alert("random fail");
    },
  });
  return (
    <table>
      <tbody>
        <tr>
          <td style={{ width: "200px" }}>
            <h2>Radio</h2>
            <div>
              <LabeledInput
                shape="radio"
                inputProps={{
                  type: "radio",
                  name: "n1",
                  value: "0",
                }}
              >
                YES
              </LabeledInput>
              <br />
              <LabeledInput
                shape="radio"
                inputProps={{
                  type: "radio",
                  name: "n1",
                  value: "1",
                }}
              >
                NO
              </LabeledInput>
              <br />
              <LabeledInput
                shape="radio"
                inputProps={{
                  type: "radio",
                  name: "n1",
                  value: "2",
                  disabled: true,
                }}
              >
                Disabled
              </LabeledInput>
            </div>
          </td>
          <td style={{ width: "200px" }}>
            <h2>Checkbox</h2>
            <div>
              <LabeledInput
                shape="checkbox"
                inputProps={{ type: "checkbox", name: "n2", value: "0" }}
              >
                YES
              </LabeledInput>
              <br />
              <LabeledInput
                shape="checkbox"
                inputProps={{ type: "checkbox", name: "n2", value: "1" }}
              >
                NO
              </LabeledInput>
              <br />
              <LabeledInput
                shape="checkbox"
                inputProps={{
                  type: "checkbox",
                  name: "n2",
                  value: "2",
                  disabled: true,
                }}
              >
                Disabled
              </LabeledInput>
            </div>
          </td>
          <td style={{ width: "300px" }}>
            <h2>Toggle</h2>
            <div>
              <LabeledInput
                shape="toggle"
                inputProps={{ type: "checkbox", name: "n3", value: "0" }}
              >
                Uncontrolled
              </LabeledInput>
              <br />
              <LabeledInput
                shape="toggle"
                inputProps={{
                  type: "checkbox",
                  name: "n3",
                  value: "1",
                  checked: values.checked,
                  disabled: values.inProgress,
                  onChange: handlers.handleChange,
                }}
              >
                {values.inProgress ? "loading..." : "Controlled AsyncToggle"}
              </LabeledInput>
              <br />
              <LabeledInput
                shape="toggle"
                inputProps={{
                  type: "checkbox",
                  name: "n3",
                  value: "2",
                  disabled: true,
                }}
              >
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
export const Index = Template.bind({});
export default {
  title: "atoms/LabeledInput",
};
