import { USER_SET_TEXT } from '../constants/actionTypes';
import clone from 'clone';
import initialState from './initialState';

export default (state = initialState.userInput, action) => {
  let newState = clone(state);
  const { type, key, value } = action;

  switch (type) {
    case USER_SET_TEXT: 
      newState = { ...newState, ...value };
      break;
  }

  return newState;
}