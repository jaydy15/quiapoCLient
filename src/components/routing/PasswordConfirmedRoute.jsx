import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PasswordConfirmedRoute =
  () =>
  ({ component: Component, auth, status, ...props }) => {
    const { isAuthenticated, loading } = auth;

    return (
      <Route
        {...props}
        render={(props) =>
          isAuthenticated && auth.user !== null && auth.user.status === 0 ? (
            <Redirect to='/confirm-password' />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  };

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PasswordConfirmedRoute);
