import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from './../redux/auth/authActions';
import Navbar from './layout/Navbar';
import './dashboard.css';
import Sidebar from './layout/Sidebar';

const Dashboard = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
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
          <h1>Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { loadUser })(Dashboard);
