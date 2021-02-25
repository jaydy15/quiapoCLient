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
import Select from 'react-select';

const OrderFields = ({ auth, lists, addToCart }) => {
  const alert = useAlert();
  const [formData, setFormData] = useState({
    RxNumber: {},
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
    OdSph.value +
    '|' +
    OdCyl.value +
    '|' +
    OdAxis.value +
    '|' +
    OdAdd.value +
    '|' +
    OdPd +
    '|' +
    OdQty;
  const OsDetails =
    OsSph.value +
    '|' +
    OsCyl.value +
    '|' +
    OsAxis.value +
    '|' +
    OsAdd.value +
    '|' +
    OsPd +
    '|' +
    OsQty;
  const SoDetails =
    Horizontal + '|' + Vertical + '|' + Bridge + '|' + FrameType;

  const onSubmit = (e) => {
    const tempID = uuidv4();
    console.log(tempID);
    e.preventDefault();
    addToCart({
      tempID,
      rxNumber: RxNumber.value,
      orderType: OrderType.value,
      itemCategories: ItemCategories.value,
      brand: Brand.value,
      model: Model.value,
      color: Color.value,
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

  const listRxNumber = lists.map((item) => item.OrderNumber);

  const optRxNumber = [];

  for (let i = 0; i < listRxNumber.length; i++) {
    let formattObj = {
      label: listRxNumber[i],
      value: listRxNumber[i],
    };
    optRxNumber.push(formattObj);
  }

  const handleChange = (selectedOption) => {
    setFormData({ ...formData, RxNumber: selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  // GRADES RELATED
  const gradify = (item) => {
    let number = item.toFixed(2);
    if (item > 0) {
      return '+' + number;
    } else {
      if (item < 0) {
        return number;
      } else {
        return 'PLANO';
      }
    }
  };
  const sphLoad = () => {
    let grades = [];
    for (let i = -25.0; i <= 25.0; i = i + 0.25) {
      grades.push(gradify(i));
    }
    return grades;
  };

  const cylLoad = () => {
    let grades = [];
    for (let i = -8.0; i <= -0.25; i = i + 0.25) {
      grades.push(gradify(i));
    }
    return grades;
  };

  const axisLoad = () => {
    let grades = [];
    for (let i = 0; i <= 180; i++) {
      grades.push(i);
    }
    return grades;
  };

  const addLoad = () => {
    let grades = [];
    for (let i = 0.25; i <= 4.0; i = i + 0.25) {
      grades.push(gradify(i));
    }
    return grades;
  };

  const sphGrades = sphLoad();
  const cylGrades = cylLoad();
  const axisGrades = axisLoad();
  const addGrades = addLoad();

  const utils = (arrayMap) => {
    let optGrades = [];
    let listGrades = arrayMap.map((item) => item);
    for (let i = 0; i < listGrades.length; i++) {
      let formattObj = {
        value: listGrades[i],
        label: listGrades[i],
      };
      optGrades.push(formattObj);
    }

    return optGrades;
  };

  const optSph = utils(sphGrades);
  const optCyl = utils(cylGrades);
  const optAxis = utils(axisGrades);
  const optAdd = utils(addGrades);

  return (
    <form>
      <div className='row'>
        <div className='col-md-4'>
          <div className='form-group'>
            <label htmlFor=''>
              Selected Active Transaction Number{' '}
              <span style={{ color: 'red' }}>*</span>
            </label>
            <Select options={optRxNumber} onChange={handleChange} />
          </div>
        </div>
        <div className='col-md-4'>
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
        <div className='col-md-4'>
          <InputField
            type='text'
            placeholder='RX Number'
            name='RxNumber'
            value={RxNumber.value}
            onChange={onChange}
            label='RX Number'
            bol='true'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <OrderTypes
            onChange={(selectedOption) => {
              setFormData({ ...formData, OrderType: selectedOption });
            }}
            value={OrderType.value}
            RxNumber={RxNumber.value}
            required
          />
        </div>

        <div className='col-md-4'>
          <ItemCategory
            onChange={(selectedOption) => {
              setFormData({ ...formData, ItemCategories: selectedOption });
            }}
            value={ItemCategories}
            OrderType={OrderType.value}
          />
        </div>
        <div className='col-md-4'>
          <Brands
            onChange={(selectedOption) => {
              setFormData({ ...formData, Brand: selectedOption });
            }}
            value={Brand}
            ItemCategories={ItemCategories.value}
            OrderType={OrderType.value}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <Models
            onChange={(selectedOption) => {
              setFormData({ ...formData, Model: selectedOption });
            }}
            value={Model}
            Brand={Brand.value}
            ItemCategories={ItemCategories.value}
            OrderType={OrderType.value}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <Colors
            onChange={(selectedOption) => {
              setFormData({ ...formData, Color: selectedOption });
            }}
            value={Color}
          />
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
        {ItemCategories.value !== 1 && ItemCategories.value !== 2 ? (
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
          {ItemCategories.value === 1 || ItemCategories.value === 2 ? (
            <Fragment>
              <h3>Grade Info</h3>
              <hr />
              <div className='row'>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-md-2'>
                      <label htmlFor=''>OD SPH</label>
                      <Select
                        options={optSph}
                        onChange={(selectedOption) => {
                          setFormData({ ...formData, OdSph: selectedOption });
                        }}
                      />
                    </div>
                    <div className='col-md-2'>
                      <label htmlFor=''>OD CYL</label>
                      <Select
                        options={optCyl}
                        onChange={(selectedOption) => {
                          setFormData({ ...formData, OdCyl: selectedOption });
                        }}
                      />
                    </div>
                    <div className='col-md-2'>
                      <label htmlFor=''>OD AXIS</label>
                      <Select
                        options={optAxis}
                        onChange={(selectedOption) => {
                          setFormData({ ...formData, OdAxis: selectedOption });
                        }}
                      />
                    </div>
                    <div className='col-md-2'>
                      <label htmlFor=''>OD ADD</label>
                      <Select
                        options={optAdd}
                        onChange={(selectedOption) => {
                          setFormData({ ...formData, OdAdd: selectedOption });
                        }}
                      />
                    </div>
                    <div className='col-md-2'>
                      <label htmlFor=''>OD PD</label>
                      <input
                        type='number'
                        className='form-control'
                        onChange={onChange}
                        style={{ margin: '0' }}
                        name='OdPd'
                      />
                    </div>
                    <div className='col-md-2'>
                      <label htmlFor=''>OD QTY</label>
                      <input
                        type='number'
                        className='form-control'
                        onChange={onChange}
                        style={{ margin: '0' }}
                        name='OdQty'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-md-2'>
                      <label htmlFor=''>OS SPH</label>
                      <Select
                        options={optSph}
                        onChange={(selectedOption) => {
                          setFormData({ ...formData, OsSph: selectedOption });
                        }}
                      />
                    </div>
                    <div className='col-md-2'>
                      <label htmlFor=''>OS CYL</label>
                      <Select
                        options={optCyl}
                        onChange={(selectedOption) => {
                          setFormData({ ...formData, OsCyl: selectedOption });
                        }}
                      />
                    </div>
                    <div className='col-md-2'>
                      <label htmlFor=''>OS AXIS</label>
                      <Select
                        options={optAxis}
                        onChange={(selectedOption) => {
                          setFormData({ ...formData, OsAxis: selectedOption });
                        }}
                      />
                    </div>
                    <div className='col-md-2'>
                      <label htmlFor=''>OS ADD</label>
                      <Select
                        options={optAdd}
                        onChange={(selectedOption) => {
                          setFormData({ ...formData, OsAdd: selectedOption });
                        }}
                      />
                    </div>
                    <div className='col-md-2'>
                      <label htmlFor=''>OS PD</label>
                      <input
                        type='number'
                        className='form-control'
                        onChange={onChange}
                        style={{ margin: '0' }}
                        name='OsPd'
                      />
                    </div>
                    <div className='col-md-2'>
                      <label htmlFor=''>OS QTY</label>
                      <input
                        type='number'
                        className='form-control'
                        onChange={onChange}
                        style={{ margin: '0' }}
                        name='OsQty'
                      />
                    </div>
                  </div>
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
