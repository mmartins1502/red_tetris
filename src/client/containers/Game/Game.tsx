import React, { FC, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Player, iPlayer } from "../../../Shared/models/Player";
import { Room, iRoom } from "../../../Shared/models/Room";

import * as actions from "../../store/actions/index";
import { IAppState } from "../../store";
import { History } from "history";
import { withRouter } from "react-router";
import Grid from "../../components/Game/Grid/Grid";
import useInterval from '@use-it/interval'

import "./Game.css";
import NextPieces from "../../components/Game/NextPieces/NextPieces";
import GameOver from "../../components/Game/GameOver/GameOver";
import Spectrum from '../../components/Game/Spectrum/Spectrum'
import Logo from "../../components/UI/Logo/Logo";
import CountDown from "../../components/Game/CountDown/CountDown";
import { Button } from "@material-ui/core";
import Life from "../../components/Game/Life/Life";



interface IProps {
  history: History;
  room: iRoom;
  player: iPlayer;
  onRereshRoom: () => void;
  onleaveRoom: (me: iPlayer, room: iRoom) => void;
  onRefreshPlayerAsk: (me: iPlayer, room: iRoom, move: string) => void;
  onInitialBoard: (me: iPlayer, room: iRoom) => void;
  onRefreshPlayer: () => void;
  onleaveRoomReducer: () => void
  onSpeedUp: (speed: number) => void
  onResetRoomParams: (player: iPlayer, room: iRoom) => void
  resetPlayer: () => void
}

const Game: FC<IProps> = (props) => {
const gamePage = useRef(null)
const {onRefreshPlayer, onRereshRoom, resetPlayer} = props
const {onRefreshPlayerAsk, player, room} = props
console.log("[Game] props", props);
  
  useEffect(() => {
    gamePage.current.focus()
    onRereshRoom()
    onRefreshPlayer()
    resetPlayer()
    props.onInitialBoard(props.player, props.room)
    // eslint-disable-next-line
  }, [onRefreshPlayer, onRereshRoom, resetPlayer])

  // useEffect(() => {
  //   // AUTOMATIC MOVE
  //   let interval = null;
  //   if (room.inGame && !player.board.gameOver) {
  //     interval = setInterval(() => {
  //       onRefreshPlayerAsk(player, room, "ArrowDown")
  //     }, room.speed);
  //    }
  //   return () => clearInterval(interval);
  //   // eslint-disable-next-line
  // }, [player, room, onRefreshPlayerAsk]);

  useInterval(() => {
    onRefreshPlayerAsk(player, room, "ArrowDown")
  }, room.speed)



  const leaveRoom = () => {
    props.onleaveRoom(props.player, props.room);
    props.onleaveRoomReducer()
    props.history.replace("/");
  };

  const speedUp = () => {
    let newSpeed: number = props.room.speed
    newSpeed = (newSpeed / 8) * 7
    props.onSpeedUp(newSpeed)
  }

  const handleKeyPress = (e) => {
    e.preventDefault()
    if ((e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === " ") && !props.player.board.gameOver) {
      props.onRefreshPlayerAsk(props.player, props.room, e.key)
    } else if (e.key === "ArrowUp" && !props.room.settingsRoom.options.noRotation && !props.player.board.gameOver) {
      props.onRefreshPlayerAsk(props.player, props.room, e.key)
    }
  }

  let life = (!props.room.settingsRoom.difficulty.hard && props.room.settingsRoom.difficulty.easy) ? <Life life={props.player.account.life} /> : null;
  let spectrum = (props.room.settingsRoom.mode.solo || props.room.settingsRoom.difficulty.hard) ?  null : <div className="Adversaire"><Spectrum room={props.room} player={props.player} /></div>
  let countDown = (props.room.settingsRoom.options.faster) ? <CountDown speedUp={speedUp} /> : null
  let score = (
    <div className="Score">
      <div style={{color: "black"}}>Score: {props.player.account.points}</div>
      <div style={{color: "black"}}>Lines: {props.player.account.lines}</div>
    </div>
  )

  let quitButton = (
    <Button
          name="quit"
          data-testid="quit"
          onClick={() => leaveRoom()}
          style={{ color: "#d40e0e" }}
        >
          (RAGE)QUIT
        </Button>
  )

  const goBackToRoom = () => {
    // console.log('[goBackToRoom] Button clicked')
    props.onResetRoomParams(props.player, props.room)
    // props.history.replace(`/${props.room.id}[${props.player.name}]`)
  }

  if ( props.room.game.location === "Room") {
    props.history.replace(`/${props.room.id}[${props.player.name}]`)
  }

  return (
    <div>
      <div className="GamePage" style={{ position: "absolute" }} tabIndex={0} ref={gamePage}  onKeyDown={(e) => handleKeyPress(e)}>
      <Logo />
        <div className="Game">
          <div className="Left">
            <Grid board={props.player.board}/>
            <div className="NextAndScore">
              <NextPieces index={props.player.listIdx} list={props.room.piecesList} />
              {score}
              {life}
              {countDown}
              {quitButton}
            </div>
          </div>
          {props.player.board && props.player.board.gameOver ? <GameOver goBack={() => goBackToRoom()} player={props.player} room={props.room} /> : null}
          <div className={(props.room.settingsRoom.mode.solo || props.room.settingsRoom.difficulty.hard) ?  "" : "Right"}>
            {spectrum}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store: IAppState) => {
  return {
    player: store.roomState.player,
    room: store.roomState.room,
    error: store.roomState.error
  };
};

const mapDispatchToProps = {
    onleaveRoom: (me: Player, room: Room) => actions.leaveRoom(me, room),
    onleaveRoomReducer: () => actions.leaveRoomReducer(),
    onRereshRoom: () => actions.refreshRoom(),
    onRefreshPlayerAsk: (me: Player, room: Room, move: string) => actions.refreshPlayerAsk(me, room, move),
    onRefreshPlayer: () => actions.refreshPlayer(),
    onInitialBoard: (me: Player, room: Room) => actions.initBoard(me, room),
    onSpeedUp: (speed: number) => actions.speedUp(speed),
    onResetRoomParams: (player: iPlayer, room: iRoom) => actions.onResetRoomParams(player, room),
    resetPlayer: () => actions.resetPlayer()
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
