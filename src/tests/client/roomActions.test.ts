import configureMockStore from "redux-mock-store";
import thunk, { ThunkMiddleware } from "redux-thunk";
import expect from "expect";
import socketMiddleware from '../../client/store/middlewares/socketMiddleware';
import { iState } from '../../client/store/reducers/roomReducer';
import * as actions from "../../client/store/actions/roomActions";
import { Room, iRoom } from '../../Shared/models/Room';
import * as types from "../../client/store/actions/actionTypes";
import { Player, iPlayer } from '../../Shared/models/Player';
import {socketConfig} from "../../Server/sockets/socket";


const middlewares = [
  thunk as ThunkMiddleware<iState, actions.RoomActions>,
  socketMiddleware()
];
const mockStore = configureMockStore(middlewares);

const playerTest: iPlayer = new Player("id", "NameTest", "roomTest")


const mockState = {
  player: playerTest
};

const roomTest: iRoom = new Room("roomTest")

// ////////////////////MOCK SERVER///////////////////

let rooms: iRoom[] = [];
const app = require("express")();
const server = require("http").Server(app);
let ioServer = require("socket.io")(server, {
  cookie: false,
  pingTimeout: 30000,
  pingInterval: 2000
});

// ///////////SOCKET IO/////////
ioServer = socketConfig(rooms, ioServer);
ioServer.listen(4001);
const expectedId = expect.stringMatching(/([a-zA-Z0-9\W_]){20}/gm)
// //////////////////////////////////////////////////

