import Component from 'inferno-component';
import createElement from 'inferno-create-element';

import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';

import './CommandBar.css';

import Hud from './Hud';
import Results from './Results';
import actions from '../actions';
import selectors from '../selectors';

class CommandBar extends Component {
  render() {
    let {
      currentInputValue,
      changeCurrentInput,
      focused,
      focusInput,
      blurInput,
      results,
    } = this.props;
console.log(this.props);
    let resultsList = focused && createElement(Results, {results});

    return createElement(
      "main", {
        className: "command-bar"
      },
      createElement(Hud, {
        currentInputValue,
        changeCurrentInput,
        focused,
        focusInput,
        blurInput,
      }),
      resultsList
    );
  }
}

function mapStateToProps(state) {
  return {
    currentInputValue: selectors.getCurrentInputValue(state),
    results: selectors.getResults(state),
    focused: selectors.getFocused(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommandBar);
