import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = ({ auth }) => {
  const { user } = auth;
  return (
    <div className='left-side'>
      <div className='user-info'>
        {user && (
          <div className='card' style={{ width: '18rem' }}>
            <div className='card-body'>
              <p className='card-text'>User: {user.name}</p>
              <p className='card-text'>Branch: {user.BranchDetail.name}</p>
            </div>
          </div>
        )}
      </div>
      <div className='side-bar'>
        <div className='card' style={{ width: '18rem' }}>
          <div className='card-body'>
            <ul>
              <li>
                <Link to='/new-order'>New Order</Link>
              </li>
              <li>
                <Link to='/order'>Open Catalogue</Link>
              </li>
              <li>
                <Link to='/cart'>Cart</Link>
              </li>
              <li>
                <Link to='/status'>Status</Link>
              </li>
              {user && user.access === '0' && (
                <li>
                  <Link to='/status'>APPROVE OR REJECT</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Sidebar);
