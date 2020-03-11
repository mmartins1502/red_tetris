import React from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Switch
} from "@material-ui/core";

interface Props {}

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

const Settings = (props: Props) => {
  const classes = usestyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [Multi, setMulti] = React.useState(false);

  return (
    <div>
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">SETTINGS</h2>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Solo</Grid>
          <Grid item>
            <Switch
              checked={Multi}
              onChange={() => {
                setMulti(!Multi);
              }}
              value="MultiPlayer"
            />
          </Grid>
          <Grid item>Multi</Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Settings;
