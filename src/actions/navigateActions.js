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

export const searchFoodGroups = () => dispatch => {
  history.push(`/search-food-groups`);
  dispatch(userClear());
  dispatch(clearSearches());
}

export const editFood = (foodId, food) => (dispatch) => {
  dispatch(userSetText(food));
  history.push(`/edit-food/${foodId}`);
}

export const goHome = () => (dispatch) => {
  dispatch(userClear());
  dispatch(clearSearches());
  history.push('/home');
}

export const addFood = () => (dispatch) => {
  dispatch(userClear());
  history.push('/add-food');
}
