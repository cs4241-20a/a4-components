import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import './index.css';
import * as serviceWorker from './serviceWorker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div);
});