import React, { useEffect } from 'react';
import Navbar from './../Navbar';
import Sidebar from './../Sidebar';
import { connect } from 'react-redux';
import { getOrders } from './../../../redux/order/orderActions';
import StatusRow from './StatusRow';

const Status = ({ orders, getOrders, branch, user }) => {
  console.log(orders);
  useEffect(() => {
    getOrders(branch.toString());
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
          <h1>Status</h1>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>TXN NUMBER</th>
                <th scope='col'>RX NUMBER</th>
                <th scope='col'>STATUS</th>
                <th scope='col'>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <StatusRow key={order.items[0].rxNumber} order={order} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
  branch: state.auth.user.BranchDetail.id,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getOrders })(Status);
