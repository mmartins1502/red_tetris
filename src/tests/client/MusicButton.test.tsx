import React from "react";
import Adapter from "enzyme-adapter-react-16";

import MusicButton from "../../client/components/UI/Music/MusicButton";
import { shallow, configure } from "enzyme";
import { IconButton } from "@material-ui/core";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";

configure({ adapter: new Adapter() });

const url = "https://ia600504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3";

describe("<MusicButton />", () => {
  const defaultProps = {
    music: {
      on: false,
      audio: new Audio(url)
    }, 
    musicOn: () => {}
  };
  const wrapper = shallow(<MusicButton {...defaultProps} />);

  it("should test initial button ", () => {
    expect(wrapper.containsMatchingElement(<VolumeOffIcon />)).toEqual(true);
  });
  
  it("Should change Icon Button", () => {
    wrapper.find(IconButton).simulate("click");
    expect(wrapper.containsMatchingElement(<VolumeUpIcon />)).toEqual(true);
  })
  
  it("Should change Icon Button again", () => {
    wrapper.find(IconButton).simulate("click");
    expect(wrapper.containsMatchingElement(<VolumeOffIcon />)).toEqual(true);
  })
});
