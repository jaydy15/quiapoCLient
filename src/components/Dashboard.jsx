import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadUser } from './../redux/auth/authActions';
import Navbar from './layout/Navbar';
import './dashboard.css';
import Sidebar from './layout/Sidebar';
import { useHistory } from 'react-router-dom';
import { loadCatalogue } from './../redux/localCatalog/localCatalogActions';

const Dashboard = ({ loadCatalogue, loadUser, auth, isAuthenticated }) => {
  let history = useHistory();
  if (!isAuthenticated) {
    history.push('/');
  }
  useEffect(() => {
    loadUser();
    loadCatalogue();

    //eslint-disable-next-line
  }, []);
  if (auth.user !== null) {
    if (auth.user.status === 0) {
      history.push('/confirm-password');
    }
  }

  const [holder, setHolder] = useState('TEXT');

  return (
    <div>
      <Navbar />
      <div className='dcontainer'>
        <div className='left-side'>
          <Sidebar />
        </div>
        <div className='main-content'>
          <h1>Dashboard</h1>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor=''>PlaceHolder</label>
                  <input type='text' disabled value={holder} />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-3'>
                <button onClick={() => setHolder('LENS SHAPE 1')}>
                  <img
                    src='https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    alt='Snow'
                    style={{ width: '150px' }}></img>
                </button>
              </div>
              <div className='col-md-3'>
                <button onClick={() => setHolder('LENS SHAPE 2')}>
                  <img
                    src='https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    alt='Snow'
                    style={{ width: '150px' }}></img>
                </button>
              </div>
              <div className='col-md-3'>
                <button onClick={() => setHolder('LENS SHAPE 3')}>
                  <img
                    src='https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    alt='Snow'
                    style={{ width: '150px' }}></img>
                </button>
              </div>
              <div className='col-md-3'>
                <button onClick={() => setHolder('LENS SHAPE 4')}>
                  <img
                    src='https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    alt='Snow'
                    style={{ width: '150px' }}></img>
                </button>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-3'>
                <button onClick={() => setHolder('LENS SHAPE 5')}>
                  <img
                    src='https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    alt='Snow'
                    style={{ width: '150px' }}></img>
                </button>
              </div>
              <div className='col-md-3'>
                <button onClick={() => setHolder('LENS SHAPE 6')}>
                  <img
                    src='https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    alt='Snow'
                    style={{ width: '150px' }}></img>
                </button>
              </div>
              <div className='col-md-3'>
                <button onClick={() => setHolder('LENS SHAPE 7')}>
                  <img
                    src='https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    alt='Snow'
                    style={{ width: '150px' }}></img>
                </button>
              </div>
              <div className='col-md-3'>
                <button onClick={() => setHolder('LENS SHAPE 8')}>
                  <img
                    src='https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    alt='Snow'
                    style={{ width: '150px' }}></img>
                </button>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-3'>
                <button onClick={() => setHolder('LENS SHAPE 9')}>
                  <img
                    src='https://images.pexels.com/photos/39716/pexels-photo-39716.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    alt='Snow'
                    style={{ width: '150px' }}></img>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loadUser, loadCatalogue })(Dashboard);
