const url = process.env.__URL__;

import { history } from '../store/configureStore';

import { setData } from './dataActions';

export const login = (email, password) => (dispatch) => {

  dispatch(setData({ error: '' }));
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      type: 'LOGIN',
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(({ token }) => {
    if (token) {
      history.push('/boom');
      return dispatch(setData({ token, error: '' }))
    } else {
      return dispatch(setData({ error: 'Login Failed' }))
    }
  })
}