import React, { FC } from "react";
import { connect } from "react-redux";

import { Player } from "../../models/Player";
import { Room } from "../../models/Room";

import Button from "../../components/UI/Button/Button";

import * as actions from "../../store/actions/index";
import { IAppState } from "../../store";
import { History } from "history";
import { withRouter } from "react-router";
import Grid from "../../components/Game/Grid/Grid";

// import Grid from "../../components/Grid/Grid";
// import arrows from "../../assets/images/keyArrows.png";
// import space from "../../assets/images/space_bar.png";

const classes = require("./Game.module.css");

interface IProps {
  history: History;
  room: Room;
  player: Player;
  onRereshRoom: () => void;
  onleaveRoom: (me: Player, room: Room) => void;
}

const Game: FC<IProps> = (props) => {
  console.log("props", props);
  const leaveRoom = () => {
    props.onleaveRoom(props.player, props.room);
    // props.history.go(-1);
    props.history.replace("/");
  };

  return (
    <div>
      <Button btnType="Danger" clicked={() => leaveRoom()}>
        QUIT
      </Button>
      <div className={classes.Game}>
        <Grid />
        <div className={classes.Side}>
          <div className={classes.Adversaire}>Adversaire</div>
          <div className={classes.Commands}>
            <h4>Commands</h4>
            <span>← : move left</span>
            <span>→ : move right</span>
            <span>↑ : rotate piece</span>
            <span>↓ : move down</span>
            <span>space : drop piece</span>
          </div>
          <div className={classes.Next}>next piece</div>
        </div>
      </div>
      {/* <div className={classes.Move}>
        <img className={classes.Arrows} src={arrows} alt="move" />
        <div className={classes.Space}>
          <img className={classes.SpaceBar} src={space} alt="space" />
        </div>
      </div> */}
    </div>
  );
};

const mapStateToProps = (store: IAppState) => {
  return {
    // playerId: store.socketState.player.id,
    player: store.socketState.player,
    room: store.socketState.room
    // error: store.socketState.error
  };
};

const mapDispatchToProps = {
  onleaveRoom: (me: Player, room: Room) => actions.leaveRoom(me, room),
  onRereshRoom: () => actions.refreshRoom()
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
