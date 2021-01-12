import {
  ADD_TO_CART,
  CLEAR_LIST,
  NEW_NUMBER,
  REMOVE_CART_ITEM,
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
      let listRx = state.orders.map((order) => order.RxNumber);
      let existed = listRx.includes(action.payload.RxNumber);
      if (existed) {
        let index = listRx.indexOf(action.payload.RxNumber);
        let newArray = [...state.orders];
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

    case REMOVE_CART_ITEM:
      let listRx1 = state.orders.map((order) => order.RxNumber);
      let index = listRx1.indexOf(action.payload.RxNumber);
      const updatedArray = [...state.orders];
      const filtered = updatedArray[index].items.filter(
        (item) => item.tempID !== action.payload.itemNumber
      );
      updatedArray[index] = {
        ...updatedArray[index],
        items: filtered,
      };
      return {
        ...state,
        orders: updatedArray,
      };
    default:
      return state;
  }
};
