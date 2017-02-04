import constants from "../constants";
import selectors from '../selectors';

const tasks = [{
  text: "Item A",
  description: "Item A Description"
}, {
  text: "Item B",
  description: "Item B Description"
}, {
  text: "Item C",
  description: "Item C Description"
}];

const initialState = {
  currentValue: "",
  tasks: tasks,
  focused: false,
  results: [...tasks]
};

function update(state = initialState, action) {
  const { type, value } = action;

  switch (type) {
    case constants.CHANGE_CURRENT_INPUT:
      return Object.assign({}, state, {
        currentValue: value,
        results: selectors.getTasks(state).filter(task =>
          task.text
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        )
      });
    case constants.FOCUS_INPUT:
      return Object.assign({}, state, {
        focused: true
      });
    case constants.BLUR_INPUT:
      return Object.assign({}, state, {
        focused: false,
        currentValue: "",
        results: tasks,
      });
  }

  return state;
}

export default update;
