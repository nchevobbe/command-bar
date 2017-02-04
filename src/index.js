import Inferno from 'inferno';
import CommandBar from './components/CommandBar';
import createElement from 'inferno-create-element';

import { Provider } from 'inferno-redux';
import configureStore from './store';

import './index.css';

const store = configureStore();

Inferno.render(
  createElement(
    Provider,
    {store},
    createElement(CommandBar, {})
  ),
  document.getElementById('app')
);
