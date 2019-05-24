import { history } from '../store/configureStore';
import { userClear, userSetText } from './userInputActions';
import { clearSearches } from './dataActions';

export const showDetail = (foodId) => dispatch => {
  history.push(`/detail/${foodId}`);
  dispatch(userClear());
}

export const addFoodGroup = () => dispatch => {
  history.push(`/add-food-group`);
  dispatch(userClear());
  dispatch(clearSearches());
}

export const editFood = (foodId, food) => (dispatch) => {
  dispatch(userSetText(food));
  history.push(`/edit-food/${foodId}`);
}