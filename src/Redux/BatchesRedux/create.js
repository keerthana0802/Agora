// @flow

import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    request: ['id', 'params'],
    success: ['params', 'data'],
    failure: ['params', 'error']
  },
  { prefix: 'CREATE_BATCHE_' }
);

export { Types, Creators };

const request = (state: Object, action: Object) =>
  state.merge({ creating: true, error: null });

const success = (state: Object, { data }: Object) =>
  state.merge({
    creating: false,
    creating_data: data,
    error: null
  });

const failure = (state: Object, { error }: Object) =>
  state.merge({ creating: false, error });

export default {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure
};
