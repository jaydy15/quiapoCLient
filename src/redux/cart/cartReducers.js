import { ADD_TO_CART, CLEAR_LIST, NEW_NUMBER } from './cartType';

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
      };
    default:
      return state;
  }
};
