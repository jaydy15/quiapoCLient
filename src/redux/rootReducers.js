import { combineReducers } from 'redux';
import alertReducers from './alert/alertReducers';
import authReducer from './auth/authReducer';
import cartReducers from './cart/cartReducers';
import localCatalogReducers from './localCatalog/localCatalogReducers';
import orderReducers from './order/orderReducers';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducers,
  cart: cartReducers,
  catalogue: localCatalogReducers,
});

const persistConfig = {
  key: 'root',
  storage,
};

export default persistReducer(persistConfig, rootReducer);
