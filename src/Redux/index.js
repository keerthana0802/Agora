// @flow

// import { combineReducers } from 'redux'
import { combineReducers } from 'redux';
import createStore from './createStore';
import rootSaga from '../Sagas';


import StartupReducer, { key as StartupKey } from './StartupRedux'
import LoginReducer, { key as LoginKey } from './LoginRedux'

export default () => {
  const appReducer = combineReducers({
    [StartupKey]: StartupReducer,
    [LoginKey]: LoginReducer
  })

  return createStore(appReducer, rootSaga);
};
