import { put, call } from 'redux-saga/effects';
import _get from 'lodash/get';

export function* loginSaga(entity, api, data) {
  const response = yield call(api.loginUser, data);
  if (response.ok) {
    const token = _get(response, 'data.token');
    const userId = _get(response, 'data.profile.user_id');
    const profileId = _get(response, 'data.profile.id');
    api.setHeader('Authorization', token);
    api.setHeader('X-SSUID', userId);
    api.setHeader('X-SSPID', profileId);
    yield put(entity.success(data.params, response.data));
  } else {
    yield put(entity.failure(data.params, response.data));
  }
}
