import React, { useEffect } from 'react';
import Navbar from './../Navbar';
import { loadUser } from './../../../redux/auth/authActions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OrderFieldsV2 from '../orderFieldsV2/OrderFieldsV2';
import Menu from '../Menu';

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
      <Menu />
      {catalogue !== null ? (
        <div className='dcontainer'>
          <div className='main-content'>
            <h1>Catalogue</h1>
            <OrderFieldsV2 />
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
