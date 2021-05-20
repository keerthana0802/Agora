import { takeLatest, all } from 'redux-saga/effects';
import CMSAPI from '../Services/Api';
import {CreateCreators as LoginCreators, 
  CreateTypes as LoginTypes} from '../Redux/LoginRedux'
import { entitiesSaga } from './EntitiesSaga';
import { startupSaga } from './StartupSaga';
import { loginSaga } from './LoginSaga';
import { logoutSaga } from './LogoutSaga';

const api = CMSAPI.create();

export default function* root() {
  yield all([
     takeLatest(
      LoginTypes.REQUEST,
      loginSaga,
      LoginCreators,
      api.loginUser
    ),
  ]);
}
