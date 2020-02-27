import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { HomePage } from "./HomePage";
import Formulaire from "../../components/HomePage/Formulaire";
import Logo from "../../components/UI/Logo/Logo";
import { Redirect } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import Slide from "@material-ui/core/Slide";

configure({ adapter: new Adapter() });

describe("<HomePage />", () => {
  let wrapper: any, props: any;
  beforeEach(() => {
    props = {
      player: {
        id: "",
        name: "",
        room: "",
        state: false
      },
      room: {
        id: "",
        players: [],
        inGame: false,
        star: {
          id: "",
          name: "",
          room: "",
          state: false
        }
      },
      error: "",
      onCreatePlayerId: () => {},
      onFormValidated: () => {},
      onRoomNumber: () => {}
    };
    wrapper = shallow(<HomePage {...props} />);
  });

  it("should render my home page", () => {
    expect(wrapper.find("div")).toHaveLength(2);
    expect(wrapper.find(Logo)).toHaveLength(1);
    expect(wrapper.find("h2")).toHaveLength(1);
    expect(wrapper.find(Formulaire)).toHaveLength(1);
    expect(wrapper.find(Slide)).toHaveLength(1);
    expect(wrapper.find(Alert)).toHaveLength(1);
  });

  it("should render my home page with an error", () => {
    wrapper.setProps({
      ...props,
      error: "This is my Error Test"
    });
    expect(
      wrapper.containsMatchingElement(
        <div>
          <h2>WELCOME</h2>
          <Formulaire onFormValidated={() => {}} />
        </div>
      )
    ).toEqual(true);
  });
});
