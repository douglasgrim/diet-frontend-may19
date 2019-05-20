import * as types from '../constants/actionTypes';

export const setData = (value) => (dispatch) => {
  dispatch({
    type: types.SET_DATA,
    value,
  })
};

export const clearSearches = () => dispatch => {
  dispatch(setData({ searchResults: [] }));
};

