import React, { useState, useEffect, FC } from "react";
import { connect } from "react-redux";

//IMPORT MODELS
import { Player } from "../../models/Player";
import { Room } from "../../models/Room";

//COMPONENTS
import Formulaire from "../../components/HomePage/Formulaire";
import * as actions from "../../store/actions/socket";
import { IAppState } from "../../store";
import { Redirect } from "react-router-dom";

// CSS & IMG
const classes = require("./HomePage.module.css");

interface IProps {
  room: Room;
  player: Player;
  error: string;
  onCreatePlayerId: () => void;
  onFormValidated: (formData: Player) => void;
  onRoomNumber: () => void;
}

const HomePage: FC<IProps> = (props) => {
  console.log("[HomePage] props", props);
  const [state, setState] = useState<any>({
    redirect: false
  });

  useEffect(() => {
    console.log("[useEffect] call onCreatePlayerId()");
    props.onCreatePlayerId();
    // eslint-disable-next-line
  }, []);

  const formValidation = (formData: Player) => {
    formData.id = props.player.id;
    props.onFormValidated(formData);
    props.onRoomNumber();
    setState({
      ...state,
      redirect: true
    });
  };

  if (state.redirect && props.room.id && props.player.name && !props.error) {
    return <Redirect to={`/${props.room.id}[${props.player.name}]`} />;
  }

  return (
    <div className={classes.Box}>
      <h1>HomePage</h1>
      <div className={classes.BoxInput}>
        <h2 className={classes.BoxTitle}>WELCOME ON RED TETRIS</h2>
        <Formulaire onFormValidated={(formData) => formValidation(formData)} />
        <p className={classes.Invalid}>{props.error}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (store: IAppState) => {
  return {
    playerId: store.socketState.player.id,
    player: store.socketState.player,
    room: store.socketState.room,
    error: store.socketState.error
  };
};

const mapDispatchToProps = {
  onCreatePlayerId: () => actions.createPlayerId(),
  onFormValidated: (formData: Player) => actions.checkRoom(formData),
  onRoomNumber: () => actions.roomHomeInfos()
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
