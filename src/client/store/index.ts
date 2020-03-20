import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  Store
} from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import socketMiddleware from "../store/middlewares/socketMiddleware";

import { roomReducer, iState } from "./reducers/roomReducer";
import { RoomActions } from "./actions/roomActions";

// Create an interface for the application state
export interface IAppState {
  roomState: iState;
}

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
  roomState: roomReducer
});

const middlewares = applyMiddleware(
  thunk as ThunkMiddleware<iState, RoomActions>,
  socketMiddleware()
);

const composeEnhancers =
  ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) ||
  compose;

// Create a configure store function of type `IAppState`
export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, composeEnhancers(middlewares));
  return store;
}

// const store = createStore(socketReducer, composeEnhancers(middlewares));

// export default store;
