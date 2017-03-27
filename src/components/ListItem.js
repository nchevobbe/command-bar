import Component from 'inferno-component';
import createElement from 'inferno-create-element';

class ListItem extends Component {
  onItemMouseOver(e, index) {
    this.props.setActiveItemIndex(index);
  }

  onItemMouseDown(e, index) {
    e.preventDefault();
    e.stopPropagation();
    this.props.executeCommandAt(index);
    return false;
  }

  render() {
    const {
      description,
      index,
      title,
    } = this.props;

    return createElement(
      "div", {
        onMouseOver: e => this.onItemMouseOver(e, index),
        // Using onMouseDown instead of onClick to prevent the blur event in Input.js to fire.
        onMouseDown: e => this.onItemMouseDown(e, index)
      },
      createElement("span", {
        className: "title"
      }, title),
      description && createElement("span", {
        className: "description"
      }, description),
    );
  }
}

export default ListItem;
