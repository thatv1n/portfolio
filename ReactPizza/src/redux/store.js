import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import rootReducer from "./reducers/";

let composeEnhancerces = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  rootReducer,
  composeEnhancerces(applyMiddleware(thunk))
);

window.store = store

export default store;
