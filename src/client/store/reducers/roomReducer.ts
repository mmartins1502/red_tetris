import * as actionTypes from "../actions/actionTypes";

import { Player } from "../../models/Player";
import { Room } from "../../models/Room";

import { RoomActions } from "../actions/roomActions";
import { Reducer } from "redux";

export interface iState {
  player: Player;
  room: Room;
  error: string;
  redirect: boolean;
}
const initialState: iState = {
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

export const roomReducer: Reducer<iState, RoomActions> = (
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
    case actionTypes.CHECK_ROOM:
      return state;
    case actionTypes.ROOM_AND_PLAYER:
      return {
        ...state,
        player: action.player,
        room: action.room,
        error: action.error,
        redirect: true
      };
    case actionTypes.LEAVE_ROOM:
      return state;
    case actionTypes.LEAVE_ROOM_REDUCER:
      return initialState
    case actionTypes.REFRESH_ROOM:
      return {
        ...state,
        room: action.room,
        error: action.error
      };
    case actionTypes.START_GAME:
      return state;
    case actionTypes.READY:
      return state;
    case actionTypes.REFRESH_PLAYER_ASK:
      return state;
    case actionTypes.REFRESH_PLAYER:
        return {
          ...state,
          player: action.player,
          room: action.room
        };
    default:
      return state;
  }
};
