import createElement from 'inferno-create-element';
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';

import Input from './Input';
import List from './List';
import Breadcrumb from './Breadcrumb';

import actions from '../actions.js';
import selectors from '../selectors.js';

function CommandBar (props) {
  let {
    activeCommandIndex,
    focused,
    displayedCommands,
    loading,
    history = [],
    selection = [],
    // Actions
    addActiveCommandToSelection,
    blurInput,
    currentInputValue,
    changeCurrentInput,
    executeActiveCommand,
    executeCommandAt,
    expand,
    navigateList,
    navigateBackward,
    setActiveItemIndex,
  } = props;

  let resultsList = !loading
    && createElement(List, {
      activeCommandIndex,
      displayedCommands,
      executeCommandAt,
      setActiveItemIndex,
    });

  let breadcrumb;
  if (selection.length || history.length > 0) {
    breadcrumb = createElement(Breadcrumb, {
      history,
      selection
    });
  }

  return createElement("main", {
      className: "command-bar" + (loading ? " loading" : "")
    },
    createElement(Input, {
      addActiveCommandToSelection,
      currentInputValue,
      changeCurrentInput,
      focused,
      expand,
      blurInput,
      loading,
      executeActiveCommand,
      navigateList,
      navigateBackward,
    }),
    breadcrumb,
    resultsList
  );
}

function mapStateToProps(state) {
  console.log("state", state);
  return {
    activeCommandIndex: state.activeCommandIndex,
    currentInputValue: selectors.getCurrentInputValue(state),
    displayedCommands: selectors.getDisplayedCommands(state),
    history: selectors.getHistory(state),
    focused: selectors.getFocused(state),
    loading: state.loading,
    selection: state.selection
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandBar);