describe("Actions", () => {
  
  afterAll(() => {
    ioServer.close()
  })

  it("should create an action to CREATE_PLAYER_ID", async () => {
    const store = mockStore({});
    store.getState = () => mockState;
    return store.dispatch<any>(actions.createPlayerId()).then(() => {
      expect(store.getActions()).toBeTruthy();
      const returned: any = store.getActions()[0]
      expect(returned.type).toEqual(types.CREATE_PLAYER_ID);
      playerTest.id = returned.payload
      expect(returned.payload).toEqual(expect.objectContaining(expectedId).sample);
    });
  });

  it("should create an action to CHECK_ROOM", async () => {
    const expectedResponse = {
      type: types.CHECK_ROOM,
      event: "Room",
      emit: true,
      handle: playerTest
    };
    expect(actions.checkRoom(playerTest)).toEqual(expectedResponse);
  });

  it("should create an action to ROOM_AND_PLAYER", async () => {
    const store = mockStore({});
    roomTest.addPlayer(playerTest.id, playerTest.name, playerTest.room)
    playerTest.initBoard("L")

    const expectedResponse = [
      {
        type: types.ROOM_AND_PLAYER,
        player: playerTest,
        room: roomTest,
        error: ""
      }
    ];

    store.dispatch(actions.checkRoom(playerTest));
    return store.dispatch<any>(actions.roomHomeInfos()).then(() => {
      expect(store.getActions().keys).toEqual(expectedResponse.keys);
    });
  });

  it("should create an action to LEAVE_ROOM", async () => {
    const expectedResponse = {
      type: types.LEAVE_ROOM,
      event: "LeaveRoom",
      emit: true,
      handle: { player: playerTest, room: roomTest }
    };

    expect(actions.leaveRoom(playerTest, roomTest)).toEqual(expectedResponse);
  });

  it("should test action LEAVE_ROOM_REDUCER", async () => {
    const expectedResponse = {
      type: types.LEAVE_ROOM_REDUCER
    };

    expect(actions.leaveRoomReducer()).toEqual(expectedResponse);
  });

  it("should test action MUSIC", async () => {
    const music = {
      on: false,
      audio: new Audio("url")
    }
    const expectedResponse = {
      type: types.MUSIC,
      music: music
    };

    expect(actions.music(music)).toEqual(expectedResponse);
  });

  it("should test action SETTINGS", async () => {
    const settingsRoom = {
      on: false
    }
    const expectedResponse = {
      type: types.SETTINGS,
      settingsRoom: settingsRoom
    };

    expect(actions.settingsChanged(settingsRoom)).toEqual(expectedResponse);
  });


  it("should test action REFRESH_ROOM", async () => {
    const store = mockStore({});
    store.getState = () => mockState;

    roomTest.addPlayer(playerTest.id, playerTest.name, playerTest.room)
    playerTest.initBoard("L")
    roomTest.updatePlayer(playerTest)

    const expectedResponse = [
      {
        type: types.REFRESH_ROOM,
        room: roomTest,
        error: ""
      }
    ];

    store.dispatch(actions.leaveRoom(playerTest, roomTest));
    
    return store.dispatch<any>(actions.refreshRoom()).then(() => {
      expect(store.getActions()).toBeTruthy();
      expect(store.getActions().keys).toEqual(expectedResponse.keys);
    });
  });


  it("should  test action RESET_ROOM", async () => {
    const expectedResponse = {
      type: types.RESET_ROOM,
      event: "ResetRoom",
      emit: true,
      handle: { player: playerTest, room: roomTest }
    };

    expect(actions.onResetRoomParams(playerTest, roomTest)).toEqual(expectedResponse);
  });

  it("should  test action START_GAME", async () => {
    const expectedResponse = {
      type: types.START_GAME,
      event: "StartGame",
      emit: true,
      handle: roomTest
    };

    expect(actions.startGame(roomTest)).toEqual(expectedResponse);
  });

  it("should test action REFRESH_PLAYER_ASK", async () => {
    const expectedResponse = {
      type: types.REFRESH_PLAYER_ASK,
      event: "Board",
      emit: true,
      handle: {player: playerTest, room: roomTest, move: "move"}
    };

    expect(actions.refreshPlayerAsk(playerTest, roomTest, "move")).toEqual(expectedResponse);
  });

  it("should test action INIT_BOARD", async () => {
    const expectedResponse = {
      type: types.INIT_BOARD,
      event: "initialBoard",
      emit: true,
      handle: {player: playerTest, room: roomTest}
    };

    expect(actions.initBoard(playerTest, roomTest)).toEqual(expectedResponse);
  });

  it("should test action SPEED_UP", async () => {
    const expectedResponse = {
      type: types.SPEED_UP,
      newSpeed: 4000
    };

    expect(actions.speedUp(4000)).toEqual(expectedResponse);
  });


  it("should test action RESET_PLAYER", async () => {
    const store = mockStore({});
    store.getState = () => mockState;

    roomTest.addPlayer(playerTest.id, playerTest.name, playerTest.room)
    playerTest.initBoard("L")
    roomTest.updatePlayer(playerTest)

    const expectedResponse = [
      {
        type: types.RESET_PLAYER,
        player: playerTest
      }
    ];

    store.dispatch(actions.onResetRoomParams(playerTest, roomTest));
    return store.dispatch<any>(actions.resetPlayer()).then(() => {
      expect(store.getActions()).toBeTruthy();
      expect(store.getActions().keys).toEqual(expectedResponse.keys);
    });
  });

  it("should test action REFRESH_PLAYER", async () => {
    const store = mockStore({});
    store.getState = () => mockState;

    roomTest.addPlayer(playerTest.id, playerTest.name, playerTest.room)
    playerTest.initBoard("L")
    roomTest.updatePlayer(playerTest)

    const expectedResponse = [
      {
        type: types.REFRESH_PLAYER,
        player: playerTest,
        error: ""
      }
    ];

    store.dispatch(actions.initBoard(playerTest, roomTest));
    return store.dispatch<any>(actions.refreshPlayer()).then(() => {
      expect(store.getActions()).toBeTruthy();
      expect(store.getActions().keys).toEqual(expectedResponse.keys);
    });
  });

});
