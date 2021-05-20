import { put, call } from 'redux-saga/effects';
// import { getUser} from './Selectors'

export function* entitiesSaga(entity, apiFunc, data) {
  //  const currentUser = yield select(getUser)
  //   let {user: {accessToken}} = currentUser
  //   if(accessToken) {
  //     if(!data.token) {
  //      data.token = {}
  //     }
  //     data.token['access_token'] = accessToken
  //   }
  const response = yield call(apiFunc, data);
  if (entity) {
    if (response.ok) {
      yield put(entity.success(data.params, response.data));
    } else {
      yield put(entity.failure(data.params, response.data));
    }
  }
}
