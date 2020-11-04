import { CLEAR_LIST, NEW_NUMBER } from './cartType';

export const newNumber = (formData) => (dispatch) => {
  dispatch({
    type: NEW_NUMBER,
    payload: formData,
  });
};

export const clearList = () => (dispatch) => {
  dispatch({
    type: CLEAR_LIST,
  });
};
