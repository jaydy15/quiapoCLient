import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import InputField from './../../reusable/InputField';
import OrderTypes from './orderFields/OrderTypes';
import Brands from './orderFields/Brands';
import ItemCategory from './orderFields/ItemCategory';
import Models from './orderFields/Models';
import OdGrades from './orderFields/OdGrades';
import OsGrades from './orderFields/OsGrades';
import Colors from './orderFields/Colors';
import { addToCart } from './../../../redux/cart/cartActions';
import { useAlert } from 'react-alert';
import { v4 as uuidv4 } from 'uuid';

const OrderFields = ({ auth, lists, addToCart }) => {
  const alert = useAlert();
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
    Horizontal: '',
    Vertical: '',
    Bridge: '',
    FrameType: '',
    AdditionalInstructions: '',
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
    Horizontal,
    Vertical,
    Bridge,
    FrameType,
    AdditionalInstructions,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearform = () => {
    setFormData({
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
      Horizontal: '',
      Vertical: '',
      Bridge: '',
      FrameType: '',
      AdditionalInstructions: '',
    });
  };

  const OdDetails =
    OdSph + '|' + OdCyl + '|' + OdAxis + '|' + OdAdd + '|' + OdPd + '|' + OdQty;
  const OsDetails =
    OsSph + '|' + OsCyl + '|' + OsAxis + '|' + OsAdd + '|' + OsPd + '|' + OsQty;
  const SoDetails =
    Horizontal + '|' + Vertical + '|' + Bridge + '|' + FrameType;

  const onSubmit = (e) => {
    const tempID = uuidv4();
    console.log(tempID);
    e.preventDefault();
    addToCart({
      tempID,
      rxNumber: RxNumber,
      orderType: OrderType,
      itemCategories: ItemCategories,
      brand: Brand,
      model: Model,
      color: Color,
      size: Size,
      nonLensQty: NonLensQty,
      pxName: PatientsName,
      horizontal: Horizontal,
      vertical: Vertical,
      bridge: Bridge,
      frameType: FrameType,
      additionalInstructions: AdditionalInstructions,
      odDetails: OdDetails,
      osDetails: OsDetails,
      soDetails: SoDetails,
      odSph: OdSph,
      odCyl: OdCyl,
      odAxis: OdAxis,
      odAdd: OdAdd,
      odPd: OdPd,
      odQty: OdQty,
      osSph: OsSph,
      osCyl: OsCyl,
      osAxis: OsAxis,
      osAdd: OsAdd,
      osPd: OsPd,
      osQty: OsQty,
    });
    alert.show('Order have been added to the cart successfully');
    setTimeout(() => {
      clearform();
    }, 1000);
  };

  return (
    <form>
      <div className='row'>
        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor=''>Selected Active Transaction Number</label>
            <select name='RxNumber' value={RxNumber} onChange={onChange}>
              <option>Select Transaction Number</option>
              {lists.map((item) => (
                <option key={item.OrderNumber}>{item.OrderNumber}</option>
              ))}
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
            bol='true'
          />
        </div>
        <div className='col-md-6'>
          <OrderTypes
            onChange={onChange}
            value={OrderType}
            RxNumber={RxNumber}
          />
          {/* <div className='form-group'>
            <label htmlFor=''>Order Type</label>
            <select
              onChange={onChange}
              className='form-control'
              name='OrderType'>
              {lists
                .filter((ot) => {
                  return ot.OrderNumber === RxNumber;
                })
                .map((flot) => (
                  <option key={flot.OrderType}>{flot.OrderType}</option>
                ))}
            </select>
          </div> */}
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
          <Brands
            onChange={onChange}
            value={Brand}
            ItemCategories={ItemCategories}
            OrderType={OrderType}
          />
        </div>
        <div className='col-md-4'>
          <Models
            onChange={onChange}
            value={Model}
            Brand={Brand}
            ItemCategories={ItemCategories}
            OrderType={OrderType}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <Colors onChange={onChange} value={Color} />
          <p>color</p>
        </div>
        <div className='col-md-4'>
          <InputField
            type='number'
            name='Size'
            value={Size}
            onChange={onChange}
            label='Size'
          />
        </div>
        {ItemCategories !== '1' && ItemCategories !== '2' ? (
          <div className='col-md-4'>
            <InputField
              type='number'
              placeholder='Non Lens Qty'
              name='NonLensQty'
              value={NonLensQty}
              onChange={onChange}
              label='Non Lens Qty'
              bol='false'
            />
          </div>
        ) : null}
      </div>
      <div className='row'>
        <div className='col-md-12'>
          {ItemCategories === '1' || ItemCategories === '2' ? (
            <Fragment>
              <h3>Grade Info</h3>
              <hr />
              <div className='row'>
                <div className='col-md-12'>
                  <OdGrades
                    OdSph={OdSph}
                    OdCyl={OdCyl}
                    OdAxis={OdAxis}
                    OdAdd={OdAdd}
                    OdPd={OdPd}
                    OdQty={OdQty}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <OsGrades
                    OsSph={OsSph}
                    OsCyl={OsCyl}
                    OsAxis={OsAxis}
                    OsAdd={OsAdd}
                    OsPd={OsPd}
                    OsQty={OsQty}
                    onChange={onChange}
                  />
                </div>
              </div>
            </Fragment>
          ) : null}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          {OrderType === '3' && ItemCategories === '2' && (
            <Fragment>
              <h3 style={{ paddingTop: '20px' }}>Frame Info</h3>
              <hr />
              <div className='row'>
                <div className='col-md-3'>
                  <InputField
                    type='text'
                    placeholder='Non Lens Qty'
                    name='Horizontal'
                    value={Horizontal}
                    onChange={onChange}
                    label='Horizontal'
                    bol='false'
                  />
                </div>
                <div className='col-md-3'>
                  <InputField
                    type='text'
                    placeholder='Non Lens Qty'
                    name='Vertical'
                    value={Vertical}
                    onChange={onChange}
                    label='Vertical'
                    bol='false'
                  />
                </div>
                <div className='col-md-3'>
                  <InputField
                    type='text'
                    placeholder='Non Lens Qty'
                    name='Bridge'
                    value={Bridge}
                    onChange={onChange}
                    label='Bridge'
                    bol='false'
                  />
                </div>
                <div className='col-md-3'>
                  <InputField
                    type='text'
                    placeholder='Non Lens Qty'
                    name='FrameType'
                    value={FrameType}
                    onChange={onChange}
                    label='Frame Type'
                    bol='false'
                  />
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <InputField
            type='text'
            placeholder="Patient's Name"
            name='AdditionalInstructions'
            value={AdditionalInstructions}
            onChange={onChange}
            label='Additional Instructions'
            bol='false'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          {OrderType !== '2' ? (
            <div className='row'>
              <div className='col-md-6'>
                <InputField
                  type='text'
                  placeholder="Patient's Name"
                  name='PatientsName'
                  value={PatientsName}
                  onChange={onChange}
                  label="Patient's Name"
                  bol='false'
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <button
        onClick={onSubmit}
        type='submit'
        className='btn btn-block btn-success'>
        Add To Cart
      </button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  lists: state.cart.lists,
});

export default connect(mapStateToProps, { addToCart })(OrderFields);
