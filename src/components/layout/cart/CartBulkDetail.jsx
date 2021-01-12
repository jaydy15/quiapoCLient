import React from 'react';
import { connect } from 'react-redux';
import { removeItem } from './../../../redux/cart/cartActions';

const CartBulkDetail = ({
  bulk,
  ordertype,
  itemcategory,
  brands,
  lens,
  fscsaModels,
  removeItem,
}) => {
  const formatITCY = itemcategory.find(
    (itm) => itm.id.toString() === bulk.ItemCategories
  ).desc;

  const formatBrand = brands.find((br) => br.id.toString() === bulk.Brand).name;
  const formatMDL =
    formatITCY !== 'LENS'
      ? fscsaModels.find((mdl) => mdl.id.toString() === bulk.Model).modelName
      : lens.find((mdl) => mdl.id.toString() === bulk.Model).name;

  const removeItemFromCart = () => {
    removeItem(bulk.RxNumber, bulk.tempID);
  };
  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>ITEM DETAILS</th>
            <th scope='col'>GRADE DETAILS</th>
            <th scope='col'>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <div>
                <p>Item Category : {formatITCY}</p>
                <p>Brand : {formatBrand}</p>
                <p>Model : {formatMDL}</p>
                <p>Color : {bulk.Color}</p>
                <p>Size : {bulk.Size}</p>
              </div>
            </td>
            <td>
              <div>
                <p>OD Details</p>
                <p>{bulk.OdDetails}</p>
                <p>OS Details</p>
                <p>{bulk.OsDetails}</p>
              </div>
            </td>
            <td>
              <div
                className='btn btn-danger btn-block'
                onClick={removeItemFromCart}>
                REMOVE
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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

export default connect(mapStateToProps, { removeItem })(CartBulkDetail);
