import {
  LOAD_ORDER_TYPE,
  LOAD_BRAND,
  LOAD_ITEM_CATEGORY,
  LOAD_MODEL,
} from './orderTypes';
const INITIAL_STATE = {
  orderType: null,
  brand: null,
  itemCategory: null,
  model: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_ORDER_TYPE:
      return { ...state, orderType: action.payload };
    case LOAD_BRAND:
      return { ...state, brand: action.payload };
    case LOAD_ITEM_CATEGORY:
      return { ...state, itemCategory: action.payload };
    case LOAD_MODEL:
      return { ...state, model: action.payload };
    default:
      return state;
  }
};
