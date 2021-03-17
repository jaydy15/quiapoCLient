import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Sidebar from './../Sidebar';
import Navbar from './../Navbar';
import { newNumber } from './../../../redux/cart/cartActions';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import { getTransactions } from '../../../redux/order/orderActions';
import Select from 'react-select';
import { setAlert } from '../../../redux/alert/alertActions';
import Alerts from '../../Alerts';
import { set } from 'lodash';

const NewOrder = ({
  newNumber,
  transactions,
  branch,
  getTransactions,
  setAlert,
  localRx
}) => {
  useEffect(() => {
    getTransactions(branch);
    //eslint-disable-next-line
  }, []);
  let history = useHistory();
  const alert = useAlert();

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const [formData, setFormData] = useState({
    OrderTypes: '',
    prefix: '',
    number: '',
  });
  const { OrderTypes, prefix, number } = formData;

  const optPrefix = [
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'F', value: 'F' },
  ];

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (prefix.value === '' || prefix.value === 'undefine') {
    setFormData({ ...formData, prefix: '' });
  }
  let OrderNumber;
  if (OrderTypes === 'Bulk Order') {
    OrderNumber = prefix.value + number;
  } else {
    OrderNumber = number;
  }
  let isDuplicate;
  if (transactions !== '') {
    const listRx = transactions.map((trans) => trans.rxNumber);
    const rx = listRx.filter(unique);
    isDuplicate = rx.filter((rx) => rx === OrderNumber);
    console.log(isDuplicate);
  }
  let localDuplicate;
  const lrx = localRx.map(number => number.OrderNumber)
  console.log(lrx)
  localDuplicate = lrx.filter(number=> number === OrderNumber)
  console.log(localDuplicate)

  const numberfunction = () => {
    if (isDuplicate.length === 1 || localDuplicate.length === 1) {
      // alert.show('Order Number is Duplicated, Please Enter Another Rx Number');
      setAlert(
        'RX Number is Duplicated, Please Enter Another Rx Number',
        'danger'
      );
    } else {
      newNumber({
        OrderTypes,
        OrderNumber,
      });
      console.log(OrderNumber);
      // alert.show('Order Number Successfully Created');
      setAlert('Order Number Successfully Created', 'success');
      setTimeout(() => {
        history.push('/order');
      }, 1000);
    }
  };

  const onSubmit = (e) => {
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
          <Alerts />
          {OrderTypes !== null && (
            <div className='form-group'>
              <label htmlFor=''>
                Order Type<span style={{ color: 'red' }}>*</span>
              </label>
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
          )}

          {OrderTypes === 'Bulk Order' ? (
            <div className='form-group'>
              <label htmlFor=''>
                BO NUMBER<span style={{ color: 'red' }}>*</span>
              </label>
              <div className='row'>
                <div className='col-md-4' style={{ paddingRight: 0 }}>
                  <Select
                    options={optPrefix}
                    onChange={(selectedOption) => {
                      setFormData({ ...formData, prefix: selectedOption });
                    }}
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
              <label htmlFor=''>
                RX Number<span style={{ color: 'red' }}>*</span>
              </label>
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
  transactions: state.orders.transactions,
  branch: state.auth.user.branchKey,
  localRx : state.cart.lists
});

export default connect(mapStateToProps, {
  newNumber,
  getTransactions,
  setAlert,
})(NewOrder);
