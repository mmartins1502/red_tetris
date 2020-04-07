import React, { useEffect, FC } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";

//IMPORT MODELS
import { Player, iPlayer } from "../../../Shared/models/Player"
import { iSettings, iRoom } from "../../../Shared/models/Room";


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
import SettingsModal from "../../components/UI/Modal/SettingsModal";
import MusicButton from "../../components/UI/Music/MusicButton";
import Settings from "../../components/Room/Settings";

// IMPORT CSS
const classes = require("./RoomHome.module.css");

interface IProps extends RouteComponentProps {
  room: iRoom;
  player: iPlayer;
  error: string;
  ////////////////////////////////
  onCreatePlayerId: () => void;
  onFormValidated: (newPlayer: iPlayer) => void;
  onRoomNumber: () => void;
  ////////////////////////////////
  onRereshRoom: () => void;
  onleaveRoom: (me: iPlayer, room: iRoom) => void;
  onStartGame: (room: iRoom) => void;
  onReady: (me: iPlayer, room: iRoom) => void;
  onleaveRoomReducer: () => void
  onSettingsChanged: (settings: iSettings) => void
  // onResetRoomParams: (player: iPlayer, room: iRoom) => void
}

const RoomHome: FC<IProps & RouteComponentProps<{}>> = (props) => {
  // console.log("[RoomHome] props", props);
  const { onRereshRoom, onFormValidated, onRoomNumber, onCreatePlayerId } = props;
  const {player, room} = props
  const params = useParams<{playerName: string, room: string}>()
  console.log('params', params)


  
  useEffect(() => {
    if(!player.id) {
      onCreatePlayerId()
    } else if (room.id === "") {
      const newPlayer: iPlayer = new Player(player.id, params.playerName, params.room)
      onFormValidated(newPlayer)
      onRoomNumber()
    }
  }, [player.id, room.id, onCreatePlayerId, onFormValidated, onRoomNumber, params])

  useEffect(() => {
    onRereshRoom();
  }, [onRereshRoom]);


  const me = props.player;
  const onSettingsChanged = (settings) => {
    props.onSettingsChanged(settings)
  }

  const leaveRoom = () => {
    props.onleaveRoom(me, props.room);
    props.onleaveRoomReducer()
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
    </div>
  );


  if (props.room && props.room.inGame === true) {
    return <Game />;
  }
  let settingsOwner = null
  console.log('props =>', props)
  if (props.player.id !== "" && props.room.star !== undefined && props.player.id === props.room.star.id) {
    const playersNb: number = props.room.players.length
    settingsOwner = (
      <SettingsModal>
        <Settings playersNb={playersNb} onSettingsChanged={(settings) => onSettingsChanged(settings)}  />
      </SettingsModal>
    )
  }

  return (
    <div>
      <MusicButton />
      {settingsOwner}
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
    </div>
  );
};

const mapStateToProps = (store: IAppState) => {
  return {
    playerId: store.roomState.player.id,
    player: store.roomState.player,
    room: store.roomState.room,
    error: store.roomState.error
  };
};

const mapDispatchToProps = {
  onCreatePlayerId: () => actions.createPlayerId(),
  onFormValidated: (newPlayer: iPlayer) => actions.checkRoom(newPlayer),
  onRoomNumber: () => actions.roomHomeInfos(),
  /////////////////////////////////////////////////
  onleaveRoom: (me: iPlayer, room: iRoom) => actions.leaveRoom(me, room),
  onleaveRoomReducer: () => actions.leaveRoomReducer(),
  onRereshRoom: () => actions.refreshRoom(),
  onStartGame: (room: iRoom) => actions.startGame(room),
  onReady: (me: iPlayer, room: iRoom) => actions.ready(me, room),
  onSettingsChanged: (settings: iSettings) => actions.settingsChanged(settings),
  // onResetRoomParams: (player: iPlayer, room: iRoom) => actions.onResetRoomParams(player, room)

};

export default connect(mapStateToProps, mapDispatchToProps)(RoomHome);
