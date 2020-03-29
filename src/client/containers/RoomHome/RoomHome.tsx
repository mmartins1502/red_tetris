import React, { useEffect, FC } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";

//IMPORT MODELS
import { Player } from "../../../Shared/models/Player"
import { Room } from "../../../Shared/models/Room";


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
  room: Room;
  player: Player;
  error: string;
  ////////////////////////////////
  onCreatePlayerId: () => void;
  onFormValidated: (formData: Player) => void;
  onRoomNumber: () => void;
  ////////////////////////////////
  onRereshRoom: () => void;
  onleaveRoom: (me: Player, room: Room) => void;
  onStartGame: (room: Room) => void;
  onReady: (me: Player, room: Room) => void;
  onleaveRoomReducer: () => void
  onSettingsChanged: (settings: any) => void
}

const RoomHome: FC<IProps & RouteComponentProps<{}>> = (props) => {
  console.log("props.room", props.room);
  const { onRereshRoom, room, onCreatePlayerId, onFormValidated, onRoomNumber } = props;

  const {roomNAme, playerName} = useParams()
  
  useEffect(() => {
    if (!room) {
      onCreatePlayerId()
      let newPlayer = new Player(props.player.id, playerName, roomNAme)
      onFormValidated(newPlayer)
      onRoomNumber()
    }
    // eslint-disable-next-line
  }, [room, onCreatePlayerId, onFormValidated, onRoomNumber])

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
  let settingsOwner = null
  if (props.player.id === props.room.star.id) {
    const playersNb: number = props.room.players.length
    settingsOwner = (
      <SettingsModal>
        <Settings playersNb={playersNb} onSettingsChanged={(settings) => onSettingsChanged(settings)} />
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
  onFormValidated: (newPlayer: Player) => actions.checkRoom(newPlayer),
  onRoomNumber: () => actions.roomHomeInfos(),
  /////////////////////////////////////////////////
  onleaveRoom: (me: Player, room: Room) => actions.leaveRoom(me, room),
  onleaveRoomReducer: () => actions.leaveRoomReducer(),
  onRereshRoom: () => actions.refreshRoom(),
  onStartGame: (room: Room) => actions.startGame(room),
  onReady: (me: Player, room: Room) => actions.ready(me, room),
  onSettingsChanged: (settings: any) => actions.settingsChanged(settings)
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomHome);
