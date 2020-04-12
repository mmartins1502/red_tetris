import * as actionTypes from "../actions/actionTypes";
import { RoomActions } from "../actions/roomActions";
import { Reducer } from "redux";
import { Player, iPlayer } from '../../../Shared/models/Player';
import { Room, iRoom } from '../../../Shared/models/Room';


export interface iState {
  player: iPlayer;
  room: iRoom; 
  error: string;
  redirect: boolean;
  music: any;
}
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

// console.log('initialState', initialState.room)

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
            settingsRoom: action.settingsRoom
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
    // case actionTypes.READY:
    //   return state;
    case actionTypes.REFRESH_PLAYER_ASK:
      return state;
    case actionTypes.REFRESH_PLAYER:
        return {
          ...state,
          player: action.player,
          error: action.error
        };
    case actionTypes.SPEED_UP:
      return {
        ...state,
        room: {
          ...state.room,
          speed: action.newSpeed
        }
      };
    case actionTypes.RESET_ROOM:
        return state
    case actionTypes.MUSIC:
      return {
        ...state,
        music: action.music
      }
    case actionTypes.RESET_PLAYER:
      return {
        ...state,
        player: action.player
      }
    default:
      return state;
  }
};
