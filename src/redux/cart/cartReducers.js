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
        lists: state.lists.filter((elm) => elm.OrderNumber !== action.payload),
        orders: state.orders.filter((elm) => elm.RxNumber !== action.payload),
      };
    case CLEAR_LIST: {
      return INITIAL_STATE;
    }
    case ADD_TO_CART:
      const listRx = state.orders.map((order) => order.RxNumber);
      const existed = listRx.includes(action.payload.RxNumber);
      if (existed) {
        const index = listRx.indexOf(action.payload.RxNumber);
        const newArray = [...state.orders];
        newArray[index] = {
          ...newArray[index],
          items: [...newArray[index].items, action.payload],
        };
        return {
          ...state,
          lists: state.lists.map((item) =>
            item.OrderNumber === action.payload.RxNumber
              ? { ...item, orders: action.payload }
              : item
          ),
          orders: newArray,
        };
      }
      return {
        ...state,
        lists: state.lists.map((item) =>
          item.OrderNumber === action.payload.RxNumber
            ? { ...item, orders: action.payload }
            : item
        ),
        orders: [
          ...state.orders,
          { RxNumber: action.payload.RxNumber, items: [action.payload] },
        ],
      };
    default:
      return state;
  }
};
