import Component from 'inferno-component';
import createElement from 'inferno-create-element';

import Result from './Result';

class Results extends Component {
  render() {
    let {
      results
    } = this.props;

    let resultsItems = results.map(result =>
      createElement("li", {},
        createElement(Result,result)
      )
    );

    return createElement(
      "ul", {
        className: "command-bar-results",
      },
      ...resultsItems
    );
  }
}

export default Results;
