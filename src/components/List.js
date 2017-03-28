import createElement from 'inferno-create-element';

import ListItem from './ListItem';

function List(props) {
  let {
    activeCommandIndex,
    displayedCommands = [],
    executeCommandAt,
    setActiveItemIndex,
  } = props;

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

export default List;
