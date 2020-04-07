import React from 'react'
import Modal from '@material-ui/core/Modal'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { iPlayer } from '../../../../Shared/models/Player';
import { ListItem, ListItemText, Button } from '@material-ui/core';
import { iRoom } from '../../../../Shared/models/Room';

interface Props {
  room: iRoom,
  player: iPlayer
  goBack: () => void,
}

function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`
    };
  }

const usestyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      fontFamily: "'Press Start 2P', cursive",
      fontSize: "small"
    }
  })
);

const GameOver = (props: Props) => {
    const classes = usestyles();
    const [modalStyle] = React.useState(getModalStyle);
    // const [open, setOpen] = React.useState(true);


    let playersList: iPlayer[] = props.room.players.sort((a, b) => (a.account.lines > b.account.lines) ? 1 : (a.account.lines === b.account.lines) ? ((a.account.points > b.account.points) ? 1 : -1) : -1 )
    let scoreList = playersList.map((player) => {
        return (
          <ListItem key={player.id}>
            <ListItemText
              inset
              primary={player.name}
              style={{ color: "rgba(10, 10, 10, 0.781)" }}
            />
            <ListItemText
              inset
              primary={player.account.lines}
              style={{ color: "rgba(10, 10, 10, 0.781)" }}
            />
            <ListItemText
              inset
              primary={player.account.points}
              style={{ color: "rgba(10, 10, 10, 0.781)" }}
            />
          </ListItem>
        );
      });



    let GoBackToRoom = (
      <Button
            name="GoBackToRoom"
            data-testid="quit"
            onClick={() =>  props.goBack()}
            style={{ color: "#d40e0e" }}
          >
            Go Back To The Room
          </Button>
    )

    // const handleClose = () => {
    //   setOpen(false);
    // };

    return (
              <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={true}
              // onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h1 id="simple-modal-title">GAME OVER</h1>
                    <h3 >High Scores</h3>
                    <ListItem key={"title"}>
                      <ListItemText
                        inset
                        primary={"Name"}
                        style={{ color: "rgba(10, 10, 10, 0.781)" }}
                      />
                      <ListItemText
                        inset
                        primary={"Lines"}
                        style={{ color: "rgba(10, 10, 10, 0.781)" }}
                      />
                      <ListItemText
                        inset
                        primary={"Score"}
                        style={{ color: "rgba(10, 10, 10, 0.781)" }}
                      />
                    </ListItem>
                    {scoreList}
                    {GoBackToRoom}
                </div>
            </Modal>
    )
}

export default GameOver
