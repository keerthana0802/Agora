import { takeLatest, all } from 'redux-saga/effects';
import CMSAPI from '../Services/Api';
import {
  CreateCreators as LoginCreators,
  CreateTypes as LoginTypes
} from '../Redux/LoginRedux';

import {
  Types as StartupTypes,
  Creators as StartupCreators
} from '../Redux/StartupRedux';

import {
  FetchTypes as FetchLiveClassessType,
  FetchCreators as FetchLiveClassessCreators
} from '../Redux/LiveClassesRedux';

import { entitiesSaga } from './EntitiesSaga';
import { startupSaga } from './StartupSaga';
import { loginSaga } from './LoginSaga';

const api = CMSAPI.create();
//getLiveClasses
export default function* root() {
  yield all([
    takeLatest(StartupTypes.STARTUP, startupSaga, StartupCreators, api),
    takeLatest(LoginTypes.REQUEST, loginSaga, LoginCreators, api),
    takeLatest(
      FetchLiveClassessType.REQUEST,
      entitiesSaga,
      FetchLiveClassessCreators,
      api
    )
  ]);
}
