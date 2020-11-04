import React, { useEffect } from 'react';
import Navbar from './../Navbar';
import Sidebar from './../Sidebar';
import OrderFields from './OrderFields';
import { loadUser } from './../../../redux/auth/authActions';
import { connect } from 'react-redux';

const Order = ({ catalogue }) => {
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <Navbar />
      {catalogue !== null ? (
        <div className='dcontainer'>
          <div className='left-side'>
            <Sidebar />
          </div>
          <div className='main-content'>
            <h1>Catalogue</h1>
            <OrderFields />
          </div>
        </div>
      ) : (
        <h2>LOADING....</h2>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  catalogue: state.catalogue,
});

export default connect(mapStateToProps, { loadUser })(Order);
