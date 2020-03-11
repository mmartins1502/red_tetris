// import * as actionTypes from "../actions/actionTypes";
import { socketReducer } from "./socketReducer";
import { SocketActionTypes } from "../actions/roomActions";
// import { inheritInnerComments } from "@babel/types";

describe("socketReducer", () => {
  const initialState = {
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
    redirect: false
  };

  const playerTest = {
    id: "playerIdTest",
    name: "NameTest",
    room: "roomTest",
    state: false
  };

  const roomTest = {
    id: "roomTest",
    players: [
      playerTest,
      {
        id: "playerIdTest2",
        name: "NameTest2",
        room: "roomTest",
        state: false
      }
    ],
    inGame: false,
    star: playerTest
  };
  it("should test the CREATE_PLAYER_ID reducer", () => {
    expect(
      socketReducer(initialState, {
        type: SocketActionTypes.CREATE_PLAYER_ID,
        payload: "playerIdTest"
      })
    ).toEqual({
      ...initialState,
      player: {
        ...initialState.player,
        id: "playerIdTest"
      }
    });
  });

  it("should test the CHECK_ROOM reducer", () => {
    expect(
      socketReducer(initialState, {
        type: SocketActionTypes.CHECK_ROOM,
        handle: {
          id: "playerIdTest",
          name: "nameTest",
          room: "roomTest",
          state: false
        }
      })
    ).toEqual(initialState);
  });

  it("should test the ROOM_AND_PLAYER reducer", () => {
    expect(
      socketReducer(initialState, {
        type: SocketActionTypes.ROOM_AND_PLAYER,
        player: playerTest,
        room: roomTest,
        error: ""
      })
    ).toEqual({
      player: playerTest,
      room: roomTest,
      error: "",
      redirect: true
    });
  });

  it("should test the ROOM_AND_PLAYER reducer with ERROR", () => {
    expect(
      socketReducer(initialState, {
        type: SocketActionTypes.ROOM_AND_PLAYER,
        player: playerTest,
        room: roomTest,
        error: "some errors"
      })
    ).toEqual({
      player: playerTest,
      room: roomTest,
      error: "some errors",
      redirect: true
    });
  });

  it("should test the LEAVE_ROOM reducer", () => {
    expect(
      socketReducer(initialState, {
        type: SocketActionTypes.LEAVE_ROOM,
        handle: {
          player: playerTest,
          room: roomTest
        }
      })
    ).toEqual(initialState);
  });

  it("should test the REFRESH_ROOM reducer", () => {
    expect(
      socketReducer(initialState, {
        type: SocketActionTypes.REFRESH_ROOM,
        room: roomTest,
        error: "some error"
      })
    ).toEqual({
      ...initialState,
      room: roomTest,
      error: "some error"
    });
  });

  it("should test the START_GAME reducer", () => {
    expect(
      socketReducer(initialState, {
        type: SocketActionTypes.START_GAME,
        handle: roomTest
      })
    ).toEqual(initialState);
  });

  it("should test the READY reducer", () => {
    expect(
      socketReducer(initialState, {
        type: SocketActionTypes.READY,
        player: playerTest,
        room: roomTest
      })
    ).toEqual(initialState);
  });

  it("should test the DEFAULT reducer", () => {
    expect(
      socketReducer(initialState, {
        type: SocketActionTypes.DEFAULT
      })
    ).toEqual(initialState);
  });
});
