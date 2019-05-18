import { history } from '../store/configureStore';

export const showDetail = (foodId) => {
  history.push(`/detail/${foodId}`);
}