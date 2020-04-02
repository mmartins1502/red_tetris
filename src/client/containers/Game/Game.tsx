import React, { FC, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Player, iPlayer } from "../../../Shared/models/Player";
import { Room, iRoom } from "../../../Shared/models/Room";

import * as actions from "../../store/actions/index";
import { IAppState } from "../../store";
import { History } from "history";
import { withRouter } from "react-router";
import Grid from "../../components/Game/Grid/Grid";

import "./Game.css";
import NextPieces from "../../components/Game/NextPieces/NextPieces";
import GameOver from "../../components/Game/GameOver/GameOver";
import Spectrum from '../../components/Game/Spectrum/Spectrum'
import Logo from "../../components/UI/Logo/Logo";
import CountDown from "../../components/Game/CountDown/CountDown";



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
}

const Game: FC<IProps> = (props) => {

const gamePage = useRef(null)

const {onRefreshPlayer, onRereshRoom} = props

const {onRefreshPlayerAsk, player, room} = props

console.log("[Game] props", props);

  
  useEffect(() => {
    gamePage.current.focus()
    onRereshRoom()
    onRefreshPlayer()
    props.onInitialBoard(props.player, props.room)
    // eslint-disable-next-line
  }, [onRefreshPlayer, onRereshRoom])

  useEffect(() => {
    // AUTOMATIC MOVE
    let interval = null;
    if (room.inGame && !player.board.gameOver) {
      interval = setInterval(() => {
        onRefreshPlayerAsk(player, room, "ArrowDown")
      }, room.speed);
     }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [room, player, onRefreshPlayerAsk]);





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
    console.log("'" + e.key + "'")
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === " ") {
      props.onRefreshPlayerAsk(props.player, props.room, e.key)
    } else if (e.key === "ArrowUp" && !props.room.settingsRoom.options.noRotation) {
      props.onRefreshPlayerAsk(props.player, props.room, e.key)
    }
  }

  let spectrum = (props.room.settingsRoom.mode.solo || props.room.settingsRoom.difficulty.hard) ? null : <div className="Adversaire"><Spectrum room={props.room} player={props.player} /></div>
  let countDown = (props.room.settingsRoom.options.faster) ? <CountDown speedUp={speedUp} /> : null
  let score = (
    <div className="Score">
      <div style={{color: "black"}}>Score: {props.player.account.points}</div>
      <div style={{color: "black"}}>Lines: {props.player.account.lines}</div>
    </div>
  )

  return (
    <div className="GamePage" style={{ position: "absolute" }} tabIndex={0} ref={gamePage}  onKeyDown={(e) => handleKeyPress(e)}>
      <button onClick={() => leaveRoom()}>QUIT</button>
      <div className="Game">
        <div className="Right">
          <Grid board={props.player.board}/>
          <div className="NextAndScore">
            <NextPieces index={props.player.listIdx} list={props.room.piecesList} />
            {score}
            {countDown}
          </div>
        </div>
        {props.player.board.gameOver ? <GameOver /> : null}
        <div className="Side">
          <Logo />
          {spectrum}
          <div className="Commands">
            <h4>Commands</h4>
            <span>← : move left</span>
            <span>→ : move right</span>
            <span>↑ : rotate piece</span>
            <span>↓ : move down</span>
            <span>space : drop piece</span>
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
    onSpeedUp: (speed: number) => actions.speedUp(speed)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
