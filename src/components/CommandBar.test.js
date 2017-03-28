import Inferno, { render } from 'inferno';
import createElement from 'inferno-create-element';
import CommandBar from './CommandBar';
import configureStore from '../store';
import { Provider } from 'inferno-redux';

it('renders without crashing', () => {
  const store = configureStore({
    getCommands: () => []
  });
  Inferno.render(
    createElement(
      Provider,
      {store},
      createElement(CommandBar, {})
    ),
    document.createElement('div')
  );
});
