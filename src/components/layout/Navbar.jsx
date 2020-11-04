import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearList } from '../../redux/cart/cartActions';
import { logout } from './../../redux/auth/authActions';

const Navbar = ({ auth, title, icon, logout, clearList }) => {
  let history = useHistory();
  const onLogout = () => {
    logout();
    clearList();
    history.push('/');
  };

  const { user, isAuthenticated } = auth;
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar bg-primary'>
      <h1>
        <a href='/home'>
          <i className={icon} />
        </a>
        {title}
      </h1>

      <ul>{isAuthenticated ? authLinks : null}</ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: 'WHSE ONLINE ORDERING',
  icon: 'fas fa-box-open',
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, clearList })(Navbar);
