import { keyBy } from 'lodash';

import remoteData from '../utils/remoteData';
import { history } from '../store/configureStore';
import { setData } from './dataActions';

export const login = (email, password) => (dispatch) => {
  dispatch(setData({ error: '' }));
  remoteData('LOGIN', { email, password })
  .then(({ token }) => {
    if (token) {
      history.push('/home');
      dispatch(setData({ token, error: '' }))
    } else {
      dispatch(setData({ error: 'Login Failed' }))
    }
  })
}

export const searchFood = (searchTerm) => (dispatch, getState) => {
  const { token } = getState().data;
  remoteData('SEARCH_USER_FOOD', { searchTerm, limit: 100 }, token)
  .then(({ result, jwt }) => {
    dispatch(setData({ token: jwt }));
    const dataMap = keyBy(result, '_id');
    dispatch(setData({ ...dataMap }));
    dispatch(setData({ searchResults: Object.keys(dataMap) }))
  })
};
