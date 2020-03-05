import React, { useState } from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// import {render, fireEvent, cleanup} from '@testing-library/react';

import { HomePage } from "./HomePage";
import Formulaire from "../../components/HomePage/Formulaire";
import Logo from "../../components/UI/Logo/Logo";
import { Redirect } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
      redirect: false,
      onCreatePlayerId: jest.fn(),
      onFormValidated: jest.fn(),
      onRoomNumber: jest.fn()
    };
    wrapper = shallow(<HomePage {...props} />);
  });

  it("should render my home page", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call the formValidation function", () => {
    // const formulaire = wrapper.find(Formulaire);
    // const buttonFormulaire = formulaire.dive().find(Button);
    // const inputName = formulaire.dive().find("name");
    // // const inputRoom = formulaire.dive().find(Button);
    // wrapper = shallow(<HomePage {...props} />);
    // const instance = wrapper.instance();
    // console.log(instance.debug());
    // console.log(buttonFormulaire);
    // buttonFormulaire.simulate("click");
    // expect(wrapper).toHaveBeenCalledTimes(1);
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
