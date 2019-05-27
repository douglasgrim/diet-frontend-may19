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

export const addFoodToGroup = (foodId, servings) => dispatch => {
  dispatch({
    type: types.ADD_FOOD_TO_GROUP,
    foodId,
    servings,
  })
}

export const editGroupServings = (foodId, servings) => dispatch => {
  console.log('editing group servings', foodId, servings);
  dispatch({
    type: types.EDIT_GROUP_SERVINGS,
    foodId,
    servings,
  })
}



