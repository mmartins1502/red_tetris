import React, { useState, FC, ChangeEvent, FormEvent } from "react";

import { Player } from "../../models/Player";

import Input from "../../components/UI/Input/Input";
import Button from "../UI/Button/Button";

const classes = require("./Formulaire.module.css");

export interface Props {
  onFormValidated: (formData: Player) => void;
}

const Formulaire: FC<Props> = (props: Props) => {
  const [state, setstate] = useState({
    form: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name"
        },
        value: "",
        touched: false
      },
      roomChoice: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "#Room"
        },
        value: "",
        touched: false
      }
    },
    formIsValid: false
  });

  const inputChangedHandler = (
    e: ChangeEvent<HTMLInputElement>,
    inputIdentifer: string
  ) => {
    const updatedForm = {
      ...state.form
    };
    let updatedFormElement;
    inputIdentifer === "name"
      ? (updatedFormElement = {
          ...updatedForm.name
        })
      : (updatedFormElement = {
          ...updatedForm.roomChoice
        });
    updatedFormElement.value = e.target.value;

    updatedFormElement.touched = true;
    inputIdentifer === "name"
      ? (updatedForm.name = updatedFormElement)
      : (updatedForm.roomChoice = updatedFormElement);

    let formIsValid = true;

    setstate({
      ...state,
      form: updatedForm,
      formIsValid: formIsValid
    });
  };

  const formHandler = (props: Props, e: FormEvent) => {
    e.preventDefault();

    const formData: Player = {
      id: "",
      name: "",
      room: ""
    };

    for (let formElementIdentifer in state.form) {
      if (formElementIdentifer === "name") {
        formData.name = state.form.name.value;
      } else {
        formData.room = state.form.roomChoice.value;
      }
    }

    props.onFormValidated(formData);
  };

  const formElementsArray = [];
  for (let key in state.form) {
    formElementsArray.push({
      id: key,
      config: key === "name" ? state.form.name : state.form.roomChoice
    });
  }

  return (
    <form
      data-testid="login-form"
      className={classes.Form}
      onSubmit={(e) => formHandler(props, e)}
    >
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          name={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          touched={formElement.config.touched}
          changed={(e: ChangeEvent<HTMLInputElement>) =>
            inputChangedHandler(e, formElement.id)
          }
        />
      ))}
      <Button btnType="Danger" disabled={!state.formIsValid}>
        PLAY
      </Button>
    </form>
  );
};

export default Formulaire;
