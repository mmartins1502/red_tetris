import * as actionTypes from "./actionTypes";
import { Player } from "../../models/Player";
import { Room } from "../../models/Room";
// eslint-disable-next-line
import { Dispatch, ActionCreator, AnyAction } from "redux";
// eslint-disable-next-line
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { iState } from "../reducers/socketReducer";

export enum SocketActionTypes {
  DEFAULT = "DEFAULT",
  CREATE_PLAYER_ID = "CREATE_PLAYER_ID",
  CHECK_ROOM = "CHECK_ROOM",
  ROOM_AND_PLAYER = "ROOM_AND_PLAYER",
  LEAVE_ROOM = "LEAVE_ROOM",
  REFRESH_ROOM = "REFRESH_ROOM",
  START_GAME = "START_GAME",
  READY = "READY"
}

const initialRoom: Room = {
  id: "",
  players: [],
  inGame: false,
  star: {
    id: "",
    name: "",
    room: "",
    state: false
  }
};

interface defaultAction {
  type: SocketActionTypes.DEFAULT;
}

// event: string;
// handle: (data: string) => void;
export interface createPlayerIdAction {
  type: SocketActionTypes.CREATE_PLAYER_ID;
  payload: string;
}

export const createPlayerId: ActionCreator<ThunkAction<
  Promise<any>,
  iState,
  null,
  any
>> = () => {
  console.log("[createPlayerId] action creator");
  return async (dispatch) => {
    return new Promise<any>((resolve) => {
      dispatch({
        type: SocketActionTypes.CREATE_PLAYER_ID,
        event: "CreatePlayerId",
        handle: (data: string) => {
          resolve(
            dispatch({
              type: SocketActionTypes.CREATE_PLAYER_ID,
              payload: data
            })
          );
        }
      });
    });
  };
};

///////////////////////////////////////////////////////////////////////////

interface checkRoomAction {
  // event: string;
  // emit: boolean;
  handle: Player;
  // handle: (formData: Player) => void;
  type: SocketActionTypes.CHECK_ROOM;
}

export const checkRoom = (formData: Player) => {
  console.log("[Room] action creator");
  return {
    type: SocketActionTypes.CHECK_ROOM,
    event: "Room",
    emit: true,
    handle: formData
  };
};

///////////////////////////////////////////////////////////////////////////

interface Res_roomInfos {
  player: Player;
  room: Room;
  error: string;
}

interface roomHomeInfosAction {
  // event: string;
  // handle: (data: Res_roomInfos) => void;
  type: SocketActionTypes.ROOM_AND_PLAYER;
  player: Player;
  room: Room;
  error: string;
}

export const roomHomeInfos: ActionCreator<ThunkAction<
  Promise<any>,
  iState,
  null,
  any
>> = () => {
  console.log("[roomHomeInfos] action creator");
  return async (dispatch) => {
    return new Promise<any>((resolve) => {
      dispatch({
        type: SocketActionTypes.ROOM_AND_PLAYER,
        event: "Room",
        handle: (data: Res_roomInfos) => {
          resolve(
            dispatch({
              type: SocketActionTypes.ROOM_AND_PLAYER,
              player: data.player,
              room: data.room,
              error: data.error
            })
          );
        }
      });
    });
  };
};

///////////////////////////////////////////////////////////////////////////

interface leaveRoomAction {
  // event: string;
  // emit: boolean;
  handle: {
    player: Player;
    room: Room;
  };
  type: SocketActionTypes.LEAVE_ROOM;
}

export const leaveRoomReducer = () => {
  return {
    type: SocketActionTypes.LEAVE_ROOM,
    room: initialRoom
  };
};

export const leaveRoom = (me: Player, room: Room) => {
  const data = {
    player: me,
    room: room
  };
  // dispatch(leaveRoomReducer();)

  return {
    type: SocketActionTypes.LEAVE_ROOM,
    event: "LeaveRoom",
    emit: true,
    handle: data
  };
};

///////////////////////////////////////////////////////////////////////////

interface Res_refreshRoom {
  room: Room;
  error: string;
}

interface refreshRoomAction {
  // event: string;
  // handle: (data: Res_refreshRoom) => void;
  type: SocketActionTypes.REFRESH_ROOM;
  room: Room;
  error: string;
}

export const refreshRoom: ActionCreator<ThunkAction<
  Promise<any>,
  iState,
  null,
  any
>> = () => {
  // console.log("[refreshRoom] action creator");
  return async (dispatch) => {
    return new Promise<any>((resolve) => {
      dispatch({
        type: actionTypes.REFRESH_ROOM,
        event: "RefreshRoom",
        handle: (data: Res_refreshRoom) => {
          resolve(
            dispatch({
              type: actionTypes.REFRESH_ROOM,
              room: data.room,
              error: data.error
            })
          );
        }
      });
    });
  };
};

///////////////////////////////////////////////////////////////////////////

interface startGameAction {
  // event: string;
  // emit: boolean;
  handle: Room;
  type: SocketActionTypes.START_GAME;
}

export const startGame = (room: Room) => {
  return {
    event: "StartGame",
    emit: true,
    handle: room
  };
};

///////////////////////////////////////////////////////////////////////////

interface readyAction {
  // event: string;
  // emit: boolean;
  // handle: { player: Player; room: Room };
  type: SocketActionTypes.READY;
  player: Player;
  room: Room;
}

export const ready = (me: Player, room: Room) => {
  return {
    event: "Ready",
    emit: true,
    handle: { player: me, room: room }
  };
};

///////////////////////////////////////////////////////////////////////////

export type RoomActions =
  | createPlayerIdAction
  | checkRoomAction
  | roomHomeInfosAction
  | leaveRoomAction
  | refreshRoomAction
  | startGameAction
  | readyAction
  | defaultAction;
