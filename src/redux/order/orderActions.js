import axios from 'axios';
import { LOAD_ORDERS } from './orderTypes';

export const getOrders = (branch) => async (dispatch) => {
  const res = await axios.get(`/api/orders/?branchId=${branch}`);
  console.log('success');

  dispatch({
    type: LOAD_ORDERS,
    payload: res.data,
  });
};
