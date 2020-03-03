import React, { useState, ChangeEvent, FormEvent } from "react";

import { Player } from "../../models/Player";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./Formulaire.css";

export interface Props {
  onFormValidated: (formData: Player) => void;
}

const Forrmulaire2: React.FC<Props> = (props) => {
  const [state, setState] = useState<Player>({
    id: "",
    name: "",
    room: "",
    state: false
  });

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      name: e.target.value
    });
  };

  const changeRoomHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      room: e.target.value
    });
  };

  const formHandler = (e: FormEvent) => {
    e.preventDefault();
    const formData: Player = { ...state };
    props.onFormValidated(formData);
  };

  return (
    <form className="Form" noValidate autoComplete="off">
      <div className="Input">
        <TextField
          inputProps={{
            "data-testid": "name"
          }}
          color="secondary"
          label="Name"
          variant="outlined"
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeNameHandler(e)}
        />
      </div>
      <div className="Input">
        <TextField
          inputProps={{
            "data-testid": "room"
          }}
          color="secondary"
          label="Room"
          variant="outlined"
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeRoomHandler(e)}
        />
      </div>
      <Button
        name = "submit"
        data-testid="submit"
        onClick={(e: FormEvent) => formHandler(e)}
        classes={{ label: "Button" }}
      >
        Go to room
      </Button>
    </form>
  );
};

export default Forrmulaire2;
