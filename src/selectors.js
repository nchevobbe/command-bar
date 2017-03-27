function getCurrentInputValue(state) {
  return state.currentValue;
}

function getDisplayedCommands(state) {
  return state.displayedCommands;
}

function getDisplayedCommandAt(state, index) {
  return getDisplayedCommands(state)[index];
}

function getHistory(state) {
  return state.history;
}

function getCurrentCommands(state) {
  // Get the last entry of history
  const history = getHistory(state);
  if (!Array.isArray(history) || history.length === 0) {
    return state.getCommands();
  }

  const [current] = [...history].reverse();
  return current.results;
}

function getCurrentCommandsForSelection(state, selection) {
  const commands = getCurrentCommands(state);

  // If there's no selection
  if (!Array.isArray(selection) || selection.length === 0) {
    // Returns all the command which are not group specific
    return commands.filter(command => !command.forGroup);
  }

  // If there's a selection, retrieve the group
  const group = selection[0].group;
  // Returns only commands which 
  // - are of the same group 
  // - are not in the selection yet
  // - are dedicated to this group
  const stringifiedSelection = selection.map(command => JSON.stringify(command));
  return commands.filter(command =>
    stringifiedSelection.includes(JSON.stringify(command)) === false
    && (
      command.group === group 
      || command.forGroup === group
    )
  );
}

function getSelection(state) {
  return state.selection;
}

function getFocused(state) {
  return state.focused;
}

export default {
  getCurrentInputValue,
  getFocused,
  getHistory,
  getDisplayedCommands,
  getDisplayedCommandAt,
  getCurrentCommands,
  getCurrentCommandsForSelection,
  getSelection,
};
