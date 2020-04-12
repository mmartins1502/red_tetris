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
import SettingsModal from "../../components/UI/Modal/SettingsModal";
import MusicButton from "../../components/UI/Music/MusicButton";
import Settings from "../../components/Room/Settings";

//IMPORT STORE
import * as actions from "../../store/actions/index";
import { IAppState } from "../../store";

//MATERIAL-UI
import { Alert } from "@material-ui/lab";
import Slide from "@material-ui/core/Slide";

// IMPORT CSS
import "./RoomHome.css"

interface IProps extends RouteComponentProps {
  room: iRoom;
  player: iPlayer;
  error: string;
  music: any;
  onCreatePlayerId: () => void;
  onFormValidated: (newPlayer: iPlayer) => void;
  onRoomNumber: () => void;
  onRereshRoom: () => void;
  onRefreshPlayer: () => void;
  onleaveRoom: (me: iPlayer, room: iRoom) => void;
  onStartGame: (room: iRoom) => void;
  // onReady: (me: iPlayer, room: iRoom) => void;
  onleaveRoomReducer: () => void
  onSettingsChanged: (settings: iSettings) => void
  handleMusic: (music: any) => void
  resetPlayer: () => void

}

const RoomHome: FC<IProps & RouteComponentProps<{}>> = (props) => {
  // console.log("[RoomHome] props", props);
  const { onRereshRoom, onFormValidated, onRoomNumber, onCreatePlayerId, onRefreshPlayer, resetPlayer } = props;
  const {room, player} = props
  const params = useParams<{playerName: string, room: string}>()

  // // const player = props.player.id ? room.players.find((play: iPlayer) => play.id === player.id) : props.player
  // useEffect(() => {
  //   if (props.player.id && room.id !== "") {
  //     props.player = room.players.find((play: iPlayer) => play.id === props.player.id)
  //   }
  // })
  // const {player} = props


  useEffect(() => {
    if(!player.id) {
      onCreatePlayerId()
    } else if (room.id === "") {
      const newPlayer: iPlayer = new Player(player.id, params.playerName, params.room)
      onFormValidated(newPlayer)
      onRoomNumber()
    }
  }, [player, room.id, onCreatePlayerId, onFormValidated, onRoomNumber, params])

  useEffect(() => {
    onRefreshPlayer()
    onRereshRoom();
    resetPlayer()
  }, [onRereshRoom, onRefreshPlayer, resetPlayer]);

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

  // const ready = () => {
  //   props.onReady(me, props.room);
  // };

  let playersAndButtons = (
    <div className="BoxRoomHome">
      <h4>ROOM #{props.room ? props.room.id : null}</h4>
      <div className="Players_actions">
        <PlayersList room={props.room} player={me} />
        <RoomActions
          room={props.room}
          me={me}
          leaveRoom={() => leaveRoom()}
          startGame={() => startGame()}
          // ready={() => ready()}
        />
      </div>
    </div>
  );

  let settingsOwner = null
  if (props.player.id !== "" && props.room.star !== undefined && props.player.id === props.room.star.id) {
    const playersNb: number = props.room.players.length
    settingsOwner = (
      <SettingsModal>
        <Settings playersNb={playersNb} onSettingsChanged={(settings) => onSettingsChanged(settings)}  />
      </SettingsModal>
    )
  }
  
  if (props.room && props.room.inGame === true && props.room.game.location === "Game") {
    return <Game />;
  }

  return (
    <div>
      <MusicButton music={props.music} musicOn={(music) => props.handleMusic(music)} />
      {settingsOwner}
      <div className="RoomHome">
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
    player: store.roomState.player,
    room: store.roomState.room,
    error: store.roomState.error,
    music: store.roomState.music
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
  onRefreshPlayer: () => actions.refreshPlayer(),
  onStartGame: (room: iRoom) => actions.startGame(room),
  // onReady: (me: iPlayer, room: iRoom) => actions.ready(me, room),
  onSettingsChanged: (settings: iSettings) => actions.settingsChanged(settings),
  handleMusic: (music: any) => actions.music(music),
  resetPlayer: () => actions.resetPlayer()

};

export default connect(mapStateToProps, mapDispatchToProps)(RoomHome);
