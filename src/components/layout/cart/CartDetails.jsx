import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  editOrder,
  removeCurrent,
  removeItem,
} from '../../../redux/cart/cartActions';
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
  colors,
  genEnum,
  fsItems,
  editOrder,
  removeCurrent,
}) => {
  let history = useHistory();
  const formatITCY = itemcategory.find(
    (itm) => itm.id === bulk.itemCategories
  ).desc;
  const formatODTY = ordertype.find(
    (itm) => itm.id === bulk.orderType
  ).typeDesc;

  const formatBrand = brands.find((br) => br.id === bulk.brand).name;
  const formatColor = colors.find((cl) => cl.id === bulk.color).colorName;
  let formatMDL;
  console.log(bulk.model);
  if (bulk.itemCategories === 2 || bulk.itemCategories === 1) {
    formatMDL = lens.find((len) => len.id.toString() === bulk.model).name;
    console.log(formatMDL);
  } else if (bulk.itemCategories === 3 || bulk.itemCategories === 4) {
    let mdlKey = fsItems.find((fs) => fs.id === bulk.model).fsModelKey;
    formatMDL = fscsaModels.find((mdl) => mdl.id === mdlKey).modelDescription;
  } else {
    formatMDL = csaItems.find(
      (csa) => csa.id.toString() === bulk.model
    ).description;
  }

  const removeItemFromCart = () => {
    console.log(bulk.rxNumber, bulk.tempID);
    removeItem(bulk.rxNumber, bulk.tempID);
  };

  const editItem = () => {
    console.log(bulk);
    editOrder(bulk);
    history.push('/edit-order');
  };

  const removeC = () => {
    console.log(bulk.tempID);
    removeCurrent(bulk.tempID);
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
            <div className='col-md-2'>
              <button className='btn btn-info' onClick={editItem}>
                EDIT
              </button>
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
            <div className='col-md-2'>
              <button className='btn btn-danger' onClick={removeC}>
                CLEAR
              </button>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <p>Model : {formatMDL}</p>
            </div>
            <div className='col-md-2'>
              <p>OdAdd : {bulk.odAdd}</p>
            </div>
            <div className='col-md-2'>
              <p>OsAdd : {bulk.osAdd}</p>
            </div>

            {bulk.orderType === 3 && (
              <div className='col-md-2'>
                <p>
                  Frame Type :
                  {genEnum.find((ge) => ge.id === bulk.frameType).desc}
                </p>
              </div>
            )}
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <p>Color : {formatColor}</p>
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
  colors: state.catalogue.colors,
  genEnum: state.catalogue.generalEnums,
  fsItems: state.catalogue.fsItems,
});

export default connect(mapStateToProps, {
  removeItem,
  editOrder,
  removeCurrent,
})(CartDetails);
