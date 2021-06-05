import { updateObject } from '../helpers/utility';
import UserModel from '../models/UserModel';

import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SIGNUP_SUCCESS
} from '../actions/actionsType';

const initialState = {
  ...new UserModel({}),
  title: 'Dashboard',
};

const authStart = (state) => {
  return updateObject(state, { errors: null });
};

const authSuccess = (state, payload) => {
  return updateObject(state, {
    ...payload,
    errors: null,
  });
};

const authFail = (state, payload) => {
  return updateObject(state, {
    errors: payload,
    isAuthenticated: false
  });
};

const authLogout = (state, payload) => {
  return updateObject({ ...state, ...initialState }, {
    redirectPath: payload.path || '/signIn'
  });
};


const signupSuccess = (state, payload) => {
  return updateObject(state, {
    ...payload,
  });
};


const reducer = (state, { type, payload = null }) => {
  state = state || initialState;
  switch (type) {
    case AUTH_START:
      return authStart(state);
    case AUTH_SUCCESS:
      return authSuccess(state, payload);
    case AUTH_FAIL:
      return authFail(state, payload);
    case AUTH_LOGOUT:
      return authLogout(state, payload);
    case SIGNUP_SUCCESS:
      return signupSuccess(state, payload);
    default:
      return state;
  }
};

export default reducer;
