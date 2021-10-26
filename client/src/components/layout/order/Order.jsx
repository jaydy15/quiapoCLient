import React, { useEffect } from 'react';
import Navbar from './../Navbar';
import Sidebar from './../Sidebar';
import OrderFields from './OrderFields';
import { loadUser } from './../../../redux/auth/authActions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Order = ({ catalogue, auth }) => {
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);
  let history = useHistory();

  if (auth.user !== null) {
    if (auth.user.status === 0) {
      history.push('/confirm-password');
    }
  }
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
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Order);
