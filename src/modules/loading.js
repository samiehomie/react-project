import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

const LOADING_START = 'loading/LOADING_START';
const LOADING_FINISH = 'loading/LOADING_FINISH';

export const loadingStart = createAction(LOADING_START, type => type);
export const loadingFinish = createAction(LOADING_FINISH, type => type);

const initialState = {};

const loading = handleActions({
  [LOADING_START]: (state, { payload: type }) => produce(state, draft => {
    draft[type] = true;
  }),
  [LOADING_FINISH]: (state, { payload: type }) => produce(state, draft => {
    draft[type] = false;
  })
}, initialState);


export default loading;