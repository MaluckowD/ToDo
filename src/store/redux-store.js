
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";

import { thunk } from "redux-thunk"

let reducers = combineReducers({
  registration: registartion
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store

export default store;