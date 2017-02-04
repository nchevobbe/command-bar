function getCurrentInputValue(state) {
  return state.currentValue;
}

function getResults(state) {
  return state.results;
}

function getTasks(state) {
  return state.tasks;
}

function getFocused(state) {
  return state.focused;
}

export default {
  getCurrentInputValue,
  getFocused,
  getResults,
  getTasks,
};
