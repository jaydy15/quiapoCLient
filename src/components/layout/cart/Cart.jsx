import React from 'react';
import Navbar from './../Navbar';
import Sidebar from './../Sidebar';

const Cart = () => {
  return (
    <div>
      <Navbar />
      <div className='dcontainer'>
        <div className='left-side'>
          <Sidebar />
        </div>
        <div className='main-content'>
          <h1>Cart</h1>
        </div>
      </div>
    </div>
  );
};

export default Cart;
