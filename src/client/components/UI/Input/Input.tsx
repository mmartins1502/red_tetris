import React, { SFC, ChangeEvent } from "react";

import "./Input.css";

export interface IProps {
  touched: boolean;
  elementType: string;
  elementConfig: any;
  value: string;
  changed: any;
  label?: string;
  name: string;
}

const Input: SFC<IProps> = (props) => {
  let inputElement = null;
  const inputClasses = ["InputElement"];

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          data-testid={props.name}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          data-testid={props.name}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
