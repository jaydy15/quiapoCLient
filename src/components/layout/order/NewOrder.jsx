import React, { useState } from 'react';
import { connect } from 'react-redux';
import Sidebar from './../Sidebar';
import Navbar from './../Navbar';
import { newNumber } from './../../../redux/cart/cartActions';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import Joi, { schema } from 'joi-browser';

const NewOrder = ({ newNumber }) => {
  let history = useHistory();
  const alert = useAlert();

  const [errors, setError] = useState({});

  const [formData, setFormData] = useState({
    OrderTypes: '',
    prefix: '',
    number: '',
  });

  const { OrderTypes, prefix, number } = formData;

  const schema = {
    OrderTypes: Joi.string().required(),
    prefix: Joi.string().required(),
    number: Joi.number().required(),
  };

  const validate = () => {
    const result = Joi.validate(formData, schema, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const OrderNumber = prefix + number;

  const onSubmit = (e) => {
    const error = validate();
    setError(error);
    console.log(error);
    // newNumber({
    //   OrderTypes,
    //   OrderNumber,
    // });
    // setFormData({
    //   OrderType: '',
    //   prefix: '',
    //   number: '',
    // });
    // alert.show('Order Number Successfully Created');
    // setTimeout(() => {
    //   history.push('/order');
    // }, 1000);
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
              name='OrderTypes'
              className='form-control'
              onChange={onChange}
              required>
              <option value=''> Select Order Type</option>
              <option value='Bulk Order'>Bulk Order</option>
              <option value='Non Bulk Order'>Non Bulk Order</option>
            </select>
          </div>

          {OrderTypes === 'Bulk Order' ? (
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
