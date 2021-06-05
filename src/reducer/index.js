import { combineReducers } from 'redux';
import auth from './auth';
import products from './product';


const appReducers = combineReducers({
  auth,
  products,
});

const rootReducer = (state, action) => {
  const { type } = action;
  if (type === 'SIGN_OUT') {
    state = undefined;
  }
  return appReducers(state, action);
};

export default rootReducer;
