import Inferno, { render } from 'inferno';
import createElement from 'inferno-create-element';
import CommandBar from './CommandBar';

it('renders without crashing', () => {
  render(
    createElement(CommandBar, {}),
    document.createElement('div')
  );
});
