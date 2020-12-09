import React, { useEffect, Fragment, useState } from 'react';
import Navbar from './../Navbar';
import Sidebar from './../Sidebar';
import { connect } from 'react-redux';
import { getOrders } from './../../../redux/order/orderActions';
import StatusRow from './StatusRow';

const Status = ({ orders, getOrders, branch, user }) => {
  useEffect(() => {
    getOrders();
    //eslint-disable-next-line
  }, []);
  return (
    <Fragment>
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
                  <th scope='col'>#</th>
                  <th scope='col'>RX NUMBER</th>
                  <th scope='col'>STATUS</th>
                  <th scope='col'>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter((od) => od.toBranchKey === branch)
                  .map((od) => (
                    <StatusRow key={od.id} od={od} branch={branch} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
  branch: state.auth.user.BranchDetail.id,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getOrders })(Status);
