import React from 'react';
import Navbar from './../Navbar';
import Sidebar from './../Sidebar';
import CartList from './CartList';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Cart = ({ lists, orders, auth }) => {
  let history = useHistory();
  if (auth.user !== null) {
    if (auth.user.status === 0) {
      history.push('/confirm-password');
    }
  }
  return (
    <div>
      <Navbar />
      <div className='dcontainer'>
        <div className='left-side'>
          <Sidebar />
        </div>
        <div className='main-content'>
          <h1>Cart</h1>
          {orders.length > 0 &&
            orders.map((order) => (
              <CartList
                key={order.rxNumber}
                item={order.items}
                rxNumber={order.rxNumber}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lists: state.cart.lists,
  orders: state.cart.orders,
  auth: state.auth,
});
export default connect(mapStateToProps)(Cart);
