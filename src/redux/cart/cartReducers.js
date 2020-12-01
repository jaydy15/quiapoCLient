import {
  ADD_TO_CART,
  CLEAR_LIST,
  NEW_NUMBER,
  REMOVE_FROM_LIST,
} from './cartType';

const INITIAL_STATE = {
  lists: [],
  orders: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_NUMBER:
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };
    case REMOVE_FROM_LIST:
      return {
        ...state,
        lists: [
          state.lists.filter((elm) => elm.OrderNumber !== action.payload),
        ],
        orders: [state.orders.filter((elm) => elm.RxNumber !== action.payload)],
      };
    case CLEAR_LIST: {
      return INITIAL_STATE;
    }
    case ADD_TO_CART:
      return {
        ...state,
        lists: state.lists.map((item) =>
          item.OrderNumber === action.payload.RxNumber
            ? { ...item, orders: action.payload }
            : item
        ),
        orders: [...state.orders, action.payload],
      };
    default:
      return state;
  }
};
