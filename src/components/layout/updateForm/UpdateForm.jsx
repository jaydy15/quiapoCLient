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

const UpdateForm = ({ current, brands, lens, lensParam }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const isLens =
    current[0].itemCategories == 1 || current[0].itemCategories == 2;
  const isFrame =
    current[0].itemCategories == 3 || current[0].itemCategories == 4;
  const isAccessories =
    current[0].itemCategories == 5 || current[0].itemCategories == 6;

  const findBrand = brands.find((br) => br.id === current[0].brand).name;

  let findModel;

  if (isLens) {
    findModel = lens.find((ln) => ln.id == current[0].model).name;
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
    Vertical: current[0].brand,
    Bridge: current[0].bridge,
    FrameType: current[0].frameType,
    LenShape: current[0].brand,
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

  let lensParamCounter = 0;
  let totalPower = 0;
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

  const onSubmit = (e) => {
    console.log(e);
  };

  console.log(current);
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

          <div className='row'>
            <input type='submit' className='btn btn-success btn-block' />
          </div>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  current: state.cart.current,
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

export default connect(mapStateToProps)(UpdateForm);
