import { LOAD_ALL_CLASSES } from './backendTypes';
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_ALL_CLASSES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
