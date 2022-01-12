import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import BrandOptions from '../orderFieldsV2/fields/BrandOptions';
import ModelOptions from '../orderFieldsV2/fields/ModelOptions';
import ColorOptions from '../orderFieldsV2/fields/ColorOptions';
import FittingOptions from '../orderFieldsV2/fields/FittingOptions';
import GradesOptions from '../orderFieldsV2/fields/GradesOptions';
import ItemCategoryOptions from '../orderFieldsV2/fields/ItemCategoryOptions';
import LenShapeOptions from '../orderFieldsV2/fields/LenShapeOptions';
import OrderTypeOptions from '../orderFieldsV2/fields/OrderTypeOptions';
import RxOptions from '../orderFieldsV2/fields/RxOptions';
import FrameDetails from '../orderFieldsV2/fields/FrameDetails';
import AddInstruction from '../orderFieldsV2/fields/AddInstruction';
import PXName from '../orderFieldsV2/fields/PXName';
import NonLensDetails from '../orderFieldsV2/fields/NonLensDetails';
import {
  addToCart,
  removeCurrent,
  removeItem,
  updateCart,
} from '../../../redux/cart/cartActions';
import { v4 as uuidv4 } from 'uuid';
import { setAlert } from '../../../redux/alert/alertActions';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

const UpdateForm = ({
  current,
  brands,
  lens,
  lensParam,
  updateCart,
  setAlert,
  removeItem,
  addToCart,
  removeCurrent,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let history = useHistory();
  const alert = useAlert();
  console.log(current);
  if (current) {
  }
  const [formData, setFormData] = useState({
    RxNumber: current[0].rxNumber,
    OrderType: current[0].orderType,
    ItemCategories: current[0].itemCategories,
    Brand: current[0].brand,
    Model: current[0].model,
    Color: current[0].color,
    Size: '0',
    NonLensQty: current[0].nonLensQty,
    OdSph: current[0].odSph,
    OdCyl: current[0].odCyl,
    OdAxis: current[0].odAxis,
    OdAdd: current[0].odAdd,
    OdPd: current[0].odPd,
    OdQty: current[0].odQty,
    OsSph: current[0].osSph,
    OsCyl: current[0].osCyl,
    OsAxis: current[0].osAxis,
    OsAdd: current[0].osAdd,
    OsPd: current[0].osPd,
    OsQty: current[0].osQty,
    PatientsName: current[0].pxName,
    Horizontal: current[0].horizontal,
    Vertical: current[0].vertical,
    Bridge: current[0].bridge,
    FrameType: current[0].frameType,
    LenShape: current[0].lenShape,
    AdditionalInstructions: current[0].additionalInstructions,
    LensParamId: current[0].lensParamKey,
    LensParamIdOd: '',
    LensParamIdOs: '',
    nonLensUnitName: current[0].nonLensUnitName,
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
    LensParamIdOd,
    LensParamIdOs,
    nonLensUnitName,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isLens = ItemCategories == 2;

  let totalPower = 0;
  let lensParamCounter = 0;
  if (Model !== '') {
    const lensFit = lensParam.filter((item) => item.lensItemKey === Model);
    lensParamCounter = lensFit.length;
  }
  if (Model !== '' && LensParamIdOd !== '') {
    const lensFit = lensParam.filter((item) => item.lensItemKey === Model);
    if (lensFit.length > 0) {
      const arrayLensFitting = lensParam.filter(
        (item) => item.lensItemKey === Model && item.id === LensParamIdOd
      );
      totalPower = arrayLensFitting[0].totalPower;
    } else {
      totalPower = lensFit[0].totalPower;
    }
  }

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
    } else {
      return true;
    }
  };

  const isJO = OrderType == 1;
  const isSO = OrderType == 3;
  const isBulk = OrderType == 2;

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

  console.log(current);

  const onSubmit = (e) => {
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

      const oneFalse = arrayValidation.filter((itm) => itm == false);
      if (oneFalse.length !== 0) {
        return false;
      } else {
        return true;
      }
    };

    const greenLight = Validation();

    if (greenLight) {
      const obj = {
        tempID: current[0].tempID,
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
      removeItem(obj.rxNumber, obj.tempID);
      addToCart(obj);
      alert.show('Order have been added to the cart successfully');
      setTimeout(() => {
        history.push('/cart');
      }, 1000);
      removeCurrent(obj.tempID);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <RxOptions
                setFormData={setFormData}
                formData={formData}
                propRx={RxNumber}
              />
            </div>
            <div className='col-md-4'>
              <OrderTypeOptions
                setFormData={setFormData}
                formData={formData}
                RxNumber={RxNumber}
                propOrderType={OrderType}
              />
            </div>
            <div className='col-md-4'>
              <ItemCategoryOptions
                setFormData={setFormData}
                formData={formData}
                RxNumber={RxNumber}
                propItemCategory={ItemCategories}
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
                propBrand={Brand}
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
                propModel={Model}
              />
            </div>
          </div>

          {lensParamCounter == 1 && (
            <div className='row'>
              <div className='col-md-4'>
                <ColorOptions
                  setFormData={setFormData}
                  formData={formData}
                  Model={Model}
                  ItemCategories={ItemCategories}
                  LensParamId={LensParamId}
                  propColor={Color}
                />
              </div>
              <div className='col-md-6'>
                <FittingOptions
                  setFormData={setFormData}
                  formData={formData}
                  Model={Model}
                  propParam={LensParamId}
                />
              </div>
            </div>
          )}

          <div className='row'>
            <div className='col-md-12'>
              <GradesOptions
                setFormData={setFormData}
                formData={formData}
                Model={Model}
                ItemCategories={ItemCategories}
                LensParamId={LensParamId}
                onChange={onChange}
                lensParamCounter={lensParamCounter}
                LensParamIdOd={LensParamIdOd}
                LensParamIdOs={LensParamIdOs}
                propOdSph={OdSph}
                propOdCyl={OdCyl}
                propOdAxis={OdAxis}
                propOdAdd={OdAdd}
                propOdPd={OdPd}
                propOdQty={OdQty}
                propOsSph={OsSph}
                propOsCyl={OsCyl}
                propOsAxis={OsAxis}
                propOsAdd={OsAdd}
                propOsPd={OsPd}
                propOsQty={OsQty}
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
                propHorizontal={Horizontal}
                propVertical={Vertical}
                propBridge={Bridge}
                propFrameType={FrameType}
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
                propLenShape={LenShape}
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
                propAddIns={AdditionalInstructions}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-9'>
              <PXName
                onChange={onChange}
                OrderType={OrderType}
                propPxName={PatientsName}
              />
            </div>
          </div>

          <div className='row'>
            <input type='submit' className='btn btn-success btn-block' />
          </div>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  ordertype: state.catalogue.orderTypes,
  itemcategory: state.catalogue.supplyCategories,
  brands: state.catalogue.brands,
  lens: state.catalogue.lensItems,
  fscsaModels: state.catalogue.fscsaModels,
  csaItems: state.catalogue.csaItems,
  colors: state.catalogue.colors,
  genEnum: state.catalogue.generalEnums,
  fsItems: state.catalogue.fsItems,
  lensParam: state.catalogue.lensParam,
});

export default connect(mapStateToProps, {
  updateCart,
  setAlert,
  removeItem,
  addToCart,
  removeCurrent,
})(UpdateForm);
