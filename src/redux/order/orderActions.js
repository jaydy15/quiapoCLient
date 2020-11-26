import axios from 'axios';
import { LOAD_ORDERS } from './orderTypes';

export const getOrders = () => async (dispatch) => {
  const res = await axios.get('/api/transactions');
  dispatch({
    type: LOAD_ORDERS,
    payload: res.data,
  });
};
