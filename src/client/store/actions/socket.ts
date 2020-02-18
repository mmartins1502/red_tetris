import * as actionTypes from "./actionTypes";
import { Player } from "../../models/Player";
import { Room } from "../../models/Room";
import { Dispatch } from "redux";

interface Res_roomInfos {
  player: Player;
  room: Room;
  error: string;
}

interface Res_refreshRoom {
  room: Room;
  error: string;
}

export enum SocketActionTypes {
  CREATE_PLAYER_ID = "CREATE_PLAYER_ID",
  CHECK_ROOM = "CHECK_ROOM",
  ROOM_AND_PLAYER = "ROOM_AND_PLAYER",
  LEAVE_ROOM = "LEAVE_ROOM",
  REFRESH_ROOM = "REFRESH_ROOM",
  START_GAME = "START_GAME"
}

interface createPlayerIdAction {
  event: string;
  handle: (data: string) => void;
  type: SocketActionTypes.CREATE_PLAYER_ID;
  payload: string;
}

export const createPlayerId = () => {
  console.log("[createPlayerId] action creator");
  return (dispatch: Dispatch) =>
    dispatch({
      type: actionTypes.CREATE_PLAYER_ID,
      event: "CreatePlayerId",
      handle: (data: string) => {
        dispatch({
          type: actionTypes.CREATE_PLAYER_ID,
          payload: data
        });
      }
    });
};

interface checkRoomAction {
  event: string;
  emit: boolean;
  handle: (formData: Player) => void;
  type: SocketActionTypes.CHECK_ROOM;
}

export const checkRoom = (formData: Player) => {
  console.log("[Room] action creator");
  return {
    event: "Room",
    emit: true,
    handle: formData
  };
};

interface roomHomeInfosAction {
  event: string;
  handle: (data: Res_roomInfos) => void;
  type: SocketActionTypes.ROOM_AND_PLAYER;
  player: Player;
  room: Room;
  error: string;
}

export const roomHomeInfos = () => {
  console.log("[roomHomeInfos] action creator");
  return (dispatch: Dispatch) =>
    dispatch({
      type: actionTypes.ROOM_AND_PLAYER,
      event: "Room",
      handle: (data: Res_roomInfos) => {
        dispatch({
          type: actionTypes.ROOM_AND_PLAYER,
          player: data.player,
          room: data.room,
          error: data.error
        });
      }
    });
};

interface leaveRoomAction {
  event: string;
  emit: boolean;
  handle: {
    player: Player;
    room: Room;
  };
  type: SocketActionTypes.LEAVE_ROOM;
}

export const leaveRoom = (me: Player, room: Room) => {
  const data = {
    player: me,
    room: room
  };
  return (dispatch: Dispatch) => {
    dispatch({
      type: SocketActionTypes.LEAVE_ROOM,
      event: "LeaveRoom",
      emit: true,
      handle: data
    });
    dispatch({
      type: SocketActionTypes.LEAVE_ROOM,
      room: {
        id: "",
        players: [],
        inGame: false,
        star: {
          id: "",
          name: "",
          room: ""
        }
      }
    });
  };
};

interface refreshRoomAction {
  event: string;
  handle: (data: Res_refreshRoom) => void;
  type: SocketActionTypes.REFRESH_ROOM;
  room: Room;
  error: string;
}

export const refreshRoom = () => {
  // console.log("[refreshRoom] action creator");
  return (dispatch: Dispatch) =>
    dispatch({
      type: actionTypes.REFRESH_ROOM,
      event: "RefreshRoom",
      handle: (data: Res_refreshRoom) => {
        dispatch({
          type: actionTypes.REFRESH_ROOM,
          room: data.room,
          error: data.error
        });
      }
    });
};

interface startGameAction {
  event: string;
  emit: boolean;
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

export type SocketActions =
  | createPlayerIdAction
  | checkRoomAction
  | roomHomeInfosAction
  | leaveRoomAction
  | refreshRoomAction
  | startGameAction;
