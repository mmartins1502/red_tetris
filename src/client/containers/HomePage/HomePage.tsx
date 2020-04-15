import React from "react";
import { connect } from "react-redux";

//IMPORT MODELS
import { iPlayer } from "../../../Shared/models/Player";
import { iRoom } from "../../../Shared/models/Room";

//COMPONENTS
import Formulaire from "../../components/HomePage/Formulaire";
import * as actions from "../../store/actions/roomActions";
import { IAppState } from "../../store";
import { Redirect } from "react-router-dom";
import Logo from "../../components/UI/Logo/Logo";
import MusicButton from "../../components/UI/Music/MusicButton";
import { Alert } from "@material-ui/lab";
import Slide from "@material-ui/core/Slide";

// CSS & IMG
import "./HomePage.css";

interface IProps {
  playerId: string;
  room: iRoom;
  player: iPlayer;
  error: string;
  redirect: boolean;
  music: any
  onCreatePlayerId: () => void;
  onFormValidated: (formData: iPlayer) => void;
  onRoomNumber: () => void;
  handleMusic: (music: any) => void
}

export const HomePage: React.FC<IProps> = (props) => {
  // console.log("[HomePage] props", props);
  const { onCreatePlayerId } = props;

  React.useEffect(() => {
    onCreatePlayerId();
  }, [onCreatePlayerId]);

  const formValidation = (formData: any) => {
    formData.id = props.player.id;
    props.onFormValidated(formData);
    props.onRoomNumber();
  };

  

  if (props.redirect && props.room.id && props.player.name && !props.error) {
    return <Redirect to={`/${props.room.id}[${props.player.name}]`} />;
  }

  return (
    <div>
      <MusicButton music={props.music} musicOn={(music) => props.handleMusic(music)} />
      <div className="BoxHomePage">
        <Logo />
        <div className="BoxInput">
          <h2 className="BoxTitle">WELCOME</h2>
          <Formulaire
            onFormValidated={(formData) => formValidation(formData)}
          />
        </div>
        <Slide
          direction="left"
          in={props.error !== "" && props.error !== undefined}
          mountOnEnter
          unmountOnExit
        >
          <Alert style={{ margin: "10px" }} severity="error">
            {props.error}
          </Alert>
        </Slide>
      </div>
    </div>
  );
};

export const mapStateToProps = (store: IAppState) => {
  return {
    playerId: store.roomState.player.id,
    player: store.roomState.player,
    room: store.roomState.room,
    error: store.roomState.error,
    redirect: store.roomState.redirect,
    music: store.roomState.music
  };
};

export const mapDispatchToProps = {
  onCreatePlayerId: () => actions.createPlayerId(),
  onFormValidated: (formData: any) => actions.checkRoom(formData),
  onRoomNumber: () => actions.roomHomeInfos(),
  handleMusic: (music: any) => actions.music(music)
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
