import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from './../redux/auth/authActions';

const Dashboard = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default connect(null, { loadUser })(Dashboard);
