import * as types from '../constants/actionTypes';

export const userSetText = (value) => (dispatch) => {
  dispatch({
    type: types.USER_SET_TEXT,
    value,
  })
};

