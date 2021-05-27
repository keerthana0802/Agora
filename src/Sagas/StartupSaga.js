import { put, select } from 'redux-saga/effects';
import { getUserToken, getUser } from './Selectors';
import _get from 'lodash/get';

export function* startupSaga(startupCreators, api, data) {
  const accessToken = yield select(getUserToken);
  const session = yield select(getUser);
  if (accessToken) {
    const token = _get(session, 'data.token');
    const userId = _get(session, 'data.profile.user_id');
    const profileId = _get(session, 'data.profile.id');
    api.setHeader('Authorization', token);
    api.setHeader('X-SSUID', userId);
    api.setHeader('X-SSPID', profileId);
    yield put(startupCreators.inited());
  } else {
    yield put(startupCreators.inited());
  }
}
