import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { createActionTypes } from '../lib/createActionTypes';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
import { createRequestSaga } from '../lib/createRequestSaga';

const [GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAILURE]
  = createActionTypes('users/GET_USERS');

const [GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE]
  = createActionTypes('users/GET_USER');

const GET_USERS_ASYNC = 'users/GET_USERS_ASYNC';
const GET_USER_ASYNC = 'users/GET_USER_ASYNC';
export const getUsersAsync = createAction(GET_USERS_ASYNC);
export const getUserAsync = createAction(GET_USER_ASYNC, id => id);

const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);
const getUserSaga = createRequestSaga(GET_USER, api.getUser);

export function* userSage () {
  yield takeLatest(GET_USERS_ASYNC, getUsersSaga);
  yield takeLatest(GET_USER_ASYNC, getUserSaga);
}

const initialState = {
  users: null,
  usersError: null,
  user: null,
  userError: null,
};

const users = handleActions({
  [GET_USERS_SUCCESS]: (state, { payload: data }) => produce(state, draft => {
    draft.users = data;
    draft.usersError = false;
  }),
  [GET_USERS_FAILURE]: (state) => produce(state, draft => {
    draft.usersError = true;
  }),
  [GET_USER_SUCCESS]: (state, { payload: data }) => produce(state, draft => {
    draft.user = data;
    draft.userError = false;
  }),
  [GET_USER_FAILURE]: (state) => produce(state, draft => {
    draft.userError = true;
  }),
}, initialState);

export default users;