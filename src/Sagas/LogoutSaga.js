import { put, call, select } from 'redux-saga/effects';
import { getUserToken } from './Selectors';

export function* logoutSaga(entity, api, data) {
  const token = yield select(getUserToken) || '';

  if (token) {
    window.BJS &&
      window.BJS.logout(token, (response) => {
        window.localStorage.clear();
      });
    const response = yield call(api.oauthLogout, token);
    api.setHeader('Authorization', '');
    if (response.ok) {
      window.localStorage.clear();
      yield put(entity.logoutSuccess({}));
    } else {
      window.localStorage.clear();
      yield put(entity.failure(response.data));
    }
  }
}
