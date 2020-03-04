import React, { useEffect, FC } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

//IMPORT MODELS
import { Player } from "../../models/Player";
import { Room } from "../../models/Room";

//IMPORT COMPONENTS
import PlayersList from "../../components/Room/roomPlayersList";
import RoomActions from "../../components/Room/roomActionsButtons";
import Logo from "../../components/UI/Logo/Logo";
import Game from "../Game/Game";

//IMPORT STORE
import * as actions from "../../store/actions/index";
import { IAppState } from "../../store";

import { Alert } from "@material-ui/lab";
import Slide from "@material-ui/core/Slide";

// IMPORT CSS
const classes = require("./RoomHome.module.css");

interface IProps extends RouteComponentProps {
  room: Room;
  player: Player;
  error: string;
  onRereshRoom: () => void;
  onleaveRoom: (me: Player, room: Room) => void;
  onStartGame: (room: Room) => void;
  onReady: (me: Player, room: Room) => void;
}

const RoomHome: FC<IProps & RouteComponentProps<{}>> = (props) => {
  console.log("props.room", props.room);
  const { onRereshRoom } = props;

  useEffect(() => {
    onRereshRoom();
  }, [onRereshRoom]);

  const me = props.player;

  const leaveRoom = () => {
    props.onleaveRoom(me, props.room);
    props.history.replace("/");
  };

  const startGame = () => {
    props.onStartGame(props.room);
  };

  const ready = () => {
    props.onReady(me, props.room);
  };

  let playersAndButtons = (
    <div className={classes.Box}>
      <h4>ROOM #{props.room ? props.room.id : null}</h4>
      <div className={classes.Players_actions}>
        <PlayersList room={props.room} player={me} />
        <RoomActions
          room={props.room}
          me={me}
          leaveRoom={() => leaveRoom()}
          startGame={() => startGame()}
          ready={() => ready()}
        />
      </div>

      {/* <p>{props.error ? props.error : null}</p> */}
    </div>
  );

  if (!props.room || !props.room.players || props.room.players.length < 1) {
    console.log("nobody in the room");
    props.history.replace("/");
  }

  if (props.room && props.room.inGame === true) {
    return <Game />;
  }

  return (
    <div className={classes.RoomHome}>
      <Logo />
      {playersAndButtons}
      {props.error ? (
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
      ) : null}
    </div>
  );
};

const mapStateToProps = (store: IAppState) => {
  return {
    player: store.socketState.player,
    room: store.socketState.room,
    error: store.socketState.error
  };
};

const mapDispatchToProps = {
  onleaveRoom: (me: Player, room: Room) => actions.leaveRoom(me, room),
  onRereshRoom: () => actions.refreshRoom(),
  onStartGame: (room: Room) => actions.startGame(room),
  onReady: (me: Player, room: Room) => actions.ready(me, room)
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomHome);
