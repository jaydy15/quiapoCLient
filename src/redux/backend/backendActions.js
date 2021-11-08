import { LOAD_ALL_CLASSES } from './backendTypes';
import axios from 'axios';

export const saveBrand = (formData) => async (dispatch) => {
  const obj = {
    name: formData,
    supplierKey: 1,
  };
  await axios.post('/api/brands', obj);
};

export const saveIndexType = (name, desc) => async (dispatch) => {
  const obj = {
    name: name,
    desc: desc,
  };
  await axios.post('/api/indexTypes', obj);
};

export const saveProductFamily = (name, desc) => async (dispatch) => {
  const obj = {
    name: name,
    desc: desc,
  };
  await axios.post('/api/productfamilies', obj);
};

export const saveMaterial = (formData) => async (dispatch) => {
  const obj = {
    name: formData,
  };
  await axios.post('/api/lensMaterials', obj);
};

export const saveColor = (formData) => async (dispatch) => {
  const obj = {
    colorName: formData,
  };
  await axios.post('/api/colorDays', obj);
};

export const saveModel = (name, desc) => async (dispatch) => {
  const obj = {
    modelName: name,
    modelDescription: desc,
  };
  await axios.post('/api/fscsaModels', obj);
};

export const saveLensType = (name, desc) => async (dispatch) => {
  const obj = {
    name: name,
    desc: desc,
  };
  await axios.post('/api/lensTypes', obj);
};

export const loadClasses = () => async (dispatch) => {
  const res = await axios.get('/api/localClasses');

  dispatch({ type: LOAD_ALL_CLASSES, payload: res.data });
};

export const saveCSAItems = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };

  await axios.post('/api/csaItems', formData, config);
};

export const saveFSItems = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };

  await axios.post('/api/fsItems', formData, config);
};
