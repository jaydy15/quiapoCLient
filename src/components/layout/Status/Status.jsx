import React, { useEffect } from 'react';
import Navbar from './../Navbar';
import Sidebar from './../Sidebar';
import { connect } from 'react-redux';
import { getOrders } from './../../../redux/order/orderActions';
import { loadUser } from './../../../redux/auth/authActions';
import { loadCatalogue } from '../../../redux/localCatalog/localCatalogActions';

const Status = ({ orders, getOrders, branch }) => {
  useEffect(() => {
    getOrders();
    //eslint-disable-next-line
  }, []);
  console.log(orders);
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
                  <tr key={od.id}>
                    <th scope='row'>{od.id}</th>
                    <td>{od.rxNumber}</td>
                    <td>{od.status}</td>
                    <td>APPROVE || REJECT </td>
                  </tr>
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
  branch: state.auth.user.BranchDetail.branchTypeKey,
});

export default connect(mapStateToProps, { getOrders })(Status);
