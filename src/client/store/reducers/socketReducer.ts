import * as actionTypes from "../actions/actionTypes";
// import { createPlayerId } from "./actions";

import { Player } from "../../models/Player";
import { Room } from "../../models/Room";

import { SocketActions } from "../actions/socket";
import { Reducer } from "redux";

export interface iState {
  player: Player;
  room: Room;
  error: string;
}
const initialState: iState = {
  player: {
    id: "",
    name: "",
    room: ""
  },
  room: {
    id: "",
    players: [],
    inGame: false,
    star: {
      id: "",
      name: "",
      room: ""
    }
  },
  error: ""
};

export const socketReducer: Reducer<iState, SocketActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionTypes.CREATE_PLAYER_ID:
      return {
        ...state,
        player: {
          ...state.player,
          id: action.payload
        }
      };
    // return createPlayerId(state, action);
    case actionTypes.CHECK_ROOM:
      return state;
    case actionTypes.ROOM_AND_PLAYER:
      return {
        ...state,
        player: action.player,
        room: action.room,
        error: action.error
        // loading: false
      };
    // return roomHome(state, action);
    case actionTypes.LEAVE_ROOM:
      console.log("[REDUCER] LEAVE_ROOM");
      return {
        ...state,
        player: {
          ...state.player,
          name: initialState.player.name,
          room: initialState.player.room
        },
        room: { ...initialState.room }
      };
    case actionTypes.REFRESH_ROOM:
      return {
        ...state,
        room: action.room,
        error: action.error
      };
    // return refreshRoom(state, action);
    case actionTypes.START_GAME:
      return state;
    // return startGame(state, action);
    default:
      return state;
  }
};

// export default socketReducer;
