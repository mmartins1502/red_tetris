import configureMockStore from "redux-mock-store";
import thunk, { ThunkMiddleware } from "redux-thunk";
import expect from "expect";
import socketMiddleware from "../middlewares/socketMiddleware";
import * as actions from "./roomActions";
import * as types from "./actionTypes";
import { iState } from "../reducers/socketReducer";

const middlewares = [
  thunk as ThunkMiddleware<iState, actions.RoomActions>,
  socketMiddleware()
];
const mockStore = configureMockStore(middlewares);

const playerTest = {
  id: "playerIdTest",
  name: "NameTest",
  room: "roomTest",
  state: false
};

const mockState = {
  player: playerTest
};

const roomTest = {
  id: "roomTest",
  players: [
    {
      id: "playerIdTest",
      name: "NameTest",
      room: "roomTest",
      state: false
    }
  ],
  inGame: false,
  star: {
    id: "playerIdTest",
    name: "NameTest",
    room: "roomTest",
    state: false
  }
};

const initialRoom = {
  id: "roomTest",
  players: [
    {
      id: "playerIdTest",
      name: "NameTest",
      room: "roomTest",
      state: false
    }
  ],
  inGame: false,
  star: {
    id: "playerIdTest",
    name: "NameTest",
    room: "roomTest",
    state: false
  }
};

// ////////////////////MOCK SERVER///////////////////

// const http = require("http");
// const port = 4001;
// const socketIo = require("socket.io");
// const server = http.createServer();
// const io = socketIo(server);
// server.listen(port, () => console.log(`Listening on port ${port}`));
// ///////////DATA TO SEND/////////
// const data = "Fake Id";
// const roomInfos = {
//   player: playerTest,
//   room: roomTest,
//   error: "error test"
// };

// ///////////SOCKET IO/////////

// io.on("connection", (socket: any) => {
//   socket.emit("CreatePlayerId", data);
//   socket.on("Room", () => {
//     socket.emit("Room", roomInfos);
//   });
// });

// //////////////////////////////////////////////////

describe("Actions", () => {
  it("should create an action to CREATE_PLAYER_ID", async () => {
    const store = mockStore({});
    store.getState = () => mockState;
    let expectedResponse = [
      {
        type: types.CREATE_PLAYER_ID,
        payload: ""
      }
    ];
    return store.dispatch<any>(actions.createPlayerId()).then(() => {
      store.getState = () => {
        let test1 = store.getActions();
        expectedResponse[0].payload = test1[0].payload;
        playerTest.id = test1[0].payload;
        roomTest.players[0].id = test1[0].payload;
        roomTest.star.id = test1[0].payload;
      };
      expect(store.getActions()).toEqual(expectedResponse);
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

    const expectedResponse = [
      {
        type: types.ROOM_AND_PLAYER,
        player: playerTest,
        room: roomTest,
        error: undefined
      }
    ];

    store.dispatch(actions.checkRoom(playerTest));
    return store.dispatch<any>(actions.roomHomeInfos()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should create an action to LEAVE_ROOM", async () => {
    const expectedResponse = {
      type: types.LEAVE_ROOM,
      event: "LeaveRoom",
      emit: true,
      handle: { player: playerTest, room: roomTest }
    };

    expect(actions.leaveRoomReducer()).toEqual({
      type: types.LEAVE_ROOM,
      room: initialRoom
    });
    expect(actions.leaveRoom(playerTest, roomTest)).toEqual(expectedResponse);
  });

  it("should create an action to REFRESH_ROOM", async () => {
    const store = mockStore({});

    const expectedResponse = [
      {
        type: types.REFRESH_ROOM,
        room: {
          ...roomTest,
          players: [{ ...roomTest.players[0] }, playerTest]
        },
        error: undefined
      }
    ];

    store.dispatch(actions.checkRoom(playerTest));
    return store.dispatch<any>(actions.refreshRoom()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
