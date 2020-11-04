import { LOAD_ALL } from './localCatalogTypes';
import axios from 'axios';

export const loadCatalogue = () => async (dispatch) => {
  const res = await axios.get('/api/localCatalog');

  dispatch({ type: LOAD_ALL, payload: res.data });
};
