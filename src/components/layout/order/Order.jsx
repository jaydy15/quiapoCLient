import React, { useEffect } from 'react';
import Navbar from './../Navbar';
import Sidebar from './../Sidebar';
import OrderFields from './OrderFields';
import { loadUser } from './../../../redux/auth/authActions';
import { connect } from 'react-redux';

const Order = () => {
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <Navbar />
      <div className='dcontainer'>
        <div className='left-side'>
          <Sidebar />
        </div>
        <div className='main-content'>
          <h1>Orders</h1>
          <OrderFields />
        </div>
      </div>
    </div>
  );
};

export default connect(null, { loadUser })(Order);
