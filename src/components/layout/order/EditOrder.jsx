import React, { useEffect } from 'react';
import Navbar from './../Navbar';

import { loadUser } from './../../../redux/auth/authActions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Menu from '../Menu';
import UpdateFormPage from '../updateForm/UpdateFormPage';

const EditOrder = ({ catalogue, auth }) => {
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
            <h1>Edit Order</h1>
            <UpdateFormPage />
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

export default connect(mapStateToProps, { loadUser })(EditOrder);
