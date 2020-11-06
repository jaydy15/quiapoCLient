import React from 'react';
import Navbar from './../Navbar';
import Sidebar from './../Sidebar';
import CartList from './CartList';
import { connect } from 'react-redux';

const Cart = ({ lists }) => {
  console.log(lists);
  return (
    <div>
      <Navbar />
      <div className='dcontainer'>
        <div className='left-side'>
          <Sidebar />
        </div>
        <div className='main-content'>
          <h1>Cart</h1>
          {lists.length > 0 &&
            lists.map((item) => (
              <p key={item.OrderNumber}>{item.OrderNumber}</p>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lists: state.cart.lists,
});
export default connect(mapStateToProps)(Cart);
