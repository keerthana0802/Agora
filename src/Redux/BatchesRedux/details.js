// @flow

import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    request: ['id', 'batchId', 'params'],
    success: ['params', 'data'],
    failure: ['params', 'error']
  },
  { prefix: 'FETCH_BATCHE_SCHEDULES_DETAILS_' }
);

export { Types, Creators };

const request = (state: Object, action: Object) =>
  state.merge({ detailing: true, error: null });

const success = (state: Object, { data }: Object) =>
  state.merge({
    detailing: false,
    batch_details: data,
    error: null
  });

const failure = (state: Object, { error }: Object) =>
  state.merge({ detailing: false, error, batch_details: null });

export default {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure
};
