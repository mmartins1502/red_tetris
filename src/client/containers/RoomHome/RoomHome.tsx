import React, { useEffect, FC } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

//IMPORT MODELS
import { Player } from "../../models/Player";
import { Room } from "../../models/Room";

import PlayersList from "../../components/Room/roomPlayersList";
import RoomActions from "../../components/Room/roomActions";
import Logo from "../../components/UI/Logo/Logo";
// import Game from "../Game/Game";

import * as actions from "../../store/actions/index";

import { IAppState } from "../../store";
import Game from "../Game/Game";
const classes = require("./RoomHome.module.css");

interface IProps extends RouteComponentProps {
  room: Room;
  player: Player;
  onRereshRoom: () => void;
  onleaveRoom: (me: Player, room: Room) => void;
  onStartGame: (room: Room) => void;
}

const RoomHome: FC<IProps & RouteComponentProps<{}>> = (props) => {
  useEffect(() => {
    if (props.room) {
      props.onRereshRoom();
    }
  });

  const me = props.player;

  const leaveRoom = () => {
    props.onleaveRoom(me, props.room);
    props.history.replace("/");
  };

  const startGame = () => {
    props.onStartGame(props.room);
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
        />
      </div>
    </div>
  );

  console.log("props", props);

  if (props.room && props.room.inGame === true) {
    return <Game />;
  }

  return (
    <div className={classes.RoomHome}>
      <Logo />
      {playersAndButtons}
    </div>
  );
};

const mapStateToProps = (store: IAppState) => {
  return {
    // playerId: store.socketState.player.id,
    player: store.socketState.player,
    room: store.socketState.room,
    error: store.socketState.error
  };
};

const mapDispatchToProps = {
  onleaveRoom: (me: Player, room: Room) => actions.leaveRoom(me, room),
  onRereshRoom: () => actions.refreshRoom(),
  onStartGame: (room: Room) => actions.startGame(room)
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomHome);
