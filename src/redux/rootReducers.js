import { combineReducers } from 'redux';
import alertReducers from './alert/alertReducers';
import authReducer from './auth/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducers,
});

export default rootReducer;
