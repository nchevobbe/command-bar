import Component from 'inferno-component';
import createElement from 'inferno-create-element';

import './CommandBar.css';

class CommandBar extends Component {
  render() {
    return createElement(
      "main", {
        className: "command-bar"
      }
    );
  }
}

export default CommandBar;
