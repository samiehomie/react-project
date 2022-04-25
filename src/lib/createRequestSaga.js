import { loadingStart, loadingFinish } from '../modules/loading';
import { put, call } from 'redux-saga/effects';

export function createRequestSaga(type, api) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* ({ payload: param }) {
    yield put(loadingStart(type));
    try {
      const resData = yield call(api, param);
      yield put({
        type: SUCCESS,
        payload: resData,
      });
    } catch (e) {
      yield put({ type: FAILURE });
    }
    yield put(loadingFinish(type));
  };
}