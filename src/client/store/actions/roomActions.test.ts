import configureMockStore from "redux-mock-store";
import thunk, { ThunkMiddleware } from "redux-thunk";
import expect from "expect";
import socketMiddleware from "../middlewares/socketMiddleware";
import * as actions from "./roomActions";
import * as types from "./actionTypes";
import { iState } from "../reducers/roomReducer";
import {Room}  from '../../../server/models/Room';

const middlewares = [
  thunk as ThunkMiddleware<iState, actions.RoomActions>,
  socketMiddleware()
];
const mockStore = configureMockStore(middlewares);

const playerTest = {
  id: "id",
  name: "NameTest",
  room: "roomTest",
  state: false
};


const mockState = {
  player: playerTest
};

const roomTest = {
  id: "roomTest",
  players: [ playerTest ],
  inGame: false,
  star: playerTest,
  everyOneIsReady: false

};


// ////////////////////MOCK SERVER///////////////////

let rooms: Room[] = [];

// const roomTest4 = new Room("13");
// roomTest4.addPlayer("id test1", "name test1", true, "13");
// roomTest4.addPlayer("id test2", "name test2", true, "13");
// rooms.push(roomTest4);



const socketConfig = require("../../../server/sockets/socket");

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



const expected = expect.stringMatching(/([a-zA-Z0-9]){20}/gm)

// //////////////////////////////////////////////////

describe("Actions", () => {


  afterAll(() => {
    ioServer.close()
  })


  it("should create an action to CREATE_PLAYER_ID", async () => {
    const store = mockStore({});
    store.getState = () => mockState;
    // const expected = expect.stringMatching(/([a-zA-Z0-9]){20}/gm)


    return store.dispatch<any>(actions.createPlayerId()).then(() => {
      expect(store.getActions()).toBeTruthy();
      const returned: any = store.getActions()[0]
      expect(returned.type).toEqual(types.CREATE_PLAYER_ID);
      playerTest.id = returned.payload
      expect(returned.payload).toEqual(expect.objectContaining(expected).sample);
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

    expect(actions.leaveRoom(playerTest, roomTest)).toEqual(expectedResponse);
  });

//   it("should create an action to REFRESH_ROOM", async () => {
//     const store = mockStore({});
//     store.getState = () => mockState;

    
    
//     const expectedResponse = [
//       {
//         type: types.REFRESH_ROOM,
//         room: roomTest4,
//         error: undefined
//       }
//     ];
    
// const playerTest2 = {
//   id: "player test id",
//   name: "player test name",
//   room: "13",
//   state:false
// }

//     store.dispatch<any>(actions.checkRoom(playerTest2))
//     return store.dispatch<any>(actions.refreshRoom()).then(() => {
//       store.dispatch(actions.leaveRoom(playerTest2, roomTest4))

//       const returned = store.getActions()
//       console.log('returned', returned)
//       expect(store.getActions()).toEqual(expectedResponse);
//     });
//   });
});
