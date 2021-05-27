import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import fetchReducer, {
  Types as FetchTypes,
  Creators as FetchCreators
} from './fetch';

export const INITIAL_STATE = Immutable({
  data: false,
  error: null
});

export const key = 'liveClasses';

export { FetchTypes, FetchCreators };

export default createReducer(INITIAL_STATE, {
  ...fetchReducer
});
