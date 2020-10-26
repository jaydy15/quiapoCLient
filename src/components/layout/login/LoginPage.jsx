import React from 'react';
import LoginForm from '../../LoginForm';
import './login.css';

const LoginPage = () => {
  return (
    <div className='holder'>
      <div className='colOne'>
        <img
          src='https://i.postimg.cc/jjSz5GxV/Ideal-Vision-Center.png'
          alt=''
        />
      </div>
      <div className='colTwo'>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
