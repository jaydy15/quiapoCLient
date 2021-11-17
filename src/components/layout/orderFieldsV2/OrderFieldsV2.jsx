import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import BrandOptions from './fields/BrandOptions';
import ColorOptions from './fields/ColorOptions';
import FittingOptions from './fields/FittingOptions';
import GradesOptions from './fields/GradesOptions';
import ItemCategoryOptions from './fields/ItemCategoryOptions';
import LenShapeOptions from './fields/LenShapeOptions';
import ModelOptions from './fields/ModelOptions';
import OrderTypeOptions from './fields/OrderTypeOptions';
import RxOptions from './fields/RxOptions';
import FrameDetails from './fields/FrameDetails';
import AddInstruction from './fields/AddInstruction';
import PXName from './fields/PXName';
import NonLensDetails from './fields/NonLensDetails';
import { connect } from 'react-redux';
import { setAlert } from '../../../redux/alert/alertActions';
import Alerts from '../../Alerts';
import { addToCart } from '../../../redux/cart/cartActions';
import { v4 as uuidv4 } from 'uuid';

const OrderFieldsV2 = ({ setAlert, addToCart, lensParam }) => {
  let history = useHistory();
  const alert = useAlert();
  const [formData, setFormData] = useState({
    RxNumber: '',
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
    Horizontal: '0',
    Vertical: '0',
    Bridge: '0',
    FrameType: '0',
    LenShape: '0',
    AdditionalInstructions: '',
    LensParamId: '',
    nonLensUnitName: '',
    fitting: '',
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
    LenShape,
    AdditionalInstructions,
    LensParamId,
    nonLensUnitName,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // TOTAL POWER
  let totalPower = 0;
  if (Model !== '' && LensParamId !== '') {
    const lensFit = lensParam.filter((item) => item.lensItemKey === Model);

    if (lensFit.length > 0) {
      const arrayLensFitting = lensParam.filter(
        (item) => item.lensItemKey === Model && item.id === LensParamId
      );
      console.log(arrayLensFitting);
      totalPower = arrayLensFitting[0].totalPower;
    } else {
      totalPower = lensFit[0].totalPower;
    }
  }
  console.log(totalPower);

  const valueChecker = (value, field) => {
    if (value == '' || value == 0) {
      setAlert(field + ' is required', 'danger');
      return false;
    } else {
      return true;
    }
  };

  const numChecker = (value, field) => {
    if (value == 0) {
      setAlert(field + ' is required', 'danger');
      return false;
    } else if (value > 1) {
      setAlert(
        field + ' you reached the maximun quantity for your order',
        'danger'
      );
      return false;
    } else {
      return true;
    }
  };

  const powerChecker = (sph, cyl) => {
    if (totalPower !== 0) {
      if (sph + cyl > totalPower) {
        setAlert('Please Check the SPH or CYL for TOTAL POWER', 'danger');
        return false;
      } else {
        return true;
      }
    }
  };

  const isJO = OrderType == 1;
  const isSO = OrderType == 3;
  const isBulk = OrderType == 2;

  const isLens = ItemCategories == 2;

  const OdDetails =
    OdSph + '|' + OdCyl + '|' + OdAxis + '|' + OdAdd + '|' + OdPd + '|' + OdQty;
  const OsDetails =
    OsSph + '|' + OsCyl + '|' + OsAxis + '|' + OsAdd + '|' + OsPd + '|' + OsQty;

  const SoDetails =
    Horizontal +
    '|' +
    Vertical +
    '|' +
    Bridge +
    '|' +
    FrameType +
    '|' +
    LenShape;

  const onSubmit = (e) => {
    const tempID = uuidv4();
    const Validation = () => {
      const arrayValidation = [];
      arrayValidation.push(valueChecker(RxNumber, 'RxNumber'));
      arrayValidation.push(valueChecker(OrderType, 'OrderType'));
      arrayValidation.push(valueChecker(ItemCategories, 'Item Category'));
      arrayValidation.push(valueChecker(Brand, 'Brand'));
      arrayValidation.push(valueChecker(Model, 'Model'));
      arrayValidation.push(valueChecker(Color, 'Color'));
      arrayValidation.push(powerChecker(OdSph, OdCyl));
      arrayValidation.push(powerChecker(OsSph, OsCyl));
      // JOB ORDER LENS QUANTITY
      if ((isJO || isSO) && isLens && valueChecker(OdSph, 'OdSph')) {
        arrayValidation.push(numChecker(OdQty, 'OdQty'));
      }
      if ((isJO || isSO) && isLens && valueChecker(OsSph, 'OsSph')) {
        arrayValidation.push(numChecker(OsQty, 'OsQty'));
      }
      // SO DETAILS FRAMES
      if (isSO && isLens) {
        arrayValidation.push(valueChecker(Horizontal, 'Horizontal'));
        arrayValidation.push(valueChecker(Vertical, 'Vertical'));
        arrayValidation.push(valueChecker(Bridge, 'Bridge'));
        arrayValidation.push(valueChecker(FrameType, 'FrameType'));
        arrayValidation.push(valueChecker(LenShape, 'LenShape'));
      }

      if (isBulk && ItemCategories !== 2) {
        arrayValidation.push(valueChecker(NonLensQty, 'NonLensQty'));
        arrayValidation.push(valueChecker(nonLensUnitName, 'nonLensUnitName'));
      }

      console.log(arrayValidation);
      const oneFalse = arrayValidation.filter((itm) => itm == false);
      if (oneFalse.length !== 0) {
        return false;
      } else {
        return true;
      }
    };

    const greenLight = Validation();
    console.log(greenLight);

    if (greenLight) {
      const obj = {
        tempID,
        rxNumber: RxNumber,
        orderType: OrderType,
        itemCategories: ItemCategories,
        brand: Brand,
        model: Model,
        color: Color,
        size: 0,
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
        lensParamKey: LensParamId,
        nonLensUnitName: nonLensUnitName,
      };
      console.log(obj);
      addToCart(obj);
      alert.show('Order have been added to the cart successfully');
      setTimeout(() => {
        history.push('/cart');
      }, 1000);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <RxOptions setFormData={setFormData} formData={formData} />
            </div>
            <div className='col-md-4'>
              <OrderTypeOptions
                setFormData={setFormData}
                formData={formData}
                RxNumber={RxNumber}
              />
            </div>
            <div className='col-md-4'>
              <ItemCategoryOptions
                setFormData={setFormData}
                formData={formData}
                RxNumber={RxNumber}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-6'>
              <BrandOptions
                setFormData={setFormData}
                formData={formData}
                RxNumber={RxNumber}
                ItemCategories={ItemCategories}
                OrderType={OrderType}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <ModelOptions
                setFormData={setFormData}
                formData={formData}
                RxNumber={RxNumber}
                Brand={Brand}
                OrderType={OrderType}
                ItemCategories={ItemCategories}
                Model={Model}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-4'>
              <ColorOptions
                setFormData={setFormData}
                formData={formData}
                Model={Model}
                ItemCategories={ItemCategories}
                LensParamId={LensParamId}
              />
            </div>
            <div className='col-md-6'>
              <FittingOptions
                setFormData={setFormData}
                formData={formData}
                RxNumber={RxNumber}
                Brand={Brand}
                OrderType={OrderType}
                ItemCategories={ItemCategories}
                Model={Model}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12'>
              <GradesOptions
                setFormData={setFormData}
                formData={formData}
                Model={Model}
                ItemCategories={ItemCategories}
                LensParamId={LensParamId}
                onChange={onChange}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12'>
              <FrameDetails
                setFormData={setFormData}
                formData={formData}
                onChange={onChange}
                OrderType={OrderType}
                ItemCategories={ItemCategories}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12'>
              <LenShapeOptions
                setFormData={setFormData}
                formData={formData}
                OrderType={OrderType}
                ItemCategories={ItemCategories}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12'>
              <NonLensDetails
                setFormData={setFormData}
                formData={formData}
                onChange={onChange}
                ItemCategories={ItemCategories}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12'>
              <AddInstruction
                setFormData={setFormData}
                formData={formData}
                onChange={onChange}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-9'>
              <PXName onChange={onChange} OrderType={OrderType} />
            </div>
          </div>

          <Alerts />
          <div className='row'>
            <input type='submit' className='btn btn-success btn-block' />
          </div>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  lensParam: state.catalogue.lensParam,
});

export default connect(mapStateToProps, { setAlert, addToCart })(OrderFieldsV2);
