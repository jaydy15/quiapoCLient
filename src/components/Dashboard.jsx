import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from './../redux/auth/authActions';
import Navbar from './layout/Navbar';
import './dashboard.css';
import Sidebar from './layout/Sidebar';
import { useHistory } from 'react-router-dom';
import { loadCatalogue } from './../redux/localCatalog/localCatalogActions';

const Dashboard = ({ loadCatalogue, loadUser, auth, isAuthenticated }) => {
  let history = useHistory();
  if (!isAuthenticated) {
    history.push('/');
  }
  useEffect(() => {
    loadUser();
    loadCatalogue();

    //eslint-disable-next-line
  }, []);
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
          <h1>Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loadUser, loadCatalogue })(Dashboard);
