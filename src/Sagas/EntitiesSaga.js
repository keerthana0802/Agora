import { put, call } from 'redux-saga/effects';
import { getUser } from './Selectors';
import _get from 'lodash/get';

export function* entitiesSaga(entity, apiFunc, data) {
  const currentUser = yield select(getUser);
  let {
    data: {}
  } = currentUser;
  let token = _get(data, 'token');
  if (token) {
    if (!data.params) {
      data.params = {};
    }
  }
  const response = yield call(apiFunc, data);
  if (entity) {
    if (response.ok) {
      yield put(entity.success(data.params, response.data));
    } else {
      yield put(entity.failure(data.params, response.data));
    }
  }
}
