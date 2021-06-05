
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../reducer';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  blacklist: ['navigation']
};

const persistedReducer = persistReducer(persistConfig, reducers);

/**
 * Function to handle middle ware
 */
const composeByEnv = () => {

  return compose(applyMiddleware(thunk));

};

export const store = createStore(persistedReducer, composeByEnv());
