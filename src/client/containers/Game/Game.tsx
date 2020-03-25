import React, { FC, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Player } from "../../../Shared/models/Player";
import { Room } from "../../../Shared/models/Room";

import * as actions from "../../store/actions/index";
import { IAppState } from "../../store";
import { History } from "history";
import { withRouter } from "react-router";
import Grid from "../../components/Game/Grid/Grid";

import "./Game.css";
import NextPieces from "../../components/Game/NextPieces/NextPieces";
// const pieces = [
//   {
//       color: "cyan",
//   },
//   {
//       color: "blue",
//   },
//   {
//       color: "orange",
//   },
//   {    
//       color: "yellow",
//   },
//   {
//       color: "green",
//   },
//   {
//       color: "red",
//   },
//   {
//       color: "purple",
//   }
// ]


interface IProps {
  history: History;
  room: Room;
  player: Player;
  onRereshRoom: () => void;
  onleaveRoom: (me: Player, room: Room) => void;
  onRefreshPlayerAsk: (me: Player, room: Room, move: string) => void;
  onInitialBoard: (me: Player, room: Room) => void;
  onRefreshPlayer: () => void;
  onleaveRoomReducer: () => void
}

const Game: FC<IProps> = (props) => {

const gamePage = useRef(null)

const {onRefreshPlayer} = props
const {onRefreshPlayerAsk, player, room} = props
  
  useEffect(() => {
    gamePage.current.focus()
    onRefreshPlayer()
    props.onInitialBoard(props.player, props.room)
    // eslint-disable-next-line
  }, [onRefreshPlayer])

  useEffect(() => {
    // AUTOMATIC MOVE
    let interval = null;
    if (room.inGame && !player.board.gameOver) {
      interval = setInterval(() => {
        onRefreshPlayerAsk(player, room, "ArrowDown")
      }, room.speed);
     }
    return () => clearInterval(interval);
  }, [room, player, onRefreshPlayerAsk]);




  const leaveRoom = () => {
    props.onleaveRoom(props.player, props.room);
    props.onleaveRoomReducer()
    props.history.replace("/");
  };

  const handleKeyPress = (e) => {
    e.preventDefault()
    console.log("'" + e.key + "'")
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === " ") {
      props.onRefreshPlayerAsk(props.player, props.room, e.key)
    } 
  }

  return (
    <div className="GamePage" style={{ position: "absolute" }} tabIndex={0} ref={gamePage}  onKeyDown={(e) => handleKeyPress(e)}>
      <button onClick={() => leaveRoom()}>QUIT</button>
      <div className="Game">
        <Grid board={props.player.board}/>
        <NextPieces index={props.player.listIdx} list={props.room.piecesList} />
        {props.player.board.gameOver ? <h1 style={{color: 'black'}}>GAME OVER</h1> : null}
        <div className="Side">
          <div className="Adversaire">Adversaire</div>
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
    onInitialBoard: (me: Player, room: Room) => actions.initBoard(me, room)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
