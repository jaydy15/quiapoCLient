import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Menu = ({ auth }) => {
  const { user } = auth;
  return (
    <ul class='nav justify-content-end'>
      <li class='nav-item'>
        <Link className='nav-link' to='/new-order'>
          New Order
        </Link>
      </li>
      <li class='nav-item'>
        <Link className='nav-link' to='/order'>
          Open Catalogue
        </Link>
      </li>
      <li class='nav-item'>
        <Link className='nav-link' to='/cart'>
          Cart
        </Link>
      </li>
      <li class='nav-item'>
        <Link className='nav-link' to='/status'>
          Status
        </Link>
      </li>
      {user && auth.user.access == 0 && (
        <li className='nav-link'>
          <Link to='/admin'>Admin Page</Link>
        </li>
      )}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Menu);
