import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from './../../redux/auth/authActions';

const Navbar = ({ auth, title, icon, logout }) => {
  const onLogout = () => {
    logout();
  };

  const { user, isAuthenticated } = auth;
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='/'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar bg-primary container-fluid'>
      <h1>
        <i className={icon} />
        {title}
      </h1>

      <ul>{isAuthenticated ? authLinks : null}</ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: 'WHSE ONLINE ORDERING',
  icon: 'fas fa-id-card-alt',
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
