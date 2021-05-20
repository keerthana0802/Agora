import { put, call } from 'redux-saga/effects';
import _get from 'lodash/get';

export function* loginSaga(entity, apiFunc, data) {
  let token = _get(data, 'params.access_token') || '';
  if (token) {
    // data.params.auth_token = token;
    // apiFunc.loginapi.setHeader('Authorization', `Bearer ${token}`);
    // apiFunc.api.setHeader('Authorization', `Bearer ${token}`);
  }
  const response = yield call(apiFunc.loginapi.profile, data);
  if (response.ok) {
    let id = _get(response, 'data.id');
    // apiFunc.api.setHeader('HTTP_X_TNL_USER_ID', id)
    // apiFunc.loginapi.setHeader('X-TNL-USER-ID', id);
    // apiFunc.api.setHeader('X-TNL-USER-ID', id);
    yield put(entity.success(data.params, response.data));
  } else {
    yield put(entity.failure(data.params, response.data));
  }
}
