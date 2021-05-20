import { put, select } from 'redux-saga/effects';
import { getUserToken, getUserId } from './Selectors';

export function* startupSaga(startupCreators, apiFunc, data) {
  const accessToken = yield select(getUserToken);
  const userId = yield select(getUserId);

  if (accessToken) {
    apiFunc.api.setHeader('Authorization', `Bearer ${accessToken}`);
    apiFunc.loginapi.setHeader('Authorization', `Bearer ${accessToken}`);
    apiFunc.loginapi.setHeader('X-TNL-USER-ID', userId);
    apiFunc.api.setHeader('X-TNL-USER-ID', userId);
    yield put(startupCreators.inited());
  } else {
    yield put(startupCreators.inited());
  }
}
