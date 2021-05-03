import axios from 'axios';

export const changePassword = (formData) => async (dispatch) => {
  console.log(formData);
  const { id, password, status } = formData;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  const obj = {
    password: password,
    status: status,
  };
  await axios.put(`/api/userIds/${id}`, obj, config);
};
