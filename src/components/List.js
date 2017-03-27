import Component from 'inferno-component';
import createElement from 'inferno-create-element';

import ListItem from './ListItem';

class List extends Component {
  render() {
    let {
      activeCommandIndex,
      displayedCommands,
      executeCommandAt,
      setActiveItemIndex,
    } = this.props;

    let items = displayedCommands.map((item, index) => {
      let classes = ["list-item"];
      if (item.className) {
        classes.push(item.className);
      }
      if (index === activeCommandIndex) {
        classes.push("active");
      }

      return createElement("li", {
          className: classes.join(" "),
        },
        createElement(ListItem, Object.assign({}, item, {
          setActiveItemIndex,
          executeCommandAt,
          index,
        }))
      )
    });

    return createElement(
      "ul", {
        className: "command-bar-list",
      },
      ...items
    );
  }
}

export default List;
