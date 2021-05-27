// @flow

import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    request: ['params'],
    success: ['params', 'data'],
    failure: ['params', 'error']
  },
  { prefix: 'LOGIN_USER_' }
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
  state.merge({ fetching: false, error, data: null });

export default {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure
};
