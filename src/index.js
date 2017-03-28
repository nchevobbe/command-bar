import Inferno from 'inferno';
import CommandBar from './components/CommandBar';
import createElement from 'inferno-create-element';

import { Provider } from 'inferno-redux';
import configureStore from './store';
import actions from './actions';

const init = function(container, options) {
  const store = configureStore(options);
  Inferno.render(
    createElement(
      Provider,
      {store},
      createElement(CommandBar, {
        className: options.className
      })
    ),
    container
  );

  return {
    expand: () => store.dispatch(actions.expand()),
    prompt: (title, subCommands) => store.dispatch(actions.prompt(title, subCommands)),
  };
};

export {init};