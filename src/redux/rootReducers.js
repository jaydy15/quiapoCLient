import { combineReducers } from 'redux';
import alertReducers from './alert/alertReducers';
import authReducer from './auth/authReducer';
import orderReducers from './order/orderReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducers,
  order: orderReducers,
});

export default rootReducer;
