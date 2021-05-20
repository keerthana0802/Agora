import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    request: ['courseId', 'batchId', 'params'],
    success: [],
    failure: ['params', 'error']
  },
  { prefix: 'UPDATE_BATCH_' }
);

export { Types, Creators };

const request = (state) => state.merge({ updating: true, error: null });

const success = (state) => state.merge({ updating: false });

const failure = (state, { error }) => state.merge({ updating: false, error });

export default {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure
};
