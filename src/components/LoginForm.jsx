import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../redux/auth/authActions';
import { setAlert } from './../redux/alert/alertActions';
import Alerts from './Alerts';
import { useAlert } from 'react-alert';
import { loadUser } from './../redux/auth/authActions';

const LoginForm = ({ login, setAlert, auth, loadUser }) => {
  let history = useHistory();
  const alert = useAlert();
  const { error, isAuthenticated } = auth;
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/home');
    }
  });

  const [loginform, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const { username, password } = loginform;

  const onChange = (e) =>
    setLoginForm({ ...loginform, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
    if (error) {
      setAlert('Invalid Credentials', 'danger');
    }
  };

  return (
    <div className='container'>
      <Alerts />
      <h2>Login Form</h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Username</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={onChange}
            className='form-control'
          />
        </div>
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

        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login, setAlert, loadUser })(
  LoginForm
);
