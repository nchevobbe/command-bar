import Component from 'inferno-component';
import createElement from 'inferno-create-element';

class Hud extends Component {
  render() {
    let {
      currentInputValue,
      changeCurrentInput,
      focused,
      focusInput,
      blurInput,
    } = this.props;

    const input = createElement("input", {
        className: "command-bar-input",
        type: "search",
        placeholder: "Search…",
        value: currentInputValue || "",
        onInput: e => changeCurrentInput(e.target.value),
        onFocus: focusInput,
        onBlur: blurInput,
    });

    return createElement(
      "header",
      {},
      input,
    );
  }
}

export default Hud;
