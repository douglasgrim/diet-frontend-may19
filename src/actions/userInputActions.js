import * as types from '../constants/actionTypes';

export const userSetText = (value) => (dispatch) => {
  dispatch({
    type: types.USER_SET_TEXT,
    value,
  })
};

export const userClear = () => dispatch => {
  dispatch({
    type: types.USER_CLEAR,
  })
};

export const clearSearch = () => dispatch => {
  dispatch(userSetText({ searchResults: [] }));
};

export const addFoodToGroup = (foodId, servings) => dispatch => {
  dispatch({
    type: types.ADD_FOOD_TO_GROUP,
    foodId,
    servings,
  })
}



