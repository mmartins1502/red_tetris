import React, { useEffect } from "react";


import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Switch, { SwitchProps } from '@material-ui/core/Switch'
import {
  makeStyles,
  createStyles,
  Theme,
  Grid
} from "@material-ui/core";

interface Props {
  onSettingsChanged: (settings: any) => void;
  playersNb: number
}

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

const CustomCheckbox = withStyles({
  root: {
    '&$checked': {
      color: "#d40e0e"
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const CustomSwitch = withStyles({
  root: {
    '&$checked': {
      color: "#d40e0e"
    },
  },
  checked: {},
})((props: SwitchProps) => <Switch color="default" {...props} />);

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
  const [settings, setSettings] = React.useState({
      mode: props.playersNb > 1 ?'MultiPlayer' : 'Solo',
      difficulty: {
        easy: true,
        hard: false
      },
      options: {
        noRotation: false,
        faster: false
      }
  });

  const {onSettingsChanged} = props

 useEffect(() => {
  onSettingsChanged(settings);
  // eslint-disable-next-line
 }, [settings])


  const handleChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      console.log('props.playersNb', props.playersNb)
      if (props.playersNb > 1) {
        setMulti(!Multi)
        setSettings({ 
          ...settings, 
          mode:  Multi ?'MultiPlayer' : 'Solo',
        });
      }
  };



  const handleChangeDifficulty = () => {
      const {easy, hard} = settings.difficulty
      setSettings({ 
        ...settings, 
        difficulty:{
          easy: hard,
          hard: easy
        } 
      });
  };


  const handleChangeOption = async(event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      await setSettings({ 
        ...settings, 
        options:{
          ...settings.options,
          [event.target.name]: event.target.checked
        } 
      });
  };

  return (
    <div>
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">SETTINGS</h2>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>Solo</Grid>
            <Grid item>
              <CustomSwitch
                checked={Multi}
                onChange={handleChangeMode}
                value="Multi"
              />
            </Grid>
            <Grid item>Multi</Grid>
          </Grid>
          <Grid container alignItems="center"  spacing={2}>
            <Grid item>
              <h4>Difficulty</h4>
            </Grid>
            <FormControlLabel
            control={<CustomCheckbox checked={settings.difficulty.easy} onChange={handleChangeDifficulty} name="easy" />}
            label="Easy (3 lives)"
            />
            <FormControlLabel
              control={<CustomCheckbox checked={settings.difficulty.hard} onChange={handleChangeDifficulty} name="hard" />}
              label="Hard (1 live)"
            />
          </Grid>
          <Grid  container alignItems="center"  spacing={2}>
            <Grid item>
              <h4>Options</h4>
            </Grid>
            <FormControlLabel
            control={<CustomCheckbox checked={settings.options.noRotation} onChange={handleChangeOption} name="noRotation" />}
            label="No rotations"
            />
            <FormControlLabel
              control={<CustomCheckbox checked={settings.options.faster} onChange={handleChangeOption} name="faster" />}
              label="Go faster"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Settings;
