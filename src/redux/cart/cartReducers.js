import {
  ADD_TO_CART,
  CLEAR_LIST,
  NEW_NUMBER,
  REMOVE_CART_ITEM,
  REMOVE_FROM_LIST,
  EDIT_ITEM,
  REMOVE_CURRENT,
  UPDATE_CART,
} from './cartType';

const INITIAL_STATE = {
  lists: [],
  orders: [],
  current: [],
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
        orders: state.orders.filter((elm) => elm.rxNumber !== action.payload),
      };
    case CLEAR_LIST: {
      return INITIAL_STATE;
    }
    case ADD_TO_CART:
      let listRx = state.orders.map((order) => order.rxNumber);
      let existed = listRx.includes(action.payload.rxNumber);
      if (existed) {
        let index = listRx.indexOf(action.payload.rxNumber);
        let newArray = [...state.orders];
        newArray[index] = {
          ...newArray[index],
          items: [...newArray[index].items, action.payload],
        };
        return {
          ...state,
          lists: state.lists.map((item) =>
            item.OrderNumber === action.payload.rxNumber
              ? { ...item, orders: action.payload }
              : item
          ),
          orders: newArray,
        };
      }
      return {
        ...state,
        lists: state.lists.map((item) =>
          item.OrderNumber === action.payload.rxNumber
            ? { ...item, orders: action.payload }
            : item
        ),
        orders: [
          ...state.orders,
          { rxNumber: action.payload.rxNumber, items: [action.payload] },
        ],
      };

    case REMOVE_CART_ITEM:
      let listRx1 = state.orders.map((order) => order.rxNumber);
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
    case EDIT_ITEM:
      return {
        ...state,
        current: [action.payload],
      };
    case REMOVE_CURRENT:
      return {
        ...state,
        current: state.current.filter((elm) => elm.tempID !== action.payload),
      };
    default:
      return state;
  }
};
