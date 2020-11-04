import React, { useState } from 'react';
import { connect } from 'react-redux';
import OrderTypes from './orderFields/OrderTypes';
import Sidebar from './../Sidebar';
import Navbar from './../Navbar';
import { newNumber } from './../../../redux/cart/cartActions';

const NewOrder = ({ newNumber }) => {
  const [formData, setFormData] = useState({
    OrderType: '',
    OrderNumber: '',
  });

  const { OrderType, OrderNumber } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    newNumber({
      OrderType,
      OrderNumber,
    });
  };

  return (
    <div>
      <Navbar />
      <div className='dcontainer'>
        <div className='left-side'>
          <Sidebar />
        </div>
        <div className='main-content'>
          <h1>New Order</h1>
          <div className='form-group'>
            <label htmlFor=''>Order Type</label>
            <select
              name='OrderType'
              className='form-control'
              onChange={onChange}>
              <option value=''> Select Order Type</option>
              <option value='Bulk Order'>Bulk Order</option>
              <option value='Non Bulk Order'>Non Bulk Order</option>
            </select>
          </div>

          {OrderType === 'Bulk Order' ? (
            <div className='form-group'>
              <label htmlFor=''>BO NUMBER</label>
              <div className='row'>
                <div className='col-md-4' style={{ paddingRight: 0 }}>
                  <input type='text' className='form-control' />
                </div>
                <div className='col-md-8' style={{ paddingLeft: 0 }}>
                  <input type='text' className='form-control' />
                </div>
              </div>
            </div>
          ) : (
            <div className='form-group'>
              <label htmlFor=''>RX Number</label>
              <input
                type='text'
                className='form-control'
                name='OrderNumber'
                value={OrderNumber}
                onChange={onChange}
              />
            </div>
          )}

          <button className='btn btn-block btn-success' onClick={onSubmit}>
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  catalogue: state.catalogue,
});

export default connect(mapStateToProps, { newNumber })(NewOrder);
