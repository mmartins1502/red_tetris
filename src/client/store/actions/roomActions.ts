import * as actionTypes from "./actionTypes";
import { Player } from "../../../Shared/models/Player";
import { Room } from "../../../Shared/models/Room";
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { iState } from "../reducers/roomReducer";

export enum SocketActionTypes {
  DEFAULT = "DEFAULT",
  CREATE_PLAYER_ID = "CREATE_PLAYER_ID",
  CHECK_ROOM = "CHECK_ROOM",
  ROOM_AND_PLAYER = "ROOM_AND_PLAYER",
  LEAVE_ROOM = "LEAVE_ROOM",
  REFRESH_ROOM = "REFRESH_ROOM",
  START_GAME = "START_GAME",
  READY = "READY",
  REFRESH_PLAYER = "REFRESH_PLAYER",
  REFRESH_PLAYER_ASK = "REFRESH_PLAYER_ASK",
  INIT_BOARD = "INIT_BOARD",
  LEAVE_ROOM_REDUCER = "LEAVE_ROOM_REDUCER",
  SETTINGS = "SETTINGS",
}

// const initialRoom = undefined;

interface defaultAction {
  type: SocketActionTypes.DEFAULT;
}


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
  handle: Player;
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
  // console.log("[roomHomeInfos] action creator");
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
  handle: {
    player: Player;
    room: Room;
  };
  type: SocketActionTypes.LEAVE_ROOM;
}

interface leaveRoomReducerAction {
  type: SocketActionTypes.LEAVE_ROOM_REDUCER;
  player: undefined;
  room: undefined;
}

export const leaveRoomReducer = () => {
  console.log("[leaveRoomReducer]")
  return {
    type: SocketActionTypes.LEAVE_ROOM_REDUCER,
  };
};

export const leaveRoom = (me: Player, room: Room) => {
  const data = {
    player: me,
    room: room
  };
  console.log("[leaveRoom]")
  return {
    type: SocketActionTypes.LEAVE_ROOM,
    event: "LeaveRoom",
    emit: true,
    handle: data
  };
};

///////////////////////////////////////////////////////////////////////////

interface settingsChangedAction {
  type: SocketActionTypes.SETTINGS;
  settings: undefined;
}

export const settingsChanged = (settings: any) => {
  console.log("[settingsChanged]")
  return {
    type: SocketActionTypes.SETTINGS,
    settings: settings
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

interface refreshPlayerAskAction {
  type: SocketActionTypes.REFRESH_PLAYER_ASK;
  room: Room;
}

export const refreshPlayerAsk = (player: Player, room: Room, move: string) => {
  return {
    event: "Board",
    emit: true,
    handle: {player: player, room: room, move: move}
  };
};


///////////////////////////////////////////////////////////////////////////

interface initBoardAction {
  type: SocketActionTypes.INIT_BOARD;
  player: Player;
}

export const initBoard = (player: Player, room: Room) => {
  console.log('[initBoard]')
  return {
    event: "initialBoard",
    emit: true,
    handle: {player: player, room: room}
  };
};


///////////////////////////////////////////////////////////////////////////

interface refreshPlayerAction {
  type: SocketActionTypes.REFRESH_PLAYER;
  player: Player;
  room: Room;
  error: string;
}

export const refreshPlayer: ActionCreator<ThunkAction<
  Promise<any>,
  iState,
  null,
  any
>> = () => {
  return async (dispatch) => {
    return new Promise<any>((resolve) => {
      dispatch({
        type: actionTypes.REFRESH_PLAYER,
        event: "Board",
        handle: (data: any) => {
          resolve(
            dispatch({
              type: actionTypes.REFRESH_PLAYER,
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


export type RoomActions =
  | createPlayerIdAction
  | checkRoomAction
  | roomHomeInfosAction
  | leaveRoomAction
  | leaveRoomReducerAction
  | refreshRoomAction
  | startGameAction
  | readyAction
  | refreshPlayerAskAction
  | initBoardAction
  | refreshPlayerAction
  | settingsChangedAction
  | defaultAction;
