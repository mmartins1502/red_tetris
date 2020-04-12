import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import RoomPlayerList from "../../client/components/Room/roomPlayersList";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Star } from "@material-ui/icons";

configure({ adapter: new Adapter() });

describe("<RoomPlayerList />", () => {
  let wrapper: any, props: any;
  beforeEach(() => {
    props = {
      player: {
        id: "1",
        name: "You",
        room: "",
      },
      room: {
        id: "",
        players: [
          {
            id: "1",
            name: "You",
            room: "",
          },
          {
            id: "2",
            name: "Other",
            room: "",
          }
        ],
        inGame: false,
        star: {
          id: "1",
          name: "You",
          room: "",
        }
      }
    };
    wrapper = shallow(<RoomPlayerList {...props} />);
  });

  it("should render a <List /> of all players in the room with an empty room", () => {
    wrapper.setProps({
      ...props,
      room: null
    });
    expect(wrapper.find(List)).toHaveLength(1);
    expect(wrapper.find(ListItem)).toHaveLength(0);
  });

  it("should render a <List /> of all players in the room with a star for the owner", () => {
    expect(wrapper.find(List)).toHaveLength(1);
    expect(wrapper.find(ListItem)).toHaveLength(2);
    expect(wrapper.find(Star)).toHaveLength(1);
  });

  it("should render the good HTML elements with a star for the owner(you)", () => {
    expect(
      wrapper.containsMatchingElement(
        <List component="nav" aria-label="contacts">
          <ListItem>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText primary="You" style={{ color: "green" }} />
          </ListItem>
          <ListItem>
            <ListItemText
              inset
              primary="Other"
              style={{ color: "rgba(10, 10, 10, 0.781)" }}
            />
          </ListItem>
        </List>
      )
    ).toEqual(true);
  });

  it("should render the good HTML elements with a star for the owner(not you)", () => {
    wrapper.setProps({
      ...props,
      room: {
        ...props.room,
        players: [
          {
            id: "2",
            name: "Other",
            room: "",
          },
          {
            id: "1",
            name: "You",
            room: "",
          }
        ],
        star: {
          id: "2",
          name: "Other",
          room: "",
        }
      }
    });

    expect(
      wrapper.containsMatchingElement(
        <List component="nav" aria-label="contacts">
          <ListItem>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText
              primary="Other"
              style={{ color: "rgba(10, 10, 10, 0.781)" }}
            />
          </ListItem>
          <ListItem>
            <ListItemText inset primary="You" style={{ color: "green" }} />
          </ListItem>
        </List>
      )
    ).toEqual(true);
  });
});
