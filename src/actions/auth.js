import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SIGNUP_SUCCESS,
}
  from './actionsType';

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = payload => {
  return {
    type: AUTH_SUCCESS,
    payload
  };
};

export const authFail = payload => {
  return {
    type: AUTH_FAIL,
    payload
  };
};

export function authLogout(payload) {
  return {
    type: AUTH_LOGOUT,
    payload
  };
}

/*
Action called after signup success
*/
export function signupSuccess(payload) {
  return {
    type: SIGNUP_SUCCESS,
    payload
  };
}

