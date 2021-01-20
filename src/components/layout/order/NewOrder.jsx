import React, { useState } from 'react';
import { connect } from 'react-redux';
import Sidebar from './../Sidebar';
import Navbar from './../Navbar';
import { newNumber } from './../../../redux/cart/cartActions';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import Joi from 'joi-browser';

const NewOrder = ({ newNumber }) => {
  let history = useHistory();
  const alert = useAlert();

  const [formData, setFormData] = useState({
    orderTypes: '',
    prefix: '',
    number: '',
  });
  const { orderTypes, prefix, number } = formData;

  const [error, setError] = useState({});

  const schema = {
    orderTypes: Joi.string().required(),
    number: Joi.number().required(),
  };

  if (orderTypes === 'Bulk Order') {
    schema.prefix = Joi.string().required();
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const OrderNumber = prefix + number;

  const validate = () => {
    const result = Joi.validate(formData, schema, { abortEarly: false });
    if (!result.error) return null;

    for (let item of result.error.details) error[item.path[0]] = item.message;
    return error;
  };

  const numberfunction = () => {
    newNumber({
      orderTypes,
      OrderNumber,
    });
    console.log(OrderNumber);
    alert.show('Order Number Successfully Created');
    setTimeout(() => {
      history.push('/order');
    }, 1000);
  };

  const onSubmit = (e) => {
    setError(validate());
    numberfunction();
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
          {orderTypes !== null && (
            <div className='form-group'>
              <label htmlFor=''>Order Type</label>
              <select
                name='orderTypes'
                className='form-control'
                onChange={onChange}
                required>
                <option value=''> Select Order Type</option>
                <option value='Bulk Order'>Bulk Order</option>
                <option value='Non Bulk Order'>Non Bulk Order</option>
              </select>
              {error.OrderTypes && (
                <div className='alert alert-danger'>{error.OrderTypes}</div>
              )}
            </div>
          )}

          {orderTypes === 'Bulk Order' ? (
            <div className='form-group'>
              <label htmlFor=''>BO NUMBER</label>
              <div className='row'>
                <div className='col-md-4' style={{ paddingRight: 0 }}>
                  <input
                    type='text'
                    className='form-control'
                    value={prefix}
                    name='prefix'
                    onChange={onChange}
                    required
                  />
                </div>
                <div className='col-md-8' style={{ paddingLeft: 0 }}>
                  <input
                    type='text'
                    className='form-control'
                    value={number}
                    name='number'
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              {error.prefix && (
                <div className='alert alert-danger'>{error.prefix}</div>
              )}{' '}
              {error.number && (
                <div className='alert alert-danger'>{error.number}</div>
              )}
            </div>
          ) : (
            <div className='form-group'>
              <label htmlFor=''>RX Number</label>
              <input
                type='text'
                className='form-control'
                name='number'
                value={number}
                onChange={onChange}
                required
              />
              {error.number && (
                <div className='alert alert-danger'>{error.number}</div>
              )}
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
