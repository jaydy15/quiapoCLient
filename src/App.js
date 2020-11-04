import React, { useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/Dashboard';
import setAuthToken from './utils/setAuthToken';
import LoginPage from './components/layout/login/LoginPage';
import Order from './components/layout/order/Order';
import Cart from './components/layout/cart/Cart';
import Status from './components/layout/Status/Status';
import { loadUser } from './redux/auth/authActions';
import NewOrder from './components/layout/order/NewOrder';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  return (
    <Router>
      <Route exact path='/' component={LoginPage} />
      <div className=''>
        <Switch>
          <PrivateRoute exact path='/home' component={Dashboard} />
          <PrivateRoute exact path='/order' component={Order} />
          <PrivateRoute exact path='/cart' component={Cart} />
          <PrivateRoute exact path='/status' component={Status} />
          <PrivateRoute exact path='/new-order' component={NewOrder} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
