import produce from 'immer';
import * as api from '../lib/api';
import { createActionTypes } from '../lib/createActionTypes';
import { createRequestThunk } from '../lib/createRequestThunk';
import { handleActions } from 'redux-actions';

const [GET_POST, GET_POST_SUCCESS, GET_POST_FAILURE] =
  createActionTypes('post/GET_POST');

export const getPostThunk = createRequestThunk(GET_POST, api.getPost);

const initialState = {
  post: null,
  postError: null,
};

const post = handleActions({
  [GET_POST_SUCCESS]: (state, { payload: data }) => produce(state, draft => {
    draft.post = data;
    draft.postError = false;
  }),
  [GET_POST_FAILURE]: (state) => produce(state, draft => {
    draft.postError = true;
  })
}, initialState);

export default post;



