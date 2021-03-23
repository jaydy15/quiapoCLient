import React from 'react';
import { connect } from 'react-redux';
import { removeItem } from '../../../redux/cart/cartActions';
import CartBulkDetail from './CartBulkDetail';

const CartDetails = ({
  bulk,
  ordertype,
  itemcategory,
  brands,
  lens,
  fscsaModels,
  csaItems,
  removeItem,
}) => {
  const formatITCY = itemcategory.find((itm) => itm.id === bulk.itemCategories)
    .desc;
  const formatODTY = ordertype.find((itm) => itm.id === bulk.orderType)
    .typeDesc;

  const formatBrand = brands.find((br) => br.id === bulk.brand).name;
  let formatMDL;
  if (bulk.itemCategories === 2) {
    formatMDL = lens.find((len) => len.id === bulk.model).name;
  } else if (
    bulk.itemCategories === 1 ||
    bulk.itemCategories === 5 ||
    bulk.itemCategories === 6
  ) {
    formatMDL = csaItems.find((csa) => csa.id.toString() === bulk.model)
      .description;
  }

  const removeItemFromCart = () => {
    console.log(bulk.rxNumber, bulk.tempID);
    removeItem(bulk.rxNumber, bulk.tempID);
  };
  return (
    <div>
      {formatODTY === 'BULK ORDER' && <CartBulkDetail bulk={bulk} />}
      {formatODTY !== 'BULK ORDER' && (
        <div>
          <div className='row'>
            <div className='col-md-4'>
              <p>Order Type : {formatODTY}</p>
            </div>
            <div className='col-md-2'>
              <p>OdSph : {bulk.odSph}</p>
            </div>
            <div className='col-md-2'>
              <p>OsSph : {bulk.osSph}</p>
            </div>
            <div className='col-md-2'>
              <p>Horizontal : {bulk.horizontal}</p>
            </div>
            <div className='col-md-2'>
              <button className='btn btn-danger' onClick={removeItemFromCart}>
                DELETE
              </button>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <p>Item Category : {formatITCY}</p>
            </div>
            <div className='col-md-2'>
              <p>OdCyl : {bulk.odCyl}</p>
            </div>
            <div className='col-md-2'>
              <p>OsCyl : {bulk.osCyl}</p>
            </div>
            <div className='col-md-2'>
              <p>Vertical : {bulk.vertical}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <p>Brand : {formatBrand}</p>
            </div>
            <div className='col-md-2'>
              <p>OdAxis : {bulk.odAxis}</p>
            </div>
            <div className='col-md-2'>
              <p>OsAxis : {bulk.osAxis}</p>
            </div>
            <div className='col-md-2'>
              <p>Bridge : {bulk.bridge}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <p>Model : {formatMDL}</p>
            </div>
            <div className='col-md-2'>
              <p>OdAxis : {bulk.odAxis}</p>
            </div>
            <div className='col-md-2'>
              <p>OsAxis : {bulk.osAxis}</p>
            </div>
            <div className='col-md-2'>
              <p>Frame Type : {bulk.frameType}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <p>Color : {bulk.color}</p>
            </div>
            <div className='col-md-2'>
              <p>OdPd : {bulk.odPd}</p>
            </div>
            <div className='col-md-2'>
              <p>OsPd : {bulk.osPd}</p>
            </div>
            <div className='col-md-2'>
              <p>Patient's Name : {bulk.pxName}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <p>Size : {bulk.size}</p>
            </div>
            <div className='col-md-2'>
              <p>OdQty : {bulk.odQty}</p>
            </div>
            <div className='col-md-2'>
              <p>OsQty : {bulk.osQty}</p>
            </div>
            <div className='col-md-2'>
              <p>Additional Instruction : {bulk.additionalInstructions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ordertype: state.catalogue.orderTypes,
  itemcategory: state.catalogue.supplyCategories,
  brands: state.catalogue.brands,
  lens: state.catalogue.lensItems,
  fscsaModels: state.catalogue.fscsaModels,
  csaItems: state.catalogue.csaItems,
});

export default connect(mapStateToProps, { removeItem })(CartDetails);
