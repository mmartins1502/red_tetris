import React, { SFC } from "react";
import "./roomActions.module.css";


import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { Player } from "../../../Shared/models/Player";
import { Room } from "../../../Shared/models/Room";

export interface IProps {
  me: Player;
  room: Room;
  startGame: () => void;
  leaveRoom: () => void;
  ready: () => void;
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

  let startAndReady =
    (props.room && props.me && props.room.star.id !== props.me.id) ? (
      <Button
        name="ready"
        data-testid="ready"
        onClick={props.ready}
        style={{ color: "#d40e0e" }}
      >
        READY
      </Button>
    ) : (
      <Button
        name="start"
        data-testid="start"
        onClick={props.startGame}
        style={{ color: "#d40e0e" }}
      >
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
        {startAndReady}
        <Button
          name="quit"
          data-testid="quit"
          onClick={props.leaveRoom}
          style={{ color: "#d40e0e" }}
        >
          QUIT
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default roomActions;
