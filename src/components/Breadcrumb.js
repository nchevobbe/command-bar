import createElement from 'inferno-create-element';

function Breadcrumb(props) {
  const {
    history,
    selection,
  } = props;

  const historyItems = [...history].map(({command, selection}) => {
    return createElement("li", {}, `${command.title}${
      Array.isArray(selection) && selection.length > 0
        ? " (" + getSelectionText(selection) + ")"
        : ""
    }`)
  });

  let selectionItem;
  if (selection.length > 0) {
    selectionItem = createElement("li", {
      className: "active-selection"
    },
    getSelectionText(selection));
  }

  return createElement(
    "ul", {
      className: "breadcrumb",
    },
    ...historyItems,
    selectionItem
  );
}

function getSelectionText(selection) {
  if (!Array.isArray(selection)) {
    return "";
  }
  return selection.map(item => item.title).join(", ");
}

export default Breadcrumb;
