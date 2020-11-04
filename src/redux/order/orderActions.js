import axios from 'axios';
import {
  LOAD_ORDER_TYPE,
  LOAD_BRAND,
  LOAD_ITEM_CATEGORY,
  LOAD_MODEL,
} from './orderTypes';

export const getOrderType = () => async (dispatch) => {
  const res = await axios.get('/api/ordertypes');
  dispatch({ type: LOAD_ORDER_TYPE, payload: res.data });
};

export const getBrands = () => async (dispatch) => {
  const res = await axios.get('/api/brands');
  dispatch({ type: LOAD_BRAND, payload: res.data });
};

export const getItemCategory = () => async (dispatch) => {
  const res = await axios.get('/api/supplyCategories');
  dispatch({ type: LOAD_ITEM_CATEGORY, payload: res.data });
};

export const getModels = () => async (dispatch) => {
  const res = await axios.get('/api/fscsaModels');
  dispatch({ type: LOAD_MODEL, payload: res.data });
};
