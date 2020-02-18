import io from "socket.io-client";

const socketMiddleware = () => {
  const socket = io("http://localhost:4001");
  console.log("[socketMiddleware]");

  return (dispatch: any) => (next: any) => (action: any) => {
    if (typeof action === "function" || !action.event) {
      return next(action);
    }

    const { event, leave, handle, emit, type, ...rest } = action;

    if (leave) {
      console.log("stop Listening at : " + event);
      socket.removeListener(event);
    }
    if (emit) {
      console.log("action", action);
      console.log("emit: " + event);
      return socket.emit(event, handle);
    }

    let handleEvent = handle;
    if (typeof handleEvent === "string") {
      handleEvent = (result: any) =>
        dispatch({ type: handle, result, ...rest });
    }
    return socket.on(event, handleEvent);
  };
};

export default socketMiddleware;
