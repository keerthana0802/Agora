
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import Routes from './Routes';
// import {ThemeColor} from './Themes';

import createStore from './Redux';

const store = createStore();

const App = () => (
  <BrowserRouter>
  <Provider store={store}>
    <AppContainer>
      <Routes />
    </AppContainer>
  </Provider>
  </BrowserRouter>
);

export default App;
