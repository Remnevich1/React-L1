import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import initReducers from '../reducers';
import middlewares from '../middlewares';

const persistConfig = {
  key: 'geekmessanger',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['messageReducer', 'chatReducer'],
};

export const history = createBrowserHistory();

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

function initStore() {
  const innitialStore = {};
  const store = createStore(
    persistReducer(persistConfig, initReducers(history)),
    // initReducers(history),
    innitialStore,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), ...middlewares)
    )
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
export default initStore;
