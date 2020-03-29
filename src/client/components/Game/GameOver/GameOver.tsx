import React from 'react'
import Modal from '@material-ui/core/Modal'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface Props {
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
      padding: theme.spacing(2, 4, 3)
    }
  })
);

const GameOver = (props: Props) => {
    const classes = usestyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
      setOpen(false);
    };

    return (
              <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h1 id="simple-modal-title">GAME OVER</h1>
                </div>
            </Modal>
    )
}

export default GameOver
