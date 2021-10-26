import { LOAD_ALL } from './localCatalogTypes';
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_ALL:
      return { ...state, ...action.payload, loading: false };
    default:
      return state;
  }
};
