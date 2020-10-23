import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import LoginForm from './components/LoginForm';
import store from './redux/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/Dashboard';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={LoginForm} />
            <PrivateRoute exact path='/homee' component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
