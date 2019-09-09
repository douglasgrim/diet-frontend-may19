import {
  USER_SET_TEXT,
  USER_CLEAR,
  ADD_FOOD_TO_GROUP,
  EDIT_GROUP_SERVINGS,
  REMOVE_GROUP_SERVING,
} from '../constants/actionTypes';
import clone from 'clone';
import initialState from './initialState';

export default (state = initialState.userInput, action) => {
  let newState = clone(state);
  let groupContents;
  const { foodId, servings, type, value } = action;

  switch (type) {
    case USER_SET_TEXT: 
      newState = { ...newState, ...value };
      break;
    case USER_CLEAR:
      newState = {};
      break;
    case ADD_FOOD_TO_GROUP:
      groupContents = newState.groupContents || [];
      groupContents = groupContents.filter(group => group.foodId !== action.foodId);
      groupContents.push({
        foodId,
        servings
      });
      newState = { ...newState, groupContents };
      break;
    case EDIT_GROUP_SERVINGS:
      groupContents = newState.groupContents || [];
      groupContents = groupContents.map(({ foodId, servings }) => {
        if (foodId !== action.foodId) {
          return { foodId, servings };
        }
        return ({
          foodId,
          servings: action.servings
        })
      });
      newState = { ...newState, groupContents };
      break;
    case REMOVE_GROUP_SERVING:
      groupContents = newState.groupContents || [];
      groupContents = groupContents.filter(group => group.foodId !== action.foodId);
      newState = { ...newState, groupContents };
  }

  return newState;
}