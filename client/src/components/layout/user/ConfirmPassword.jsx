import React, { useState } from 'react';
import { connect } from 'react-redux';
import { changePassword } from '../../../redux/user/userActions';
import axios from 'axios';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import { setAlert } from '../../../redux/alert/alertActions';
import Alerts from '../../Alerts';
import { logout } from '../../../redux/auth/authActions';
import { clearList } from '../../../redux/cart/cartActions';

const ConfirmPassword = ({ id, setAlert, logout, clearList }) => {
  let history = useHistory();
  const alert = useAlert();
  const [passwordform, setpasswordForm] = useState({
    password: '',
    password2: '',
  });

  const { password, password2 } = passwordform;

  const onChange = (e) =>
    setpasswordForm({ ...passwordform, [e.target.name]: e.target.value });

  const onLogout = () => {
    logout();
    history.push('/');
  };
  const onSubmit = (e) => {
    const obj = {
      password: password,
      status: 1,
    };
    e.preventDefault();
    if (password !== password2) {
      setAlert(`password didn't match , please try again`, 'danger');
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      try {
        axios.put(`/api/userIds/${id}`, obj, config);
        setAlert(
          'Password Successfully Updated, Please Login Again',
          'success'
        );
      } catch (error) {
        console.log(error);
      }
      onLogout();
    }
  };
  return (
    <div>
      <div>
        <Navbar />
        <div className='dcontainer'>
          <div className='left-side'>
            <Sidebar />
          </div>
          <div className='main-content'>
            <h1>Confirm Password</h1>
            <Alerts />
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>ReType Password</label>
                <input
                  type='password'
                  name='password2'
                  value={password2}
                  onChange={onChange}
                  className='form-control'
                />
              </div>

              <input
                type='submit'
                value='Confirm Password'
                className='btn btn-primary btn-block'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStatetoProps = (state) => ({
  id: state.auth.user.id,
});

export default connect(mapStatetoProps, { setAlert, logout, clearList })(
  ConfirmPassword
);
