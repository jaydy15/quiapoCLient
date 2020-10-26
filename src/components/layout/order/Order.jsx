import React from 'react';
import Dashboard from '../../Dashboard';
import Navbar from './../Navbar';
import Sidebar from './../Sidebar';

const Order = () => {
  return (
    <div>
      <Navbar />
      <div className='dcontainer'>
        <div className='left-side'>
          <Sidebar />
        </div>
        <div className='main-content'>
          <h1>Order</h1>
        </div>
      </div>
    </div>
  );
};

export default Order;
