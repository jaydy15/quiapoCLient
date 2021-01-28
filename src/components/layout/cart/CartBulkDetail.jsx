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
  colors,
}) => {
  const formatITCY = itemcategory.find(
    (itm) => itm.id.toString() === bulk.itemCategories
  ).desc;

  const formatBrand = brands.find((br) => br.id.toString() === bulk.brand).name;
  if (bulk.color !== '') {
    const formatColor = colors.find((cl) => cl.id.toString() === bulk.color)
      .colorName;
    console.log(formatColor);
  }
  const formatMDL =
    formatITCY !== 'LENS'
      ? fscsaModels.find((mdl) => mdl.id.toString() === bulk.model).modelName
      : lens.find((mdl) => mdl.id.toString() === bulk.model).name;

  const removeItemFromCart = () => {
    console.log(bulk.rxNumber);
    removeItem(bulk.rxNumber, bulk.tempID);
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
                <p>
                  Color :{' '}
                  {bulk.color !== ''
                    ? colors.find((cl) => cl.id.toString() === bulk.color)
                        .colorName
                    : null}
                </p>
                <p>Size : {bulk.size}</p>
              </div>
            </td>
            <td>
              <div>
                <p>OD Details</p>
                <p>{bulk.odDetails}</p>
                <p>OS Details</p>
                <p>{bulk.osDetails}</p>
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
  colors: state.catalogue.colors,
});

export default connect(mapStateToProps, { removeItem })(CartBulkDetail);
