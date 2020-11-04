import { CLEAR_LIST, NEW_NUMBER } from './cartType';

const INITIAL_STATE = {
  lists: [],
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

    default:
      return state;
  }
};
