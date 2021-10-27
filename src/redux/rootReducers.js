import { combineReducers } from 'redux';
import alertReducers from './alert/alertReducers';
import authReducer from './auth/authReducer';
import cartReducers from './cart/cartReducers';
import localCatalogReducers from './localCatalog/localCatalogReducers';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import orderReducers from './order/orderReducers';
import backendReducer from './backend/backendReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducers,
  cart: cartReducers,
  catalogue: localCatalogReducers,
  orders: orderReducers,
  classes: backendReducer,
});

const persistConfig = {
  key: 'root',
  blacklist: ['orders'],
  storage,
};

export default persistReducer(persistConfig, rootReducer);
