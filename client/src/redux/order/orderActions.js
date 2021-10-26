import axios from 'axios';
import { LOAD_ORDERS, LOAD_TRANSACTIONS } from './orderTypes';

export const getOrders = (branch) => async (dispatch) => {
  const res = await axios.get(`/api/orders/?branchId=${branch}`);
  console.log('success');

  dispatch({
    type: LOAD_ORDERS,
    payload: res.data,
  });
};

export const getTransactions = (data) => async (dispatch) => {
  const obj = {
    branchKey: data,
  };
  const res = await axios.get('/api/transactions', obj);

  dispatch({
    type: LOAD_TRANSACTIONS,
    payload: res.data,
  });
};
