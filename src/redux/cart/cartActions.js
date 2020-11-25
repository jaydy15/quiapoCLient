import { CLEAR_LIST, NEW_NUMBER, ADD_TO_CART, FOR_APPROVAL } from './cartType';
import axios from 'axios';

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

export const forApproval = (formData) => async (dispatch) => {
  console.log(formData);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = await axios.post('/api/transactions', formData, config);

  dispatch({
    type: FOR_APPROVAL,
    payload: res.data,
  });
};
