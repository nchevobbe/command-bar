import createElement from 'inferno-create-element';
import constants from '../constants.js';
function Input (props) {
  let {
    currentInputValue,
    expand,
    blurInput,
    loading,
    focused
  } = props;

  const input = createElement("input", {
    className: "command-bar-input",
    disabled: loading === true,
    type: "search",
    placeholder: loading ? "Loading…" : "Search…",
    ref : el => {
      if (focused !== true) {
        el.blur()
      } else {
        el.focus();
      }
    },
    value: currentInputValue || "",
    onInput:e => onInput(e, props), 
    onKeyDown:e => onKeyDown(e, props),
    onFocus: () => expand(),
    onBlur: blurInput,
  });

  return createElement(
    "header",
    {},
    input,
  );
}

function onInput(e, props) {
  const excludedChars = [","];
  if ( !excludedChars.includes(e.target.value)) {
    props.changeCurrentInput(e.target.value);
  }
}

function onKeyDown(e, props) {
  switch(e.key) {
    case "Escape":
      props.blurInput();
      return;
    case "ArrowDown":
      props.navigateList(constants.DOWN);
      return;
    case "ArrowUp":
      props.navigateList(constants.UP);
      return;
    case "ArrowRight":
    case "Tab":
      if(e.shiftKey !== true) {
        props.executeActiveCommand();
      } else {
        e.preventDefault();
        e.stopPropagation();
        props.navigateBackward();
      }
      return;
    case "ArrowLeft":
      if (e.target.value === "") {
        props.navigateBackward();
      }
      return;
    case "Enter":
      props.executeActiveCommand();
      return;
    case ",":
      props.addActiveCommandToSelection();
      return;
    default:
      return;
  }
}

export default Input;
