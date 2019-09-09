import { keyBy } from 'lodash';

import remoteData from '../utils/remoteData';
import { history } from '../store/configureStore';
import { setData } from './dataActions';
import { userClear } from './userInputActions';

const init = () => (dispatch, getState) => {
  return Promise.resolve()
  .then(() => {
    dispatch(
      setData({
        error: '',
        loadingIndicator: true,
      })
    );
    return getState().data.token;
  })
}

const handleSearch = (result, jwt) => (dispatch) => {
  const dataMap = keyBy(result, '_id');
  dispatch(setData({ 
    ...dataMap,
    token: jwt,
    loadingIndicator: false,
    searchResults: Object.keys(dataMap),
  }));
};

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

export const searchFood = (searchTerm, userOnly) => (dispatch) => {
  const type = userOnly ? 'SEARCH_USER_FOOD' : 'SEARCH_FOOD';
  dispatch(init())
  .then(token => remoteData(type, { searchTerm, limit: 100 }, token))
  .then(({ result, jwt }) => {
    dispatch(handleSearch(result, jwt));
  })
};

export const addFood = (params) => (dispatch) => {
  dispatch(init())
  .then(token => remoteData('ADD_FOOD', params, token))
  .then(() => {
    dispatch(setData({ loadingIndicator: false }));
    dispatch(userClear());
  })
}

export const editFood = (params) => (dispatch) => {
  dispatch(init())
  .then(token => remoteData('EDIT_FOOD', params, token))
  .then(() => {
    dispatch(setData({ loadingIndicator: false }));
    //dispatch(userClear());
  })
}


export const removeFood = (foodId) => (dispatch, getState) => {
  const { token } = getState().data;
  dispatch(setData({ loadingIndicator: true }));
  remoteData('REMOVE_FOOD', { foodId }, token)
  .then(({ result: { err } }) => {
    dispatch(setData({ loadingIndicator: false }));
    if (err) {
      dispatch(setData({ error: err }));
    } else {
      history.push('/home');
      dispatch(setData({
        [foodId]: null,
      }));       
    }
  })
}

export const searchFoodGroups = (searchTerm) => (dispatch) => {
  dispatch(init())
  .then(token => remoteData('SEARCH_FOOD_GROUPS', { searchTerm }, token))
  .then(({ result, jwt }) => {
    dispatch(handleSearch(result, jwt));
  })
}

export const addFoodGroup = () => (dispatch, getState) => {
  const { groupContents, groupName } = getState().userInput;
  dispatch(init())
  .then(token => remoteData(
    'ADD_FOOD_GROUP',
    {
      description: groupName,
      contents: groupContents,
    },
    token
  ))
};

export const getKeyPair = (key, password) => (dispatch) => {
  remoteData(
    'GET_PAIR',
    {
      password,
      key
    }
  )
  .then(({ decrypted, ok }) => {
    if (ok) {
      dispatch(setData({ keypairResult: 'NOPE' }));
    } else {
      dispatch(setData({ keypairResult: decrypted }));
    }
  })
};


