import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/Dashboard';
import setAuthToken from './utils/setAuthToken';
import LoginPage from './components/layout/login/LoginPage';
import Order from './components/layout/order/Order';
import Cart from './components/layout/cart/Cart';
import Status from './components/layout/Status/Status';
import NewOrder from './components/layout/order/NewOrder';
import ConfirmPassword from './components/layout/user/ConfirmPassword';
import { loadUser } from './redux/auth/authActions';
import searchItem from './components/layout/backend/SearchItem';
import OrderFieldsV2Bulk from './components/layout/orderFieldsV2/OrderFieldsV2Bulk';
import UpdateForm from './components/layout/updateForm/UpdateForm';
import UpdateFormPage from './components/layout/updateForm/UpdateFormPage';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      <Route exact path='/' component={LoginPage} />
      <div className=''>
        <Switch>
          <PrivateRoute exact path='/home' component={Dashboard} />
          <PrivateRoute exact path='/order' component={Order} />
          <PrivateRoute exact path='/cart' component={Cart} />
          <PrivateRoute path='/status' component={Status} />
          <PrivateRoute exact path='/new-order' component={NewOrder} />
          <PrivateRoute
            exact
            path='/test-order'
            component={OrderFieldsV2Bulk}
          />
          <PrivateRoute exact path='/edit-order' component={UpdateFormPage} />
          <PrivateRoute exact path='/admin' component={searchItem} />
          <PrivateRoute
            exact
            path='/confirm-password'
            component={ConfirmPassword}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
