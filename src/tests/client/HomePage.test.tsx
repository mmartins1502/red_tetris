import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { HomePage } from "../../client/containers/HomePage/HomePage";
import Formulaire from "../../client/components/HomePage/Formulaire";
// import Logo from "../../components/UI/Logo/Logo";
import { Redirect } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import Slide from "@material-ui/core/Slide";
import { Player } from "../../Shared/models/Player";
import { Room } from "../../Shared/models/Room";
import configureStore from "redux-mock-store";
import { iState } from "../../client/store/reducers/roomReducer";


configure({ adapter: new Adapter() });

const configureMockStore = configureStore();

const url = "https://ia600504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3";

const initialState: iState = {
  player: new Player("", "", ""),
  room: new Room(""),
  error: "",
  redirect: false,
  music: {
    on: false,
    audio: new Audio(url)
  }
};

const store = configureMockStore(initialState);


let wrapper: any, props: any, useEffect: any;
  props = {
    playerId: "",
    player: new Player("", "", ""),
    room: new Room(""),
    error: "",
    redirect: false,
    onCreatePlayerId: jest.fn(),
    onFormValidated: jest.fn(),
    onRoomNumber: jest.fn()
  }


describe("<HomePage />", () => {
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f:any) => f());
  };
  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect()
    wrapper = shallow(<HomePage {...props} store={store} />);
  })

  it("should render my home page", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onCreatePlayerId", () => {
    expect(props.onCreatePlayerId).toHaveBeenCalled()
  })

  it("should call the formValidation function", () => {
    const onFormValidated = jest.fn()
    const formulaire = shallow(<Formulaire onFormValidated={onFormValidated} />);
    formulaire.find({type: "submit"}).simulate('click', { preventDefault: () => {}})
    expect(onFormValidated).toHaveBeenCalled()
    // expect(props.onFormValidated).toHaveBeenCalled()
    expect(props.onRoomNumber).toHaveBeenCalled()
  });

  it("should render my home page with the good error message", () => {
    wrapper.setProps({
      ...props,
      error: "This is my Error Test"
    });
    expect(
      wrapper.containsMatchingElement([
        <h2>WELCOME</h2>,
        <Formulaire onFormValidated={() => {}} />,
        <Slide
          direction="left"
          in={props.error !== ""}
          mountOnEnter
          unmountOnExit
        >
          <Alert style={{ margin: "10px" }} severity="error">
            This is my Error Test
          </Alert>
        </Slide>
      ])
    ).toEqual(true);
  });

  it("should render my home page with <Redirect /> and props.redirect === true", () => {
    wrapper.setProps({
      ...props,
      room: {
        ...props.room,
        id: "testId"
      },
      player: {
        ...props.player,
        name: "testPlayerName"
      },
      redirect: true
    });

    expect(wrapper.find(Redirect)).toHaveLength(1);
    expect(
      wrapper.contains(<Redirect to={`/testId[testPlayerName]`} />)
    ).toEqual(true);
  });
});
