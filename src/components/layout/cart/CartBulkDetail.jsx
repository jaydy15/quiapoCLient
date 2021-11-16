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
  csaItems,
  fsItems,
  units,
}) => {
  const formatITCY = itemcategory.find(
    (itm) => itm.id === bulk.itemCategories
  ).desc;
  const formatBrand = brands.find((br) => br.id === bulk.brand).name;
  if (bulk.color !== '') {
    const formatColor = colors.find((cl) => cl.id === bulk.color).colorName;
  }
  let formatMDL;
  console.log(bulk.itemCategories);
  if (bulk.itemCategories === 5 || bulk.itemCategories === 6) {
    formatMDL = csaItems.find((item) => item.id === bulk.model).description;
  } else if (bulk.itemCategories === 3 || bulk.itemCategories === 4) {
    let mdlKey = fsItems.find((fs) => fs.id === bulk.model).fsModelKey;
    formatMDL = fscsaModels.find((mdl) => mdl.id === mdlKey).modelDescription;
  } else if (bulk.itemCategories === 1 || bulk.itemCategories === 2) {
    formatMDL = lens.find((len) => len.id.toString() === bulk.model).name;
  }

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
            {(bulk.itemCategories === 1 || bulk.itemCategories === 2) && (
              <th scope='col'>GRADE DETAILS</th>
            )}

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
                    ? colors.find((cl) => cl.id === bulk.color).colorName
                    : null}
                </p>

                <p>
                  Non Lens Qty : {bulk.nonLensQty}{' '}
                  {units.find((un) => un.id === bulk.nonLensUnitName).desc}
                </p>
              </div>
            </td>
            {(bulk.itemCategories === 1 || bulk.itemCategories === 2) && (
              <td>
                <div>
                  <p>OD Details</p>
                  <p>{bulk.odDetails}</p>
                  <p>OS Details</p>
                  <p>{bulk.osDetails}</p>
                </div>
              </td>
            )}

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
  csaItems: state.catalogue.csaItems,
  fsItems: state.catalogue.fsItems,
  units: state.catalogue.units,
});

export default connect(mapStateToProps, { removeItem })(CartBulkDetail);
