import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

import Formulaire, { Props } from "./Formulaire";

function renderFormulaire(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    onFormValidated() {
      return;
    }
  };

  return render(<Formulaire {...defaultProps} {...props} />);
}

describe("<Formulaire />", () => {
  test("should test name and room input and the submit button", async () => {
    const onFormValidated = jest.fn();
    const { getByTestId } = renderFormulaire({
      onFormValidated
    });

    const name = await getByTestId("name");
    const roomChoice = await getByTestId("room");
    const submit = await getByTestId("submit");

    fireEvent.change(name, { target: { value: "test Name" } });
    fireEvent.change(roomChoice, { target: { value: "test Room" } });
    fireEvent.click(submit);

    expect(onFormValidated).toHaveBeenCalledWith({
      id: "",
      name: "test Name",
      room: "test Room",
      state: false
    });
  });
});
