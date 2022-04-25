import { loadingStart, loadingFinish } from '../modules/loading';

export function createRequestThunk(type, api) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (param) => async (dispatch) => {
    dispatch(loadingStart(type));
    try {
      const resData = await api(param);
      dispatch({
        type: SUCCESS,
        payload: resData,
      });
    } catch (e) {
      dispatch({
        type: FAILURE,
      });
    }
    dispatch(loadingFinish(type));
  }
}