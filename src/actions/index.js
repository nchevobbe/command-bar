import constants from "../constants";

function changeCurrentInput(input) {
  return {
    type: constants.CHANGE_CURRENT_INPUT,
    value: input,
  };
}

function focusInput(input) {
  return {
    type: constants.FOCUS_INPUT,
  };
}

function blurInput(input) {
  return {
    type: constants.BLUR_INPUT,
  };
}

export default {
  changeCurrentInput,
  focusInput,
  blurInput,
};
