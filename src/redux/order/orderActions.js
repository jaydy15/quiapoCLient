import axios from 'axios';
import { LOAD_ORDER_TYPE, LOAD_BRAND } from './orderTypes';

export const getOrderType = () => async (dispatch) => {
  const res = await axios.get('/api/ordertypes');
  dispatch({ type: LOAD_ORDER_TYPE, payload: res.data });
};

export const getBrands = () => async (dispatch) => {
  const res = await axios.get('/api/brands');
  dispatch({ type: LOAD_BRAND, payload: res.data });
};
