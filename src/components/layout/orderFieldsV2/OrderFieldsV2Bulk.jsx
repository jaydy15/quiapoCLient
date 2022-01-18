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
    OdSph1: '0',
    OdCyl1: '0',
    OdAxis1: '0',
    OdAdd1: '0',
    OdPd1: '0',
    OdQty1: '0',
    OsSph1: '0',
    OsCyl1: '0',
    OsAxis1: '0',
    OsAdd1: '0',
    OsPd1: '0',
    OsQty1: '0',
    OdSph2: '0',
    OdCyl2: '0',
    OdAxis2: '0',
    OdAdd2: '0',
    OdPd2: '0',
    OdQty2: '0',
    OsSph2: '0',
    OsCyl2: '0',
    OsAxis2: '0',
    OsAdd2: '0',
    OsPd2: '0',
    OsQty2: '0',
    OdSph3: '0',
    OdCyl3: '0',
    OdAxis3: '0',
    OdAdd3: '0',
    OdPd3: '0',
    OdQty3: '0',
    OsSph3: '0',
    OsCyl3: '0',
    OsAxis3: '0',
    OsAdd3: '0',
    OsPd3: '0',
    OsQty3: '0',
    OdSph4: '0',
    OdCyl4: '0',
    OdAxis4: '0',
    OdAdd4: '0',
    OdPd4: '0',
    OdQty4: '0',
    OsSph4: '0',
    OsCyl4: '0',
    OsAxis4: '0',
    OsAdd4: '0',
    OsPd4: '0',
    OsQty4: '0',
    OdSph5: '0',
    OdCyl5: '0',
    OdAxis5: '0',
    OdAdd5: '0',
    OdPd5: '0',
    OdQty5: '0',
    OsSph5: '0',
    OsCyl5: '0',
    OsAxis5: '0',
    OsAdd5: '0',
    OsPd5: '0',
    OsQty5: '0',
    PatientsName: '',
    Horizontal: '0',
    Vertical: '0',
    Bridge: '0',
    FrameType: '0',
    LenShape: '0',
    AdditionalInstructions: '',
    LensParamId: '',
    LensParamIdOd: '',
    LensParamIdOs: '',
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
    NonLensQty,
    OdSph1,
    OdCyl1,
    OdAxis1,
    OdAdd1,
    OdPd1,
    OdQty1,
    OsSph1,
    OsCyl1,
    OsAxis1,
    OsAdd1,
    OsPd1,
    OsQty1,
    OdSph2,
    OdCyl2,
    OdAxis2,
    OdAdd2,
    OdPd2,
    OdQty2,
    OsSph2,
    OsCyl2,
    OsAxis2,
    OsAdd2,
    OsPd2,
    OsQty2,
    OdSph3,
    OdCyl3,
    OdAxis3,
    OdAdd3,
    OdPd3,
    OdQty3,
    OsSph3,
    OsCyl3,
    OsAxis3,
    OsAdd3,
    OsPd3,
    OsQty3,
    OdSph4,
    OdCyl4,
    OdAxis4,
    OdAdd4,
    OdPd4,
    OdQty4,
    OsSph4,
    OsCyl4,
    OsAxis4,
    OsAdd4,
    OsPd4,
    OsQty4,
    OdSph5,
    OdCyl5,
    OdAxis5,
    OdAdd5,
    OdPd5,
    OdQty5,
    OsSph5,
    OsCyl5,
    OsAxis5,
    OsAdd5,
    OsPd5,
    OsQty5,
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

  const { handleSubmit } = useForm();
  // TOTAL POWER
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
  console.log(totalPower);

  const valueChecker = (value, field) => {
    if (value == '' || value == 0) {
      setAlert(field + ' is required', 'danger');
      return false;
    } else {
      return true;
    }
  };
  const gradeChecker = (value) => {
    if (value == '' || value == 0) {
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

  const isLens = ItemCategories == 2;

  const odArray = [];
  const osArray = [];

  const OdDetails1 =
    OdSph1 +
    '|' +
    OdCyl1 +
    '|' +
    OdAxis1 +
    '|' +
    OdAdd1 +
    '|' +
    OdPd1 +
    '|' +
    OdQty1;
  const OsDetails1 =
    OsSph1 +
    '|' +
    OsCyl1 +
    '|' +
    OsAxis1 +
    '|' +
    OsAdd1 +
    '|' +
    OsPd1 +
    '|' +
    OsQty1;
  const OdDetails2 =
    OdSph2 +
    '|' +
    OdCyl2 +
    '|' +
    OdAxis2 +
    '|' +
    OdAdd2 +
    '|' +
    OdPd2 +
    '|' +
    OdQty2;
  const OsDetails2 =
    OsSph2 +
    '|' +
    OsCyl2 +
    '|' +
    OsAxis2 +
    '|' +
    OsAdd2 +
    '|' +
    OsPd2 +
    '|' +
    OsQty2;
  const OdDetails3 =
    OdSph3 +
    '|' +
    OdCyl3 +
    '|' +
    OdAxis3 +
    '|' +
    OdAdd3 +
    '|' +
    OdPd3 +
    '|' +
    OdQty3;
  const OsDetails3 =
    OsSph3 +
    '|' +
    OsCyl3 +
    '|' +
    OsAxis3 +
    '|' +
    OsAdd3 +
    '|' +
    OsPd3 +
    '|' +
    OsQty3;
  const OdDetails4 =
    OdSph4 +
    '|' +
    OdCyl4 +
    '|' +
    OdAxis4 +
    '|' +
    OdAdd4 +
    '|' +
    OdPd4 +
    '|' +
    OdQty4;
  const OsDetails4 =
    OsSph4 +
    '|' +
    OsCyl4 +
    '|' +
    OsAxis4 +
    '|' +
    OsAdd4 +
    '|' +
    OsPd4 +
    '|' +
    OsQty4;
  const OdDetails5 =
    OdSph5 +
    '|' +
    OdCyl5 +
    '|' +
    OdAxis5 +
    '|' +
    OdAdd5 +
    '|' +
    OdPd5 +
    '|' +
    OdQty5;
  const OsDetails5 =
    OsSph5 +
    '|' +
    OsCyl5 +
    '|' +
    OsAxis5 +
    '|' +
    OsAdd5 +
    '|' +
    OsPd5 +
    '|' +
    OsQty5;

  odArray.push(OdDetails1);
  odArray.push(OdDetails2);
  odArray.push(OdDetails3);
  odArray.push(OdDetails4);
  odArray.push(OdDetails5);
  osArray.push(OsDetails1);
  osArray.push(OsDetails2);
  osArray.push(OsDetails3);
  osArray.push(OsDetails4);
  osArray.push(OsDetails5);

  console.log(odArray);

  const loopChecker = (Od, Os) => {
    let counter = 0;
    if (Od !== '0' || Os !== '0') {
      counter += 1;
    }
    return counter;
  };

  let c1 = loopChecker(OdQty1, OsQty1);
  let c2 = loopChecker(OdQty2, OsQty2);
  let c3 = loopChecker(OdQty3, OsQty3);
  let c4 = loopChecker(OdQty4, OsQty4);
  let c5 = loopChecker(OdQty5, OsQty5);

  let loopCounter = c1 + c2 + c3 + c4 + c5;
  console.log(loopCounter, 'LoopCounter');

  const rowChecker = (Od, Os, array, id) => {
    if (Od.charAt(0) !== '0' || Os.charAt(0) !== '0') {
      array.push(id);
    }
  };

  const lightBulb = [];
  rowChecker(OdDetails1, OsDetails1, lightBulb, 0);
  rowChecker(OdDetails2, OsDetails2, lightBulb, 1);
  rowChecker(OdDetails3, OsDetails3, lightBulb, 2);
  rowChecker(OdDetails4, OsDetails4, lightBulb, 3);
  rowChecker(OdDetails5, OsDetails5, lightBulb, 4);

  console.log(lightBulb);
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
    const Validation = () => {
      const arrayValidation = [];
      arrayValidation.push(valueChecker(RxNumber, 'RxNumber'));
      arrayValidation.push(valueChecker(OrderType, 'OrderType'));
      arrayValidation.push(valueChecker(ItemCategories, 'Item Category'));
      arrayValidation.push(valueChecker(Brand, 'Brand'));
      arrayValidation.push(valueChecker(Model, 'Model'));
      arrayValidation.push(valueChecker(Color, 'Color'));
      arrayValidation.push(powerChecker(OdSph1, OdCyl1));
      arrayValidation.push(powerChecker(OsSph1, OsCyl1));
      // JOB ORDER LENS QUANTITY
      if ((isJO || isSO) && isLens && valueChecker(OdSph1, 'OdSph')) {
        arrayValidation.push(numChecker(OdQty1, 'OdQty'));
      }
      if ((isJO || isSO) && isLens && valueChecker(OsSph1, 'OsSph')) {
        arrayValidation.push(numChecker(OsQty1, 'OsQty'));
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
      for (let x = 0; x < loopCounter; x++) {
        console.log(lightBulb[x]);
        let num = lightBulb[x];
        const tempID = uuidv4();
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
          odDetails: odArray[num],
          osDetails: osArray[num],
          soDetails: SoDetails,
          odSph: OdSph1,
          odCyl: OdCyl1,
          odAxis: OdAxis1,
          odAdd: OdAdd1,
          odPd: OdPd1,
          odQty: OdQty1,
          osSph: OsSph1,
          osCyl: OsCyl1,
          osAxis: OsAxis1,
          osAdd: OsAdd1,
          osPd: OsPd1,
          osQty: OsQty1,
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

          {lensParamCounter == 1 && (
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
                  Model={Model}
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
                OdSph={'OdSph1'}
                OdCyl={'OdCyl1'}
                OdAxis={'OdAxis1'}
                OdAdd={'OdAdd1'}
                OdPd={'OdPd1'}
                OdQty={'OdQty1'}
                OsSph={'OsSph1'}
                OsCyl={'OsCyl1'}
                OsAxis={'OsAxis1'}
                OsAdd={'OsAdd1'}
                OsPd={'OsPd1'}
                OsQty={'OsQty1'}
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
                lensParamCounter={lensParamCounter}
                LensParamIdOd={LensParamIdOd}
                LensParamIdOs={LensParamIdOs}
                OdSph={'OdSph2'}
                OdCyl={'OdCyl2'}
                OdAxis={'OdAxis2'}
                OdAdd={'OdAdd2'}
                OdPd={'OdPd2'}
                OdQty={'OdQty2'}
                OsSph={'OsSph2'}
                OsCyl={'OsCyl2'}
                OsAxis={'OsAxis2'}
                OsAdd={'OsAdd2'}
                OsPd={'OsPd2'}
                OsQty={'OsQty2'}
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
                lensParamCounter={lensParamCounter}
                LensParamIdOd={LensParamIdOd}
                LensParamIdOs={LensParamIdOs}
                OdSph={'OdSph3'}
                OdCyl={'OdCyl3'}
                OdAxis={'OdAxis3'}
                OdAdd={'OdAdd3'}
                OdPd={'OdPd3'}
                OdQty={'OdQty3'}
                OsSph={'OsSph3'}
                OsCyl={'OsCyl3'}
                OsAxis={'OsAxis3'}
                OsAdd={'OsAdd3'}
                OsPd={'OsPd3'}
                OsQty={'OsQty3'}
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
                lensParamCounter={lensParamCounter}
                LensParamIdOd={LensParamIdOd}
                LensParamIdOs={LensParamIdOs}
                OdSph={'OdSph4'}
                OdCyl={'OdCyl4'}
                OdAxis={'OdAxis4'}
                OdAdd={'OdAdd4'}
                OdPd={'OdPd4'}
                OdQty={'OdQty4'}
                OsSph={'OsSph4'}
                OsCyl={'OsCyl4'}
                OsAxis={'OsAxis4'}
                OsAdd={'OsAdd4'}
                OsPd={'OsPd4'}
                OsQty={'OsQty4'}
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
                lensParamCounter={lensParamCounter}
                LensParamIdOd={LensParamIdOd}
                LensParamIdOs={LensParamIdOs}
                OdSph={'OdSph5'}
                OdCyl={'OdCyl5'}
                OdAxis={'OdAxis5'}
                OdAdd={'OdAdd5'}
                OdPd={'OdPd5'}
                OdQty={'OdQty5'}
                OsSph={'OsSph5'}
                OsCyl={'OsCyl5'}
                OsAxis={'OsAxis5'}
                OsAdd={'OsAdd5'}
                OsPd={'OsPd5'}
                OsQty={'OsQty5'}
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
