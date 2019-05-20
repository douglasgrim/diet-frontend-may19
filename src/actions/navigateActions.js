import { history } from '../store/configureStore';
import { userClear } from './userInputActions';

export const showDetail = (foodId) => dispatch => {
  history.push(`/detail/${foodId}`);
  dispatch(userClear());
}

export const addFoodGroup = () => dispatch => {
  history.push(`/add-food-group`);
  dispatch(userClear()); 
}