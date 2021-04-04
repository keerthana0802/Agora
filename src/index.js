import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import './index.css';
import Routes from './Routes'
const history = createHistory()

ReactDOM.render((
  <Routes />),
  document.getElementById('root')
);

