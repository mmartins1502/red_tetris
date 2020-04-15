import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { HomePage, mapDispatchToProps } from "../../client/containers/HomePage/HomePage";
import Formulaire from "../../client/components/HomePage/Formulaire";
// import Logo from "../../components/UI/Logo/Logo";
import { Redirect } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import Slide from "@material-ui/core/Slide";
import { Player } from "../../Shared/models/Player";
import { Room } from "../../Shared/models/Room";
import configureMockStore from 'redux-mock-store';
import { iState } from "../../client/store/reducers/roomReducer";
import MusicButton from "../../client/components/UI/Music/MusicButton";
import { IconButton } from "@material-ui/core";
import { Provider } from "react-redux";

// var serialize = require('serialize-javascript');
configure({ adapter: new Adapter() });


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



let wrapper: any, props: any, useEffect: any, store: any;
  props = {
    playerId: "",
    player: new Player("", "", ""),
    room: new Room(""),
    error: "",
    redirect: false,
    music: {
      on: false,
      audio: new Audio(url)
    },
    onCreatePlayerId: jest.fn(),
    onFormValidated: jest.fn(),
    onRoomNumber: jest.fn()
  }
  
  const mockStore = configureMockStore();

  describe("<HomePage />", () => {
    
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f:any) => f());
  };
  const event = { preventDefault: () => {} };
  
  beforeEach(() => {
    store = mockStore(initialState)
    jest.spyOn(event, 'preventDefault');
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect()
    // wrapper = shallow(<HomePage {...props} store={store} />);
    wrapper = mount(<Provider store={store}><HomePage {...props} /></Provider>)
  })

  it("should render my home page", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onCreatePlayerId", () => {
    expect(props.onCreatePlayerId).toHaveBeenCalled()
    expect(mapDispatchToProps.onCreatePlayerId()).toEqual(expect.any(Function))

  })

  it("should call the formValidation function", () => {
    const formValidation = jest.fn()
    const formulaire = shallow(<Formulaire onFormValidated={formValidation} />);

    formulaire.find({type: "submit"}).simulate('click', { preventDefault: () => {}})
    expect(formValidation).toHaveBeenCalled()
    expect(mapDispatchToProps.onFormValidated({id: "", name: "", room: ""})).toEqual({"emit": true, "event": "Room", "handle": {"id": "", "name": "", "room": ""}, "type": "CHECK_ROOM"})
    expect(mapDispatchToProps.onRoomNumber()).toEqual(expect.any(Function))
    
    // expect(props.onFormValidated).toHaveBeenCalled()
    // expect(props.onRoomNumber).toHaveBeenCalled()
  });

  it("should render MusicButton", () => {
    expect(wrapper.containsMatchingElement([
      <MusicButton music={props.music} musicOn={props.handleMusic} />
    ])).toBe(true)
    const handleMusic  =jest.fn()
    const music = shallow(<MusicButton music={props.music} musicOn={handleMusic} />)
    music.find(IconButton).simulate('click', {})
    expect(handleMusic).toHaveBeenCalled()
    expect(JSON.stringify(mapDispatchToProps.handleMusic({on: false, audio: new Audio(url)}))).toEqual(JSON.stringify({type: "MUSIC", music: {on: false, audio: {}}}))

  })

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
    wrapper = shallow(<HomePage {...props} store={store} />);
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

  it("should test mapStateToProps", () => {
    store = mockStore(initialState)
    expect(wrapper.props().store.getState().playerId).toBe(undefined)
    expect(wrapper.props().store.getState().player).toEqual({"account": {"life": 3, "lines": 0, "points": 0}, "id": "", "listIdx": 0, "name": "", "room": ""})
    expect(wrapper.props().store.getState().room).toEqual({"game": {"location": "room"}, "generator": expect.any(Function), "id": "", "inGame": false, "malus": 0, "piecesList": initialState.room.piecesList, "players": [], "settingsRoom": {"difficulty": {"easy": true, "hard": false}, "mode": {"multiplayer": false, "solo": true}, "options": {"faster": false, "noRotation": false}, "spectrum": true}, "speed": 1000, "star": undefined})
    expect(wrapper.props().store.getState().error).toBe("")
    expect(wrapper.props().store.getState().redirect).toBe(false)
    expect(wrapper.props().store.getState().music).toEqual(initialState.music)

  })
});
