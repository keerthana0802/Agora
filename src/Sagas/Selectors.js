import _get from 'lodash/get';

export const getUser = (state) => state.session;
export const getUserToken = (state) => _get(state.session, 'data.token');
