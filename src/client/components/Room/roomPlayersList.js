import React from "react";

import classes from "./roomPlayersList.module.css";

const roomPlayersList = (props) => {
  const { room } = props;

  let playersList;

  if (!room) {
    playersList = null;
  } else {
    playersList = room.players.map((player) => {
      if (player.id === room.star.id && player.id !== props.player.id) {
        return <p key={player.id}>{player.name} (owner)</p>;
      }
      if (player.id === room.star.id && player.id === props.player.id) {
        return (
          <p key={player.id} style={{ color: "green" }}>
            {player.name} (owner)
          </p>
        );
      }
      if (player.id !== room.star.id && player.id === props.player.id) {
        return (
          <p key={player.id} style={{ color: "green" }}>
            {player.name}
          </p>
        );
      } else {
        return <p key={player.id}>{player.name}</p>;
      }
    });
  }
  return <div className={classes.PlayersList}>{playersList}</div>;
};

export default roomPlayersList;
