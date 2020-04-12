// import * as actionTypes from "../actions/actionTypes";
import { roomReducer, iState } from "../../client/store/reducers/roomReducer";
import { SocketActionTypes } from "../../client/store/actions/roomActions";
import { iPlayer, Player } from '../../Shared/models/Player';
import { iRoom, Room } from '../../Shared/models/Room';

describe("roomReducer", () => {

  const player: iPlayer = new Player("", "", "")
  const room: iRoom = new Room("")!
  const url = "https://ia600504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3";
  
  const initialState: iState = {
    player: player,
    room: room,
    error: "",
    redirect: false,
    music: {
      on: false,
      audio: new Audio(url)
    }
  };

  const playerTest = new Player("playerIdTest", "NameTest", "roomTest")
  // const playerTest2 = new Player("playerIdTest2", "NameTest2", "roomTest")


  const roomTest: iRoom = new Room("roomTest")

  room.addPlayer("playerIdTest", "NameTest", "roomTest")
  room.addPlayer("playerIdTest2", "NameTest2", "roomTest")

  it("should test the CREATE_PLAYER_ID reducer", () => {
    expect(
      roomReducer(initialState, {
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
      roomReducer(initialState, {
        type: SocketActionTypes.CHECK_ROOM,
        handle: playerTest
      })
    ).toEqual(initialState);
  });

  it("should test the ROOM_AND_PLAYER reducer", () => {
    expect(
      roomReducer(initialState, {
        type: SocketActionTypes.ROOM_AND_PLAYER,
        player: playerTest,
        room: roomTest,
        error: ""
      })
    ).toEqual({
      ...initialState,
      player: playerTest,
      room: roomTest,
      error: "",
      redirect: true
    });
  });

  it("should test the ROOM_AND_PLAYER reducer with ERROR", () => {
    expect(
      roomReducer(initialState, {
        type: SocketActionTypes.ROOM_AND_PLAYER,
        player: playerTest,
        room: roomTest,
        error: "some errors"
      })
    ).toEqual({
      ...initialState,
      player: playerTest,
      room: roomTest,
      error: "some errors",
      redirect: true
    });
  });

  it("should test the LEAVE_ROOM reducer", () => {
    expect(
      roomReducer(initialState, {
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
      roomReducer(initialState, {
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
      roomReducer(initialState, {
        type: SocketActionTypes.START_GAME,
        handle: roomTest
      })
    ).toEqual(initialState);
  });

  // it("should test the READY reducer", () => {
  //   expect(
  //     roomReducer(initialState, {
  //       type: SocketActionTypes.READY,
  //       player: playerTest,
  //       room: roomTest
  //     })
  //   ).toEqual(initialState);
  // });

  it("should test the DEFAULT reducer", () => {
    expect(
      roomReducer(initialState, {
        type: SocketActionTypes.DEFAULT
      })
    ).toEqual(initialState);
  });
});
