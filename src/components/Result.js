import Component from 'inferno-component';
import createElement from 'inferno-create-element';

class Result extends Component {
  render() {
    const {
      text,
      description,
    } = this.props;

    return createElement(
      "div", {
        className: "result-item",
      },
      text,
      description,
    );
  }
}

export default Result;
