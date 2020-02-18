import React from "react";
import Button from "../../components/UI/Button/Button";
import classes from "./roomActions.module.css";

const roomActions = (props) => {
  let start =
    props.room.star.id !== props.me.id ? null : (
      <Button
        btnType="Success"
        disabled={props.room.star.id !== props.me.id}
        clicked={props.startGame}
      >
        START
      </Button>
    );
  return (
    <div className={classes.Actions_list}>
      {start}
      <Button btnType="Danger" clicked={props.leaveRoom}>
        QUIT
      </Button>
    </div>
  );
};

export default roomActions;
