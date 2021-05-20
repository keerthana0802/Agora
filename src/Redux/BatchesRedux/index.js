import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import createReducer_, {
  Types as CreateTypes,
  Creators as CreateCreators
} from './create';

import fetchReducer, {
  Types as FetchTypes,
  Creators as FetchCreators
} from './fetch';

import detailReducer, {
  Types as DetailTypes,
  Creators as DetailCreators
} from './details';

import updateReducer, {
  Types as UpdateTypes,
  Creators as UpdateCreators
} from './update';

export const INITIAL_STATE = Immutable({
  data: false,
  error: null
});

export const key = 'batches';

export {
  CreateCreators,
  CreateTypes,
  FetchTypes,
  FetchCreators,
  DetailTypes,
  DetailCreators,
  UpdateTypes,
  UpdateCreators
};

export default createReducer(INITIAL_STATE, {
  ...createReducer_,
  ...fetchReducer,
  ...detailReducer,
  ...updateReducer
});
