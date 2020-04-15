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
      })
    ).toEqual(initialState);
  });

  it("should test the SETTINGS reducer", () => {
    expect(
      roomReducer(initialState, {
        type: SocketActionTypes.SETTINGS,
        settingsRoom: {
          ...initialState.room.settingsRoom
        }
      })
    ).toEqual(initialState);
  });

  it("should test the LEAVE_ROOM_REDUCER reducer", () => {
    expect(roomReducer(initialState, {
        type: SocketActionTypes.LEAVE_ROOM_REDUCER
      })
    ).toEqual(roomReducer(initialState, {
      type: SocketActionTypes.LEAVE_ROOM_REDUCER
    }));

  });

  it("should test the REFRESH_PLAYER_ASK reducer", () => {
    expect(roomReducer(initialState, {
        type: SocketActionTypes.REFRESH_PLAYER_ASK
      })
    ).toEqual(initialState);
  });

  it("should test the REFRESH_PLAYER_ASK reducer", () => {
    expect(roomReducer(initialState, {
        type: SocketActionTypes.REFRESH_PLAYER,
        player: playerTest,
        error: ""
      })
    ).toEqual({
      ...initialState,
      player: playerTest
    });
  });


  it("should test the SPEED_UP reducer", () => {
    expect(
      roomReducer(initialState, {
        type: SocketActionTypes.SPEED_UP,
        newSpeed: 4000
      })
    ).toEqual({
      ...initialState,
      room: {
        ...initialState.room,
        speed: 4000
      }
    });
  });

  it("should test the RESET_ROOM reducer", () => {
    expect(
      roomReducer(initialState, {
        type: SocketActionTypes.RESET_ROOM
      })
    ).toEqual(initialState);
  });

  it("should test the MUSIC reducer", () => {
    expect(
      roomReducer(initialState, {
        type: SocketActionTypes.MUSIC,
        music: 4000
      })
    ).toEqual({
      ...initialState,
      music: 4000
    });
  });


  it("should test the RESET_PLAYER reducer", () => {
    expect(
      roomReducer(initialState, {
        type: SocketActionTypes.RESET_PLAYER,
        player: playerTest
      })
    ).toEqual({
      ...initialState,
      player: playerTest
    });
  });


  it("should test the DEFAULT reducer", () => {
    expect(
      roomReducer(initialState, {
        type: SocketActionTypes.DEFAULT
      })
    ).toEqual(initialState);
  });
});
