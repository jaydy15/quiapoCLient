import { LOAD_ORDER_TYPE, LOAD_BRAND } from './orderTypes';
const INITIAL_STATE = {
  orderType: null,
  brand: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_ORDER_TYPE:
      return { ...state, orderType: action.payload };
    case LOAD_BRAND:
      return { ...state, brand: action.payload };
    default:
      return state;
  }
};
