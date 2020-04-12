import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";

interface Props {
  music: any;
  musicOn: (music: any) => void;
}

const MusicButton: React.FC<Props> = (props) => {
  const [volume, setvolume] = useState({...props.music})

  const handleChange = () => {
    if (!volume.on) {
      setvolume({
        ...volume,
        on: true
      })
      volume.audio.loop = true;
      volume.audio.play();
    } else {
      setvolume({
        ...volume,
        on: false
      })
      volume.audio.pause();
    }
    props.musicOn(volume)
  }

  return (
    <div>
      <IconButton
        color="secondary"
        aria-label="upload picture"
        component="span"
        onClick={() => handleChange()}
      >
        {volume.on ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </IconButton>
    </div>
  );
};

export default MusicButton;
