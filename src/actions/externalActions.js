import { keyBy } from 'lodash';

import remoteData from '../utils/remoteData';
import { history } from '../store/configureStore';
import { setData } from './dataActions';

export const login = (email, password) => (dispatch) => {
  dispatch(setData({
    error: '',
    loadingIndicator: true,
  }));
  remoteData('LOGIN', { email, password })
  .then(({ token }) => {
    dispatch(setData({ loadingIndicator: false }));
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
  dispatch(setData({ loadingIndicator: true }));
  remoteData('SEARCH_FOOD', { searchTerm, limit: 100 }, token)
  .then(({ result, jwt }) => {
    dispatch(setData({ token: jwt }));
    const dataMap = keyBy(result, '_id');
    dispatch(setData({ 
      ...dataMap,
      loadingIndicator: false,
      searchResults: Object.keys(dataMap),
    }));
  })
};

export const addFood = (params) => (dispatch, getState) => {
  const { token } = getState().data;
  dispatch(setData({ loadingIndicator: true }));
  remoteData('ADD_FOOD', params, token)
  .then(() => {
    dispatch(setData({ loadingIndicator: false }));
  })
}

export const addConsume = ({ foodId, servings }) => (dispatch, getState) => {
  const { token } = getState().data;
  dispatch(setData({ loadingIndicator: true }));
  remoteData('ADD_CONSUME', { foodId, servings }, token)
  .then(() => {
    dispatch(setData({ loadingIndicator: false }));
  })
}
