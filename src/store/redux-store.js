
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import registration from "./Registration-reducer"
import { thunk } from "redux-thunk"

let reducers = combineReducers({
  registration: registration
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store

export default store;