import React from 'react';
import { connect } from 'react-redux';

const CartDetails = ({
  bulk,
  ordertype,
  itemcategory,
  brands,
  lens,
  fscsaModels,
}) => {
  const formatITCY = itemcategory.find(
    (itm) => itm.id.toString() === bulk.ItemCategories
  ).desc;
  const formatODTY = ordertype.find(
    (itm) => itm.id.toString() === bulk.OrderType
  ).typeDesc;

  const formatBrand = brands.find((br) => br.id.toString() === bulk.Brand).name;
  console.log(fscsaModels);
  const formatMDL =
    formatITCY !== 'LENS'
      ? fscsaModels.find((mdl) => mdl.id.toString() === bulk.Model).modelName
      : lens.find((mdl) => mdl.id.toString() === bulk.Model).name;
  return (
    <div>
      <div className='row'>
        <div className='col-md-4'>
          <p>Order Type : {formatODTY}</p>
        </div>
        <div className='col-md-2'>
          <p>OdSph : {bulk.OdSph}</p>
        </div>
        <div className='col-md-2'>
          <p>OsSph : {bulk.OsSph}</p>
        </div>
        <div className='col-md-2'>
          <p>Horizontal : {bulk.Horizontal}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <p>Item Category : {formatITCY}</p>
        </div>
        <div className='col-md-2'>
          <p>OdCyl : {bulk.OdCyl}</p>
        </div>
        <div className='col-md-2'>
          <p>OsCyl : {bulk.OsCyl}</p>
        </div>
        <div className='col-md-2'>
          <p>Vertical : {bulk.Vertical}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <p>Brand : {formatBrand}</p>
        </div>
        <div className='col-md-2'>
          <p>OdAxis : {bulk.OdAxis}</p>
        </div>
        <div className='col-md-2'>
          <p>OsAxis : {bulk.OsAxis}</p>
        </div>
        <div className='col-md-2'>
          <p>Bridge : {bulk.Bridge}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <p>Model : {formatMDL}</p>
        </div>
        <div className='col-md-2'>
          <p>OdAxis : {bulk.OdAxis}</p>
        </div>
        <div className='col-md-2'>
          <p>OsAxis : {bulk.OsAxis}</p>
        </div>
        <div className='col-md-2'>
          <p>Frame Type : {bulk.FrameType}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <p>Color : {bulk.Color}</p>
        </div>
        <div className='col-md-2'>
          <p>OdPd : {bulk.OdPd}</p>
        </div>
        <div className='col-md-2'>
          <p>OsPd : {bulk.OsPd}</p>
        </div>
        <div className='col-md-2'>
          <p>Patient's Name : {bulk.PatientsName}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <p>Size : {bulk.Size}</p>
        </div>
        <div className='col-md-2'>
          <p>OdQty : {bulk.OdQty}</p>
        </div>
        <div className='col-md-2'>
          <p>OsQty : {bulk.OsQty}</p>
        </div>
        <div className='col-md-2'>
          <p>Additional Instruction : {bulk.AdditionalInstructions}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ordertype: state.catalogue.orderTypes,
  itemcategory: state.catalogue.supplyCategories,
  brands: state.catalogue.brands,
  lens: state.catalogue.lensItems,
  fscsaModels: state.catalogue.fscsaModels,
});

export default connect(mapStateToProps)(CartDetails);
