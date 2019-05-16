import * as types from '../constants/actionTypes';

export const setData = (value) => (dispatch) => {
  console.log('dispatching this value', value);
  dispatch({
    type: types.SET_DATA,
    value,
  })
};

