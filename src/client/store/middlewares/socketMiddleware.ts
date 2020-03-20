import io from "socket.io-client";

const socketMiddleware = () => {
  const socket = io("http://localhost:4001");
  // console.log("[socketMiddleware]");

  return ({ dispatch, getState }: any) => (next: any) => (action: any) => {
    if (!action.event) {
      return next(action);
    }
    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    const { event, leave, handle, emit, type, ...rest } = action;

    if (leave) {
      // console.log("stop Listening at : " + event);
      socket.removeListener(event);
    }
    if (emit) {
      // console.log("action", action);
      // console.log("emit: " + event);
      return socket.emit(event, handle);
      // return socket.emit(event, sent_data);
    }

    let handleEvent = handle;
    if (typeof handleEvent === "string") {
      handleEvent = (result: any) =>
        dispatch({ type: handle, result, ...rest });
    }
    // return socket.on(event, handleEvent);
    return socket.on(event, handleEvent);
  };
};

export default socketMiddleware;
