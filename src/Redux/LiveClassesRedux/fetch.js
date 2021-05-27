// @flow

import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    request: ['id', 'params'],
    success: ['params', 'data'],
    failure: ['params', 'error']
  },
  { prefix: 'FETCH_LIVE_CLASSES_' }
);

export { Types, Creators };

const request = (state: Object, action: Object) =>
  state.merge({ fetching: true, error: null });

const success = (state: Object, { data }: Object) =>
  state.merge({
    fetching: false,
    data,
    error: null
  });

const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error });

export default {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure
};
