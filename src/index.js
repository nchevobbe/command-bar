import Inferno from 'inferno';
import CommandBar from './CommandBar';
import createElement from 'inferno-create-element';
import './index.css';

Inferno.render(
  createElement(CommandBar, {}),
  document.getElementById('app')
);
