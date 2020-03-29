import * as actionTypes from "../actions/actionTypes";
import { RoomActions } from "../actions/roomActions";
import { Reducer } from "redux";
import { Player } from 'Shared/models/Player';
import { Room } from 'Shared/models/Room';



export interface iState {
  player: Player;
  room: Room; 
  error: string;
  redirect: boolean;
}
const player: Player = new Player("", "", "")
const initialState: iState = {
  player: player,
  room: new Room(""),
  error: "",
  redirect: false
};

console.log('initialState', initialState)

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
    case actionTypes.SETTINGS:
        return {
          ...state,
          room: {
            ...state.room,
            settings: action.settings
          }
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
