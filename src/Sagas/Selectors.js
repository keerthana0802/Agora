import _get from 'lodash/get';

export const getUser = (state) => state.session;
export const getUserToken = (state) => _get(state.session, 'data.access_token');
export const getUserId = (state) => _get(state.session, 'data.id');
export const eventsData = (state) => state.eventsData;
