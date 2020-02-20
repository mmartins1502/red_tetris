import React, { SFC } from "react";
// CSS
import "./Button.module.css";

interface IProps {
  disabled?: boolean;
  btnType: string;
  clicked?: () => void;
}

const Button: SFC<IProps> = (props) => (
  <button
    data-testid="submit"
    disabled={props.disabled}
    className={["Button", [props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default Button;
