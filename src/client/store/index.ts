import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  Store
} from "redux";
import thunk from "redux-thunk";
import socketMiddleware from "../store/middlewares/socketMiddleware";

import { socketReducer, iState } from "./reducers/socketReducer";

// Create an interface for the application state
export interface IAppState {
  socketState: iState;
}

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
  socketState: socketReducer
});

const middlewares = applyMiddleware(thunk, socketMiddleware());

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
