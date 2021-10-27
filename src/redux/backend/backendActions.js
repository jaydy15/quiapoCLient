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

export const saveLensType = (name, desc) => async (dispatch) => {
  const obj = {
    name: name,
    desc: desc,
  };
  await axios.post('/api/lensTypes', obj);
};
