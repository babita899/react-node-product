import { persistStore } from 'redux-persist';
import { store } from './configureStore';

let persistor = persistStore(store);

export default persistor;
