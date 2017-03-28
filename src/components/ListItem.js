import createElement from 'inferno-create-element';

function ListItem(props) {
  const {
    description,
    index,
    title,
    setActiveItemIndex,
    executeCommandAt,
  } = props;

  return createElement(
    "div", {
      onMouseOver: e => setActiveItemIndex(index),
      // Using onMouseDown instead of onClick to prevent the blur event in Input.js to fire.
      onMouseDown: e => {
        e.preventDefault();
        e.stopPropagation();
        executeCommandAt(index);
        return false;
      }
    },
    createElement("span", {
      className: "title"
    }, title),
    description && createElement("span", {
      className: "description"
    }, description),
  );
}

export default ListItem;
