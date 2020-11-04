import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import InputField from './../../reusable/InputField';
import OrderTypes from './orderFields/OrderTypes';
import Brands from './orderFields/Brands';
import ItemCategory from './orderFields/ItemCategory';
import Models from './orderFields/Models';
import OdGrades from './orderFields/OdGrades';
import OsGrades from './orderFields/OsGrades';

const OrderFields = ({ auth }) => {
  const [formData, setFormData] = useState({
    RxNumber: '',
    OrderType: '',
    ItemCategories: '',
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
    PatientsName: '',
  });

  const {
    RxNumber,
    OrderType,
    ItemCategories,
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
    PatientsName,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <div className='row'>
        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor=''>Selected Active Transaction Number</label>
            <select>
              <option>1111</option>
            </select>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor=''>Branch</label>
            <input
              type='text'
              className='form-control'
              disabled
              placeholder={auth.user && auth.user.BranchDetail.name}
            />
          </div>
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
        <div className='col-md-4'>
          <ItemCategory
            onChange={onChange}
            value={ItemCategories}
            OrderType={OrderType}
          />
        </div>
        <div className='col-md-4'>
          <Brands onChange={onChange} value={Brand} />
        </div>
        <div className='col-md-4'>
          <Models onChange={onChange} value={Model} />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          {/* COLOR */}
          <Models onChange={onChange} value={Model} />
        </div>
        <div className='col-md-4'>
          {/* SIZE */}
          <Brands onChange={onChange} value={Brand} />
        </div>
        {ItemCategories !== 'LENS' && ItemCategories !== 'CONTACT LENS' ? (
          <div className='col-md-4'>
            <InputField
              type='text'
              placeholder='Non Lens Qty'
              name='nonLensQty'
              value={NonLensQty}
              onChange={onChange}
              label='Non Lens Qty'
            />
          </div>
        ) : null}
      </div>
      {ItemCategories === 'LENS' || ItemCategories === 'CONTACT LENS' ? (
        <Fragment>
          <div className='row'>
            <div className='col-md-12'>
              <OdGrades />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <OsGrades onChange={onChange} />
            </div>
          </div>
        </Fragment>
      ) : null}
      {OrderType !== 'BULK ORDER' ? (
        <div className='row'>
          <div className='col-md-6'>
            <InputField
              type='text'
              placeholder="Patient's Name"
              name='PatientsName'
              value={PatientsName}
              onChange={onChange}
              label="Patient's Name"
            />
          </div>
        </div>
      ) : null}
      <button type='submit' className='btn btn-block btn-success'>
        Add To Cart
      </button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order,
});

export default connect(mapStateToProps)(OrderFields);
