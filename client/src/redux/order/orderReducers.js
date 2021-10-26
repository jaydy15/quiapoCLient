import { LOAD_ORDERS, LOAD_TRANSACTIONS } from './orderTypes';
const INITIAL_STATE = {
  orders: '',
  transactions: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return { ...state, orders: action.payload };
    case LOAD_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    default:
      return state;
  }
};
