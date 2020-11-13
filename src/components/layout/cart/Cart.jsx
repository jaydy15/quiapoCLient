import React from 'react';
import Navbar from './../Navbar';
import Sidebar from './../Sidebar';
import CartList from './CartList';
import { connect } from 'react-redux';

const Cart = ({ lists, orders }) => {
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
              <CartList key={item.OrderNumber} item={item.orders} />
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lists: state.cart.lists,
  orders: state.cart.orders,
});
export default connect(mapStateToProps)(Cart);
