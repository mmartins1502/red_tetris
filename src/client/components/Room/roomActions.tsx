import React, { SFC } from "react";
import "./roomActions.module.css";
import { Player } from "../../models/Player";
import { Room } from "../../models/Room";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  me: Player;
  room: Room;
  startGame: () => void;
  leaveRoom: () => void;
}

const roomActions: SFC<IProps> = (props) => {
  const usestyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1)
      }
    }
  }));

  const classes = usestyles();

  let start =
    props.room.star.id !== props.me.id ? null : (
      <Button onClick={props.startGame} style={{ color: "#d40e0e" }}>
        START
      </Button>
    );
  return (
    <div className={classes.root}>
      <ButtonGroup
        orientation="vertical"
        color="secondary"
        aria-label="vertical outlined primary button group"
        style={{ border: "#d40e0e" }}
      >
        {start}
        <Button onClick={props.leaveRoom} style={{ color: "#d40e0e" }}>
          QUIT
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default roomActions;
