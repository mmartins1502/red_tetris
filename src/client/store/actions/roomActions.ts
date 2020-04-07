import * as actionTypes from "./actionTypes";
import { iPlayer } from "../../../Shared/models/Player";
import { iRoom, iSettings, Room } from "../../../Shared/models/Room";
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
  SPEED_UP = "SPEED_UP",
  RESET_ROOM = "RESET_ROOM",
}

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
  type: SocketActionTypes.CHECK_ROOM;
}

export const checkRoom = (formData: iPlayer) => {
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
  player: iPlayer;
  room: iRoom;
  error: string;
}

interface roomHomeInfosAction {
  type: SocketActionTypes.ROOM_AND_PLAYER;
  player: iPlayer;
  room: iRoom;
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
    player: iPlayer;
    room: iRoom;
  };
  type: SocketActionTypes.LEAVE_ROOM;
}

interface leaveRoomReducerAction {
  type: SocketActionTypes.LEAVE_ROOM_REDUCER;
  player: iPlayer;
  room: iRoom;
}

export const leaveRoomReducer = () => {
  console.log("[leaveRoomReducer]")
  return {
    type: SocketActionTypes.LEAVE_ROOM_REDUCER,
  };
};

export const leaveRoom = (me: iPlayer, room: iRoom) => {
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
  settingsRoom: iSettings;
}

export const settingsChanged = (settingsRoom: any) => {
  console.log("[settingsChanged]")
  return {
    type: SocketActionTypes.SETTINGS,
    settingsRoom: settingsRoom
  };
};

///////////////////////////////////////////////////////////////////////////

interface Res_refreshRoom {
  room: iRoom;
  error: string;
}

interface refreshRoomAction {
  type: SocketActionTypes.REFRESH_ROOM;
  room: iRoom;
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


interface ResetRoomParamsAction {
  type: SocketActionTypes.RESET_ROOM;
  player: iPlayer
  room: iRoom
}


export const onResetRoomParams = (player: iPlayer, room: iRoom) => {
  let newRoom: iRoom = new Room(room.id)
  room.players.every((play: iPlayer) => {
     return newRoom.addPlayer(play.id, play.name, play.room)
  })
  console.log('newRoom.players', newRoom.players)
  newRoom.resetRoom()
  let newPlayer = newRoom.players.find((play: iPlayer) => play.id === player.id)
  return {
    type: SocketActionTypes.RESET_ROOM,
    player: newPlayer,
    room: newRoom
  }
}

///////////////////////////////////////////////////////////////////////////

interface startGameAction {
  type: SocketActionTypes.START_GAME;
}

export const startGame = (room: iRoom) => {
  return {
    event: "StartGame",
    emit: true,
    handle: room
  };
};

///////////////////////////////////////////////////////////////////////////

interface readyAction {
  type: SocketActionTypes.READY;
}

export const ready = (me: iPlayer, room: iRoom) => {
  return {
    event: "Ready",
    emit: true,
    handle: { player: me, room: room }
  };
};

///////////////////////////////////////////////////////////////////////////

interface refreshPlayerAskAction {
  type: SocketActionTypes.REFRESH_PLAYER_ASK;
}

export const refreshPlayerAsk = (player: iPlayer, room: iRoom, move: string) => {
  return {
    event: "Board",
    emit: true,
    handle: {player: player, room: room, move: move}
  };
};


///////////////////////////////////////////////////////////////////////////

interface initBoardAction {
  type: SocketActionTypes.INIT_BOARD;
  // player: Player;
}

export const initBoard = (player: iPlayer, room: iRoom) => {
  console.log('[initBoard]')
  return {
    event: "initialBoard",
    emit: true,
    handle: {player: player, room: room}
  };
};


interface speedUpAction {
  type: SocketActionTypes.SPEED_UP
  newSpeed: number
}

export const speedUp = (speed: number) => {
  return {
    type: SocketActionTypes.SPEED_UP,
    newSpeed: speed
  }
}

///////////////////////////////////////////////////////////////////////////

interface refreshPlayerAction {
  type: SocketActionTypes.REFRESH_PLAYER;
  player: iPlayer;
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
  | speedUpAction
  | ResetRoomParamsAction
  | defaultAction;
