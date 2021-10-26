import axios from 'axios';

export const saveBrand = (formData) => async (dispatch) => {
  const obj = {
    name: formData,
    supplierKey: 1,
  };
  await axios.post('/api/brands', obj);
};
