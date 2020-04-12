import React, { SFC } from "react";


import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
// import DoneIcon from "@material-ui/icons/Done";

import "./roomPlayersList.module.css";
import { iPlayer } from "../../../Shared/models/Player";
import { iRoom } from "../../../Shared/models/Room";

interface IProps {
  player: iPlayer;
  room: iRoom;
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
      if (player.id === room.star.id) {
        return (
          <ListItem key={player.id}>
            <ListItemIcon>
              <StarIcon style={{ color: "rgb(255, 187, 0)" }} />
            </ListItemIcon>
            <ListItemText
              primary={player.name}
              style={
                player.id !== props.player.id
                  ? { color: "rgba(10, 10, 10, 0.781)" }
                  : { color: "green" }
              }
            />
          </ListItem>
        );
      } else {
        // const done = player.state ? (
        //   <DoneIcon style={{ color: "green" }} />
        // ) : null;
        return (
          <ListItem key={player.id}>
            <ListItemText
              inset
              primary={player.name}
              style={
                player.id === props.player.id
                  ? { color: "green" }
                  : { color: "rgba(10, 10, 10, 0.781)" }
              }
            />
            {/* {done} */}
          </ListItem>
        );
      }
    });
  }
  return (
    <div className="PlayerList">
      <List component="nav" className={classes.root} aria-label="contacts">
        {playersList}
      </List>
    </div>
  );
};

export default roomPlayersList;
