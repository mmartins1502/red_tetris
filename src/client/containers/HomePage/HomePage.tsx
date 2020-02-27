import React, { useState, useEffect, FC } from "react";
import { connect } from "react-redux";

//IMPORT MODELS
import { Player } from "../../models/Player";
import { Room } from "../../models/Room";

//COMPONENTS
import Formulaire from "../../components/HomePage/Formulaire";
import * as actions from "../../store/actions/roomActions";
import { IAppState } from "../../store";
import { Redirect } from "react-router-dom";
import Logo from "../../components/UI/Logo/Logo";

import { Alert } from "@material-ui/lab";
import Slide from "@material-ui/core/Slide";

// CSS & IMG
// const classes = require("./HomePage.module.css");
import "./HomePage.css";

interface IProps {
  room: Room;
  player: Player;
  error: string;
  onCreatePlayerId: () => void;
  onFormValidated: (formData: Player) => void;
  onRoomNumber: () => void;
}

export const HomePage: FC<IProps> = (props) => {
  console.log("[HomePage] props", props);
  const [state, setState] = useState<any>({
    redirect: false
  });

  const { onCreatePlayerId } = props;

  useEffect(() => {
    console.log("[useEffect] call onCreatePlayerId()");
    onCreatePlayerId();
    // eslint-disable-next-line
  }, [onCreatePlayerId]);

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

  // let error = props.error ? (
  //   <Slide direction="left" in={props.error !== ""} mountOnEnter unmountOnExit>
  //     <Alert style={{ margin: "10px" }} severity="error">
  //       {props.error}
  //     </Alert>
  //   </Slide>
  // ) : null;

  return (
    <div className="Box">
      <Logo />
      <div className="BoxInput">
        <h2 className="BoxTitle">WELCOME</h2>
        <Formulaire onFormValidated={(formData) => formValidation(formData)} />
      </div>
      <Slide
        direction="left"
        in={props.error !== ""}
        mountOnEnter
        unmountOnExit
      >
        <Alert style={{ margin: "10px" }} severity="error">
          {props.error}
        </Alert>
      </Slide>
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
