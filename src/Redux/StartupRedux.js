// @flow

import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  startup: [],
  inited: []
});

export const INITIAL_STATE = Immutable({
  startup: false,
  inited: false
});

export const startup = (state: Object) => state.merge({ startup: true });

export const inited = (state: Object) => state.merge({ inited: true });

export const StartupTypes = Types;

export { Types, Creators };

export const key = 'startup';

export const selectStartupInited = (state) => state[key].inited;

export default createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup,
  [Types.INITED]: inited
});
