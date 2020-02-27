import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import RoomPlayerList from "./roomPlayersList";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Star, Done } from "@material-ui/icons";

configure({ adapter: new Adapter() });

describe("<RoomPlayerList />", () => {
  let wrapper: any, props: any;
  beforeEach(() => {
    props = {
      player: {
        id: "1",
        name: "You",
        room: "",
        state: false
      },
      room: {
        id: "",
        players: [
          {
            id: "1",
            name: "You",
            room: "",
            state: false
          },
          {
            id: "2",
            name: "Other",
            room: "",
            state: true
          }
        ],
        inGame: false,
        star: {
          id: "1",
          name: "You",
          room: "",
          state: false
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

  it("should render a <List /> of all players in the room with a star for the owner and a done if the other player is ready", () => {
    expect(wrapper.find(List)).toHaveLength(1);
    expect(wrapper.find(ListItem)).toHaveLength(2);
    expect(wrapper.find(Star)).toHaveLength(1);
    expect(wrapper.find(Done)).toHaveLength(1);
  });

  it("should render the good HTML elements with a star for the owner(you) and a done for the other ", () => {
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
            <Done style={{ color: "green" }} />
          </ListItem>
        </List>
      )
    ).toEqual(true);
  });

  it("should render the good HTML elements with a star for the owner(you) and a done for the other not ready ", () => {
    wrapper.setProps({
      ...props,
      room: {
        ...props.room,
        players: [
          {
            id: "1",
            name: "You",
            room: "",
            state: false
          },
          {
            id: "2",
            name: "Other",
            room: "",
            state: false
          }
        ]
      }
    });
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

  it("should render the good HTML elements with a star for the owner(not you) and a done for the other(you) ", () => {
    wrapper.setProps({
      ...props,
      room: {
        ...props.room,
        players: [
          {
            id: "2",
            name: "Other",
            room: "",
            state: true
          },
          {
            id: "1",
            name: "You",
            room: "",
            state: true
          }
        ],
        star: {
          id: "2",
          name: "Other",
          room: "",
          state: true
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
            <Done style={{ color: "green" }} />
          </ListItem>
        </List>
      )
    ).toEqual(true);
  });
});
