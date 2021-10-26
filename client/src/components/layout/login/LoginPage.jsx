import React from 'react';
import LoginForm from '../../LoginForm';
import './login.css';

const LoginPage = () => {
  return (
    <div className='holder'>
      <div className='colOne'>
        {/* <img
          // src='https://i.postimg.cc/jjSz5GxV/Ideal-Vision-Center.png'
          src='https://i.postimg.cc/DydQLx35/aacf9705e4162910489bf783d40663e8.jpg'
          alt=''
        /> */}
      </div>
      <div className='colTwo'>
        <LoginForm />
      </div>
    </div>
  );
};
// https://i.postimg.cc/SNnZD7NC/common.jpg
export default LoginPage;
