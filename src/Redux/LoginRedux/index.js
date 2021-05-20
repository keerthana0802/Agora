import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import createReducer_, {
  Types as CreateTypes,
  Creators as CreateCreators
} from './login';

export const INITIAL_STATE = Immutable({
  data: false,
  error: null
});

export const key = 'session';

export {
  CreateCreators,
  CreateTypes
}

export default createReducer(INITIAL_STATE, {
  ...createReducer_
});
