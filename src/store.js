const {
    createStore
} = require("redux");

import reducers from "./reducers/index";

const configureStore = function(options) {
  return createStore(reducers);
}

export default configureStore;
