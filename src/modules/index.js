import { combineReducers } from 'redux';
import post from './post';
import loading from './loading';
import users, { userSage } from './users';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  post, loading, users
});

export default rootReducer;

export function* rootSaga() {
  yield all([userSage()]);
}