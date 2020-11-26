import { LOAD_ORDERS } from './orderTypes';
const INITIAL_STATE = {
  orders: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
};
