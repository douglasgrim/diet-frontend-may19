import { SET_DATUM, SET_DATA } from '../constants/actionTypes';
import clone from 'clone';
import initialState from './initialState';

export default (state = initialState.data, action) => {
  let newState = clone(state);
  const { type, key, value } = action;

  switch (type) {
    case SET_DATUM: 
      newState[key] = value;
      break;
    case SET_DATA:
      newState = { ...newState, ...value };
      break;
  }

  return newState;
}