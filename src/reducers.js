import constants from "./constants.js";
import selectors from './selectors.js';
import utils from './utils.js';

function update(state, action) {
  const { type } = action;

  switch (type) {
    case constants.CHANGE_CURRENT_INPUT:
      const searchString = utils.replaceAccentuatedChars(action.value);
      return Object.assign({}, state, {
        activeCommandIndex: 0,
        currentValue: action.value,
        displayedCommands: selectors.getCurrentCommandsForSelection(state, state.selection)
          .filter(cmd => utils.replaceAccentuatedChars(cmd.text).includes(searchString))
      });

    case constants.EXPAND:
      const expandedState = Object.assign({}, state, {
        activeCommandIndex: 0,
        focused: true
      });

      return Object.assign({}, expandedState, {
        displayedCommands: selectors.getCurrentCommandsForSelection(state, state.selection)
      });

    case constants.BLUR_INPUT:
      return Object.assign({}, state, {
        activeCommandIndex: 0,
        focused: false,
        currentValue: "",
        history: [],
        displayedCommands: [],
        selection: []
      });

    case constants.SET_LOADER:
      return Object.assign({}, state, {
        loading: true
      });

    case constants.RECEIVE_COMMAND_RESULTS:
      const nextState = Object.assign({}, state, {
        activeCommandIndex: 0,
        currentValue: "",
        loading: false,
        focused: true,
        history: [...state.history, {
          command: action.command,
          selection: selectors.getSelection(state),
          results: action.results
        }],
        selection: []
      });

      return Object.assign({} ,nextState, {
        displayedCommands: selectors.getCurrentCommandsForSelection(nextState)
      });

    case constants.NAVIGATE_BACKWARD:
      const history = selectors.getHistory(state); 
      const newHistory = history.slice(0, history.length - 1);

      const previousState = Object.assign({}, state, {
        activeCommandIndex: 0,
        currentValue: "",
        loading: false,
        history: newHistory,
        selection: newHistory[newHistory.length - 1]
          ? newHistory[newHistory.length - 1].selection
          : []
      });

      return Object.assign({} ,previousState, {
        displayedCommands: selectors.getCurrentCommandsForSelection(previousState)
      });

    case constants.SET_ACTIVE_ITEM_INDEX:
      const maxIndex = selectors.getDisplayedCommands(state).length - 1;
      const newIndex = action.value;
      return Object.assign({}, state, {
        activeCommandIndex: Math.min(Math.max(0, newIndex), maxIndex),
        focused: true,
      });

    case constants.ADD_ACTIVE_ITEM_TO_SELECTION:
      const command = selectors.getDisplayedCommandAt(state, state.activeCommandIndex);

      if (!command.group) {
        return state;
      }

      const newSelection = [...state.selection, command];
      return Object.assign({}, state, {
        activeCommandIndex: 0,
        currentValue: "",
        displayedCommands: selectors.getCurrentCommandsForSelection(state, newSelection),
        selection: newSelection
      });

    default:
  }

  return state;
}

export default function (options) {
  const initialState = {
    activeCommandIndex: null,
    currentValue: "",
    focused: false,
    loading: false,
    getCommands: options.getCommands,
    displayedCommands: [],
    selection: [],
    history: []
  };

  return (state = initialState, action) => update(state, action);
};
