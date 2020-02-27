import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import RoomActions, { IProps } from "./roomActionsButtons";
import { Button, ButtonGroup } from "@material-ui/core";

configure({ adapter: new Adapter() });

describe("<RoomActionsButton />", () => {
  let wrapper: any;
  let props: any;
  beforeEach(() => {
    props = {
      me: {
        id: "1",
        name: "",
        room: "",
        state: false
      },
      room: {
        id: "",
        players: [],
        inGame: false,
        star: {
          id: "1",
          name: "",
          room: "",
          state: false
        }
      },
      error: "",
      startGame: () => {},
      leaveRoom: () => {},
      ready: () => {}
    };
    wrapper = shallow(<RoomActions {...props} />);
  });
  it("Should render one ButtonGroup and two Buttons", () => {
    expect(wrapper.find(ButtonGroup)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it("Should render one ButtonGroup and two Buttons with start and quit name", () => {
    expect(
      wrapper.containsMatchingElement(
        <ButtonGroup>
          <Button name="start">START</Button>
          <Button name="quit">QUIT</Button>
        </ButtonGroup>
      )
    ).toEqual(true);
  });

  it("Should render one ButtonGroup and two Buttons with ready and quit name", () => {
    wrapper.setProps({ ...props, me: { ...props.me, id: "3" } });
    expect(
      wrapper.containsMatchingElement(
        <ButtonGroup>
          <Button name="ready">READY</Button>
          <Button name="quit">QUIT</Button>
        </ButtonGroup>
      )
    ).toEqual(true);
  });
});
