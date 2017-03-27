import constants from "./constants.js";
import selectors from "./selectors.js";

function changeCurrentInput(input) {
  return {
    type: constants.CHANGE_CURRENT_INPUT,
    value: input,
  };
}

function expand() {
  return {
    type: constants.EXPAND
  };
}

function prompt(title, commands) {
  return receiveCommandResults({title}, commands);
}

function blurInput() {
  return {
    type: constants.BLUR_INPUT,
  };
}

function setActiveItemIndex(index) {
  return {
    type: constants.SET_ACTIVE_ITEM_INDEX,
    value: index
  }
}

function navigateList(direction) {
  return (dispatch, getState) => {
    let {
      activeCommandIndex,
    } = getState();

    const index = activeCommandIndex + (
      direction === constants.DOWN
        ? 1
        : -1
    );
    dispatch(setActiveItemIndex(index));
  }
}

function navigateBackward() {
  return {
    type: constants.NAVIGATE_BACKWARD
  }
}

function setLoader() {
  return {
    type: constants.SET_LOADER
  }
}

function executeActiveCommand() {
  return (dispatch, getState) => {
    let {
      activeCommandIndex,
    } = getState();
    dispatch(executeCommandAt(activeCommandIndex));
  };
}

function executeCommandAt(index) {
  return async (dispatch, getState) => {

    const state = getState();
    const displayedCommands = selectors.getDisplayedCommands(state);

    const command = displayedCommands[index];
    if (!command) {
      console.warn("Pas de commande à l'index spécifié", {index, displayedCommands});
      return;
    }

    try {
      if (command.handler) {
        command.handler.call(null, command.data,selectors.getHistory(state));
        dispatch(blurInput());
        return;
      }

      if (command.getSubCommands) {
        dispatch(setLoader());
        const subCommands = await command.getSubCommands(command.data, selectors.getHistory(state));
        dispatch(receiveCommandResults(command, subCommands));
      }
    } catch(e) {
      console.error("executeCommandAt error",e);
      dispatch(receiveCommandResults(command));
    }
  };
}

function receiveCommandResults(command, results = []) {
  return {
    type: constants.RECEIVE_COMMAND_RESULTS,
    command,
    results
  }
}

function addActiveCommandToSelection() {
  return {
    type: constants.ADD_ACTIVE_ITEM_TO_SELECTION
  }
}

export default {
  changeCurrentInput,
  expand,
  prompt,
  blurInput,
  executeActiveCommand,
  executeCommandAt,
  navigateList,
  navigateBackward,
  setLoader,
  receiveCommandResults,
  setActiveItemIndex,
  addActiveCommandToSelection,
};
