const {
  applyMiddleware,
  createStore
} = require("redux");

import thunk from 'redux-thunk';
import getReducer from "./reducers.js";

const configureStore = function(options) {
  return createStore(
    getReducer(options),
    applyMiddleware(thunk)
  );
}

export default configureStore;
