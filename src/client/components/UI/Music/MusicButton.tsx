import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";

interface Props {}

const MusicButton: React.FC<Props> = () => {
  const url =
    "https://ia600504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3";
  //   const audio = new Audio(url);
  const [volume, setvolume] = useState({
    on: false,
    audio: new Audio(url)
  });

  const handleChange = () => {
    if (!volume.on) {
      setvolume({
        ...volume,
        on: true
      });
      volume.audio.loop = true;
      volume.audio.play();
    } else {
      setvolume({
        ...volume,
        on: false
      });
      volume.audio.pause();
    }
  };

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
