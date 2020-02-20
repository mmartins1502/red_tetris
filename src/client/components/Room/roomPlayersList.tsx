import React, { SFC } from "react";
import { Room } from "../../models/Room";
import { Player } from "../../models/Player";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";

import "./roomPlayersList.module.css";

interface IProps {
  player: Player;
  room: Room;
}

const roomPlayersList: SFC<IProps> = (props) => {
  const usestyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        maxWidth: 360,
        minWidth: 260,
        backgroundColor: "rgba(255, 255, 255, 0.781)"
      }
    })
  );
  const classes = usestyles();

  const { room } = props;

  let playersList;

  if (!room) {
    playersList = null;
  } else {
    playersList = room.players.map((player) => {
      if (player.id === room.star.id && player.id !== props.player.id) {
        return (
          <ListItem key={player.id}>
            <ListItemIcon>
              <StarIcon style={{ color: "rgb(255, 187, 0)" }} />
            </ListItemIcon>
            <ListItemText
              primary={player.name}
              style={{ color: "rgba(10, 10, 10, 0.781)" }}
            />
          </ListItem>
        );
      }
      if (player.id === room.star.id && player.id === props.player.id) {
        return (
          <ListItem
            key={player.id}
            // style={{ backgroundColor: "rgba(223, 223, 223, 0.9)" }}
            // style={{ color: "lightgreen" }}
          >
            <ListItemIcon>
              <StarIcon style={{ color: "rgb(255, 187, 0)" }} />
            </ListItemIcon>
            <ListItemText primary={player.name} style={{ color: "green" }} />
          </ListItem>
        );
      }
      if (player.id !== room.star.id && player.id === props.player.id) {
        return (
          <ListItem
            key={player.id}
            // style={{ backgroundColor: "rgba(223, 223, 223, 0.9)" }}
            // style={{ color: "lightgreen" }}
          >
            <ListItemText
              inset
              primary={player.name}
              style={{ color: "green" }}
            />
          </ListItem>
        );
      } else {
        return (
          <ListItem key={player.id}>
            <ListItemText
              inset
              primary={player.name}
              style={{ color: "rgba(10, 10, 10, 0.781)" }}
            />
          </ListItem>
        );
      }
    });
  }
  return (
    <List component="nav" className={classes.root} aria-label="contacts">
      {playersList}
    </List>
  );
};

export default roomPlayersList;
