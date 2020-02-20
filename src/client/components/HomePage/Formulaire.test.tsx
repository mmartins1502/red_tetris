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
  test("should display a blank login form, with name and room", async () => {
    const { findByTestId } = renderFormulaire();

    const formulaire = await findByTestId("login-form");

    expect(formulaire).toHaveFormValues({});
  });

  test("should submit the form with username, password, and remember", async () => {
    const onFormValidated = jest.fn();
    const { findByTestId } = renderFormulaire({
      onFormValidated
    });
    const name = await findByTestId("name");
    const roomChoice = await findByTestId("roomChoice");
    const submit = await findByTestId("submit");

    fireEvent.change(name, { target: { value: "test Name" } });
    fireEvent.change(roomChoice, { target: { value: "test Room" } });
    fireEvent.click(submit);

    expect(onFormValidated).toHaveBeenCalledWith({
      id: "",
      name: "test Name",
      room: "test Room"
    });
  });
});
