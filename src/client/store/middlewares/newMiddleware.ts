import { Dispatch } from "redux";
import io from "socket.io-client";

const createSocketMiddleware = (socket: SocketIOClient.Socket) => {
  return ({ dispatch, getState }: any) => (next: Dispatch) => (action: any) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
};

const socket = io("http://localhost:4001");

const socketMiddleware = createSocketMiddleware(socket);

export default socketMiddleware;
