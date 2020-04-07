import React from "react";
import Adapter from "enzyme-adapter-react-16";

import MusicButton from "../client/components/UI/Music/MusicButton";
import { shallow, configure } from "enzyme";
import { IconButton } from "@material-ui/core";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";

configure({ adapter: new Adapter() });

describe("<MusicButton />", () => {
  const defaultProps = {};
  const wrapper = shallow(<MusicButton {...defaultProps} />);

  it("should test initial button and handleClick changements", () => {
    console.log(wrapper.debug());

    expect(wrapper.containsMatchingElement(<VolumeOffIcon />)).toEqual(true);

    wrapper.find(IconButton).simulate("click");
    expect(wrapper.containsMatchingElement(<VolumeUpIcon />)).toEqual(true);

    wrapper.find(IconButton).simulate("click");
    expect(wrapper.containsMatchingElement(<VolumeOffIcon />)).toEqual(true);
  });
});
