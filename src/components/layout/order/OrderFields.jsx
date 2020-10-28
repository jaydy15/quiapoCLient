import React, { useState } from 'react';
import { connect } from 'react-redux';
import InputField from './../../reusable/InputField';
import OrderTypes from './orderFields/OrderTypes';
import Brands from './orderFields/Brands';

const OrderFields = ({ auth }) => {
  const [formData, setFormData] = useState({
    RxNumber: '',
    OrderType: '',
    ItemCategory: '',
    Brand: '',
    Model: '',
    Color: '',
    Size: '',
    NonLensQty: '',
    OdSph: '',
    OdCyl: '',
    OdAxis: '',
    OdAdd: '',
    OdPd: '',
    OdQty: '',
    OsSph: '',
    OsCyl: '',
    OsAxis: '',
    OsAdd: '',
    OsPd: '',
    OsQty: '',
  });

  const {
    RxNumber,
    OrderType,
    ItemCategory,
    Brand,
    Model,
    Color,
    Size,
    NonLensQty,
    OdSph,
    OdCyl,
    OdAxis,
    OdAdd,
    OdPd,
    OdQty,
    OsSph,
    OsCyl,
    OsAxis,
    OsAdd,
    OsPd,
    OsQty,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <div className='row'>
        <div className='col-md-6'>Transaction Number :</div>
        <div className='col-md-6'>
          Branch: {auth.user && auth.user.BranchDetail.name}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <InputField
            type='text'
            placeholder='RX Number'
            name='RxNumber'
            value={RxNumber}
            onChange={onChange}
            label='RX Number'
          />
        </div>
        <div className='col-md-6'>
          <OrderTypes onChange={onChange} value={OrderType} />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>Item Category</div>
        <div className='col-md-4'>
          <Brands onChange={onChange} value={Brand} />
        </div>
        <div className='col-md-4'>Model</div>
      </div>
      <div className='row'>
        <div className='col-md-4'>Color</div>
        <div className='col-md-4'></div>
        <div className='col-md-4'></div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order,
});

export default connect(mapStateToProps)(OrderFields);
