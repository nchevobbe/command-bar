import Component from 'inferno-component';
import createElement from 'inferno-create-element';
import constants from '../constants.js';

class Input extends Component {
  onInput(e) {
    const excludedChars = [","];
    if ( !excludedChars.includes(e.target.value)) {
      this.props.changeCurrentInput(e.target.value);
    }
  }

  onKeyDown(e) {
    switch(e.key) {
      case "Escape":
        this.props.blurInput();
        return;
      case "ArrowDown":
        this.props.navigateList(constants.DOWN);
        return;
      case "ArrowUp":
        this.props.navigateList(constants.UP);
        return;
      case "ArrowRight":
      case "Tab":
        if(e.shiftKey !== true) {
          this.props.executeActiveCommand();
        } else {
          e.preventDefault();
          e.stopPropagation();
          this.props.navigateBackward();
        }
        return;
      case "ArrowLeft":
        if (e.target.value === "") {
          this.props.navigateBackward();
        }
        return;
      case "Enter":
        this.props.executeActiveCommand();
        return;
      case ",":
        this.props.addActiveCommandToSelection();
        return;
      default:
        return;
    }
  }

  render() {
    let {
      currentInputValue,
      expand,
      blurInput,
      loading,
      focused
    } = this.props;

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
      onInput:e => this.onInput(e), 
      onKeyDown:e => this.onKeyDown(e),
      onFocus: () => expand(),
      onBlur: blurInput,
    });

    return createElement(
      "header",
      {},
      input,
    );
  }
}

export default Input;
