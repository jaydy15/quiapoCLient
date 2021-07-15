import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import InputField from './../../reusable/InputField';
import OrderTypes from './orderFields/OrderTypes';
import Brands from './orderFields/Brands';
import ItemCategory from './orderFields/ItemCategory';
import Models from './orderFields/Models';
import Colors from './orderFields/Colors';
import Units from './orderFields/Units';
import { addToCart } from './../../../redux/cart/cartActions';
import { useAlert } from 'react-alert';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import { useForm } from 'react-hook-form';

const OrderFields = ({ auth, lists, addToCart, lensParam, generalEnums }) => {
  const alert = useAlert();
  let history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
  const [formData, setFormData] = useState({
    RxNumber: {},
    OrderType: '',
    ItemCategories: '',
    Brand: '',
    Model: '',
    Color: '',
    Size: '0',
    NonLensQty: '',
    OdSph: '0',
    OdCyl: '0',
    OdAxis: '0',
    OdAdd: '0',
    OdPd: '0',
    OdQty: '0',
    OsSph: '0',
    OsCyl: '0',
    OsAxis: '0',
    OsAdd: '0',
    OsPd: '0',
    OsQty: '0',
    PatientsName: '',
    Horizontal: '',
    Vertical: '',
    Bridge: '',
    FrameType: '',
    AdditionalInstructions: '',
    LensParamId: '',
    nonLensUnitName: '',
    fitting: '',
  });
  const [frameShape, setHolder] = useState('SELECT LENS SHAPE');
  const [frameShapeId, setFrameShapeId] = useState('');

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
    LensParamId,
    nonLensUnitName,
    fitting,
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
  let maxSph, minSph, maxCyl, minCyl, maxAdd, minAdd;
  let paramId;
  let counter;
  const optFitting = [];
  if (ItemCategories.value === 2) {
    const arrayLensParam = lensParam.filter(
      (item) => item.lensItemKey === Model.value
    );
    counter = arrayLensParam.length;
    for (let i = 0; i < arrayLensParam.length; i++) {
      let formattObj = {
        label: arrayLensParam[i].fitting,
        value: arrayLensParam[i].fitting,
      };
      optFitting.push(formattObj);
    }
    if (arrayLensParam.length === 1) {
      console.log(arrayLensParam);
      paramId = arrayLensParam[0].id;
      maxSph = parseFloat(arrayLensParam[0].maxSph);
      minSph = parseFloat(arrayLensParam[0].minSph);
      maxCyl = parseFloat(arrayLensParam[0].maxCyl);
      minCyl = parseFloat(arrayLensParam[0].minCyl);
      maxAdd = parseFloat(arrayLensParam[0].maxAdd);
      minAdd = parseFloat(arrayLensParam[0].minAdd);
    } else if (arrayLensParam.length > 1) {
      const arrayLensFitting = lensParam.filter(
        (item) => item.lensItemKey === Model.value && item.fitting === fitting
      );
      if (arrayLensFitting.length > 0) {
        paramId = arrayLensFitting[0].id;
        maxSph = parseFloat(arrayLensFitting[0].maxSph);
        minSph = parseFloat(arrayLensFitting[0].minSph);
        maxCyl = parseFloat(arrayLensFitting[0].maxCyl);
        minCyl = parseFloat(arrayLensFitting[0].minCyl);
        maxAdd = parseFloat(arrayLensFitting[0].maxAdd);
        minAdd = parseFloat(arrayLensFitting[0].minAdd);
      }
    }
  } else {
    maxSph = 25;
    minSph = -25;
    maxCyl = -0.25;
    minCyl = -8;
    maxAdd = 4;
    minAdd = 0.25;
    paramId = '';
  }

  const SoDetails =
    Horizontal +
    '|' +
    Vertical +
    '|' +
    Bridge +
    '|' +
    FrameType +
    '|' +
    frameShapeId;

  const onSubmit = (e) => {
    const tempID = uuidv4();
    console.log(tempID);
    console.log('lensparamid', paramId);
    // e.preventDefault();
    if (Size === ' ' || Size === undefined) {
      setFormData({ ...formData, Size: 0.0 });
    }

    let varNonLenUnit;
    if (nonLensUnitName.value === ' ' || nonLensUnitName.value === undefined) {
      varNonLenUnit = '';
      setFormData({ ...formData, nonLensUnitName: varNonLenUnit });
    } else {
      varNonLenUnit = nonLensUnitName.value;
    }
    let OdDetails;
    let OsDetails;
    if (ItemCategories.value === 1 || ItemCategories.value === 2) {
      OdDetails =
        OdSph +
        '|' +
        OdCyl +
        '|' +
        OdAxis +
        '|' +
        OdAdd +
        '|' +
        OdPd +
        '|' +
        OdQty;
      OsDetails =
        OsSph +
        '|' +
        OsCyl +
        '|' +
        OsAxis +
        '|' +
        OsAdd +
        '|' +
        OsPd +
        '|' +
        OsQty;
    } else {
      OdDetails = '0|0|0|0|0|0';
      OsDetails = '0|0|0|0|0|0';
    }
    setFormData({ ...formData, LensParamId: paramId });
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
      lensParamKey: paramId,
      nonLensUnitName: varNonLenUnit,
    });
    alert.show('Order have been added to the cart successfully');
    setTimeout(() => {
      history.push('/cart');
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

  const listFrameType = generalEnums
    .map((ge) => ge)
    .filter((ge) => ge.type === 1);

  const optFrameType = [];
  for (let i = 0; i < listFrameType.length; i++) {
    let formattObj = {
      label: listFrameType[i].desc,
      value: listFrameType[i].id,
    };
    optFrameType.push(formattObj);
  }

  const listFrameShape = generalEnums
    .map((ge) => ge)
    .filter((ge) => ge.type === 0);

  const arrayFrameShape = [];
  for (let i = 0; i < listFrameShape.length; i++) {
    let formattObj = {
      label: listFrameShape[i].desc,
      value: listFrameShape[i].id,
    };
    arrayFrameShape.push(formattObj);
  }
  console.log(arrayFrameShape);

  const setFS = (num) => {
    setFrameShapeId(arrayFrameShape[num].value);
    setHolder(arrayFrameShape[num].label);
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
    for (let i = minSph; i <= maxSph; i = i + 0.25) {
      grades.push(gradify(i));
    }
    return grades;
  };

  const cylLoad = () => {
    let grades = [];
    for (let i = minCyl; i <= maxCyl; i = i + 0.25) {
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
    for (let i = minAdd; i <= maxAdd; i = i + 0.25) {
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
    let zero = {
      value: 0,
      label: 'N/A',
    };
    optGrades.push(zero);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row'>
        <div className='col-md-4'>
          <div className='form-group'>
            <label htmlFor=''>
              ACTIVE RX / BO NUMBER <span style={{ color: 'red' }}>*</span>
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
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <OrderTypes
            onChange={(selectedOption) => {
              setFormData({ ...formData, OrderType: selectedOption });
            }}
            value={OrderType.value}
            RxNumber={RxNumber.value}
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
        {counter > 0 && (
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor=''>FITTING</label>
              <Select
                options={optFitting}
                defaultValue={{ label: 'N/A', value: 0 }}
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    fitting: selectedOption.value,
                  });
                }}
              />
            </div>
          </div>
        )}
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
      {ItemCategories.value !== 1 && ItemCategories.value !== 2 ? (
        <div className='row'>
          <div className='col-md-4'>
            <Units
              value={nonLensUnitName}
              onChange={(selectedOption) => {
                setFormData({ ...formData, nonLensUnitName: selectedOption });
              }}
            />
          </div>
        </div>
      ) : null}
      <div className='row'>
        <div className='col-md-12'>
          {ItemCategories.value === 1 || ItemCategories.value === 2 ? (
            <Fragment>
              <h3>Grade Info</h3>
              <hr />
              {errors.OdQty && (
                <div className='alert alert-danger'>
                  OD QTY SHOULD BE A MAXIMUM OF ONE ITEM
                </div>
              )}
              {errors.OsQty && (
                <div className='alert alert-danger'>
                  OS QTY SHOULD BE A MAXIMUM OF ONE ITEM
                </div>
              )}
              <div className='row'>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-md-2'>
                      <div className='form-group'>
                        <label htmlFor=''>OD SPH</label>
                        <Select
                          value={OdSph.value}
                          options={optSph}
                          defaultValue={{ label: 'N/A', value: 0 }}
                          onChange={(selectedOption) => {
                            setFormData({
                              ...formData,
                              OdSph: selectedOption.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-md-2'>
                      <div className='form-group'>
                        <label htmlFor=''>OD CYL</label>
                        <Select
                          options={optCyl}
                          defaultValue={{ label: 'N/A', value: 0 }}
                          onChange={(selectedOption) => {
                            setFormData({
                              ...formData,
                              OdCyl: selectedOption.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-md-2'>
                      <div className='form-group'>
                        <label htmlFor=''>OD AXIS</label>
                        <Select
                          options={optAxis}
                          defaultValue={{ label: 'N/A', value: 0 }}
                          onChange={(selectedOption) => {
                            setFormData({
                              ...formData,
                              OdAxis: selectedOption.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-md-2'>
                      <div className='form-group'>
                        <label htmlFor=''>OD ADD</label>
                        <Select
                          options={optAdd}
                          defaultValue={{ label: 'N/A', value: 0 }}
                          onChange={(selectedOption) => {
                            setFormData({
                              ...formData,
                              OdAdd: selectedOption.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-md-2'>
                      <div className='form-group'>
                        <label htmlFor=''>OD PD</label>
                        <input
                          type='number'
                          className='form-control'
                          onChange={onChange}
                          style={{ margin: '0' }}
                          name='OdPd'
                        />
                      </div>
                    </div>
                    {ItemCategories.value === 2 && OrderType.value !== 2 ? (
                      <div className='col-md-2'>
                        <div className='form-group'>
                          <label htmlFor=''>OD QTY LENS</label>
                          <input
                            type='number'
                            ref={register({ min: 0, max: 1 })}
                            className='form-control'
                            onChange={onChange}
                            style={{ margin: '0' }}
                            name='OdQty'
                          />
                        </div>
                      </div>
                    ) : (
                      <div className='col-md-2'>
                        <div className='form-group'>
                          <label htmlFor=''>OD QTY</label>
                          <input
                            type='number'
                            ref={register({ min: 0, max: 400 })}
                            className='form-control'
                            onChange={onChange}
                            style={{ margin: '0' }}
                            name='OdQty'
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-md-2'>
                      <div className='form-group'>
                        <label htmlFor=''>OS SPH</label>
                        <Select
                          options={optSph}
                          defaultValue={{ label: 'N/A', value: 0 }}
                          onChange={(selectedOption) => {
                            setFormData({
                              ...formData,
                              OsSph: selectedOption.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-md-2'>
                      <div className='form-group'>
                        <label htmlFor=''>OS CYL</label>
                        <Select
                          options={optCyl}
                          defaultValue={{ label: 'N/A', value: 0 }}
                          onChange={(selectedOption) => {
                            setFormData({
                              ...formData,
                              OsCyl: selectedOption.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-md-2'>
                      <div className='form-group'>
                        <label htmlFor=''>OS AXIS</label>
                        <Select
                          options={optAxis}
                          defaultValue={{ label: 'N/A', value: 0 }}
                          onChange={(selectedOption) => {
                            setFormData({
                              ...formData,
                              OsAxis: selectedOption.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-md-2'>
                      <div className='form-group'>
                        <label htmlFor=''>OS ADD</label>
                        <Select
                          options={optAdd}
                          defaultValue={{ label: 'N/A', value: 0 }}
                          onChange={(selectedOption) => {
                            setFormData({
                              ...formData,
                              OsAdd: selectedOption.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-md-2'>
                      <div className='form-group'>
                        <label htmlFor=''>OS PD</label>
                        <input
                          type='number'
                          className='form-control'
                          onChange={onChange}
                          style={{ margin: '0' }}
                          name='OsPd'
                        />
                      </div>
                    </div>
                    {ItemCategories.value === 2 && OrderType.value !== 2 ? (
                      <div className='col-md-2'>
                        <div className='form-group'>
                          <label htmlFor=''>OS QTY</label>
                          <input
                            type='number'
                            ref={register({ min: 0, max: 1 })}
                            className='form-control'
                            onChange={onChange}
                            style={{ margin: '0' }}
                            name='OsQty'
                          />
                        </div>
                      </div>
                    ) : (
                      <div className='col-md-2'>
                        <div className='form-group'>
                          <label htmlFor=''>OS QTY</label>
                          <input
                            type='number'
                            ref={register({ min: 0, max: 200 })}
                            className='form-control'
                            onChange={onChange}
                            style={{ margin: '0' }}
                            name='OsQty'
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Fragment>
          ) : null}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          {OrderType.value === 3 && ItemCategories.value === 2 && (
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
                  <label htmlFor=''>Frame Type</label>
                  <Select
                    options={optFrameType}
                    onChange={(selectedOption) => {
                      setFormData({
                        ...formData,
                        FrameType: selectedOption.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label htmlFor=''>Frame Shape</label>
                      <input type='text' disabled value={frameShape} />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-m-3' style={{ padding: '10px' }}>
                    <button type='button' onClick={() => setFS(0)}>
                      <img
                        src='/images/OBLONG.jpg'
                        alt=''
                        style={{ width: '300px', height: '290px' }}
                      />
                    </button>
                  </div>
                  <div className='col-p-3' style={{ padding: '10px' }}>
                    <button type='button' onClick={() => setFS(1)}>
                      <img
                        src='/images/OVAL.jpg'
                        alt=''
                        style={{ width: '300px', height: '290px' }}
                      />
                    </button>
                  </div>
                  <div className='col-p-3' style={{ padding: '10px' }}>
                    <button type='button' onClick={() => setFS(2)}>
                      <img
                        src='/images/AVIATOR.jpg'
                        alt=''
                        style={{ width: '300px', height: '290px' }}
                      />
                    </button>
                  </div>
                  <div className='col-p-3' style={{ padding: '10px' }}>
                    <button type='button' onClick={() => setFS(3)}>
                      <img
                        src='/images/CAT_EYE.jpg'
                        alt=''
                        style={{ width: '300px', height: '290px' }}
                      />
                    </button>
                  </div>
                  <div className='col-p-3' style={{ padding: '10px' }}>
                    <button type='button' onClick={() => setFS(4)}>
                      <img
                        src='/images/SYMMETRICAL.jpg'
                        alt=''
                        style={{ width: '300px', height: '290px' }}
                      />
                    </button>
                  </div>
                  <div className='col-p-3' style={{ padding: '10px' }}>
                    <button type='button' onClick={() => setFS(5)}>
                      <img
                        src='/images/CUT_AWAY_RECTANGLE.jpg'
                        alt=''
                        style={{ width: '300px', height: '290px' }}
                      />
                    </button>
                  </div>
                  <div className='col-p-3' style={{ padding: '10px' }}>
                    <button type='button' onClick={() => setFS(6)}>
                      <img
                        src='/images/RECTANGLE.jpg'
                        alt=''
                        style={{ width: '300px', height: '290px' }}
                      />
                    </button>
                  </div>
                  <div className='col-p-3' style={{ padding: '10px' }}>
                    <button type='button' onClick={() => setFS(7)}>
                      <img
                        src='/images/CUT_AWAY_OVAL.jpg'
                        alt=''
                        style={{ width: '300px', height: '290px' }}
                      />
                    </button>
                  </div>
                  <div className='col-p-3' style={{ padding: '10px' }}>
                    <button type='button' onClick={() => setFS(8)}>
                      <img
                        src='/images/SHARP_RECTANGLE.jpg'
                        alt=''
                        style={{ width: '300px', height: '290px' }}
                      />
                    </button>
                  </div>
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
          {OrderType.value !== 2 ? (
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
      {OrderType.value !== 3 &&
        RxNumber.value !== undefined &&
        OrderType.value !== undefined &&
        ItemCategories.value !== undefined &&
        Brand.value !== undefined &&
        Model.value !== undefined &&
        Color.value !== undefined && (
          <button type='submit' className='btn btn-block btn-success'>
            Add To Cart
          </button>
        )}
      {OrderType.value === 3 &&
        RxNumber.value !== undefined &&
        OrderType.value !== undefined &&
        ItemCategories.value === 2 &&
        Brand.value !== undefined &&
        Model.value !== undefined &&
        Color.value !== undefined &&
        Horizontal !== '' &&
        Vertical !== '' &&
        Bridge !== '' &&
        FrameType !== '' &&
        frameShape !== '' && (
          <button type='submit' className='btn btn-block btn-success'>
            Add To Cart
          </button>
        )}
    </form>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  lists: state.cart.lists,
  lensParam: state.catalogue.lensParam,
  generalEnums: state.catalogue.generalEnums,
});

export default connect(mapStateToProps, { addToCart })(OrderFields);
