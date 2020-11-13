import { CLEAR_LIST, NEW_NUMBER, ADD_TO_CART } from './cartType';

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

export const addToCart = (formData) => (dispatch) => {
  console.log(formData);
  dispatch({
    type: ADD_TO_CART,
    payload: formData,
  });
};
