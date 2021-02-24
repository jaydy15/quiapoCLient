import React, { Fragment, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import CartDetails from './CartDetails';
import { forApproval, removeNumber } from '../../../redux/cart/cartActions';

const CartList = ({
  item,
  orders,
  itemcategory,
  brands,
  lens,
  fscaModels,
  forApproval,
  branch,
  user,
  removeNumber,
  rxNumber,
  ordertype,
  list,
  csaItems,
  fsItems,
}) => {
  // MODAL PROPERTIES
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(item);
  let formatODTY, formatBrand, formatITCY, formatMDL;
  // FIND DESC FOR ID VALUES
  if (item.length >= 1) {
    formatODTY = ordertype.find(
      (itm) => itm.id.toString() === item[0].orderType
    ).typeDesc;
    formatBrand = brands.find((br) => br.id.toString() === item[0].brand).name;
    formatITCY = itemcategory.find(
      (itm) => itm.id.toString() === item[0].itemCategories
    ).desc;
    formatMDL =
      formatITCY !== 'LENS'
        ? fscaModels.find((mdl) => mdl.id.toString() === item[0].model)
            .modelName
        : lens.find((mdl) => mdl.id.toString() === item[0].model).name;
  }

  //BULK OR NON BULK
  const ot = list.find((x) => x.OrderNumber === item[0].rxNumber).OrderTypes;
  let isBulk;
  if (ot === 'Bulk Order') {
    isBulk = true;
  } else {
    isBulk = false;
  }

  //FOR SUBMIT FOR APPROVAL
  const onSubmit = (e) => {
    console.log('button clicked');
    e.preventDefault();
    const formattedItems = [];
    const itemKey = [];
    for (let i = 0; i < item.length; i++) {
      if (item[i].itemCategories === '2') {
        itemKey.push(item[i].model);
      } else if (
        item[i].itemCategories === '1' ||
        item[i].itemCategories === '5' ||
        item[i].itemCategories === '6'
      ) {
        itemKey.push(
          csaItems.find((csa) => csa.csaModelKey === parseInt(item[i].model)).id
        );
      } else {
        itemKey.push(
          fsItems.find((fs) => fs.fsModelKey === parseInt(item[i].model)).id
        );
      }
      console.log(itemKey);
      if (item[i].nonLensQty === '') {
        item[i].nonLensQty = 0;
      }
      const formatItem = {
        typeName: 'PO',
        fromBranchKey: branch,
        toBranchKey: branch,
        userIdKey: user,
        orderTypeKey: parseInt(item[i].orderType),
        rxNumber: rxNumber,
        supplyCategoryKey: parseInt(item[i].itemCategories),
        itemKey: itemKey[i],
        cdKey: parseInt(item[i].color),
        size: item[i].size,
        additionalInstruction: item[i].additionalInstructions,
        odDetails: item[i].odDetails,
        osDetails: item[i].osDetails,
        pxName: item[i].pxName,
        soDetails: item[i].soDetails,
        nonLensQty: item[i].nonLensQty,
        status: 'FOR APPROVAL',
      };
      formattedItems.push(formatItem);
    }

    const toGenerate = {
      rxNumber: rxNumber,
      branchId: branch,
      items: formattedItems,
      isBulk,
    };
    //console.log(toGenerate);
    forApproval(toGenerate);
    removeNumber(rxNumber);
  };

  return (
    <Fragment>
      {item.length >= 1 && (
        <Fragment>
          <div
            className='row'
            style={{ border: '1px solid #eee', margin: '20px' }}>
            <div className='col-md-12'>
              <h3 onClick={handleShow}>Rx Number : {rxNumber}</h3>
              <div className='row'>
                <div className='col-md-3'>
                  <p>Order Type: {formatODTY}</p>
                </div>
                <div className='col-md-3'>
                  <p>Item Category: {formatITCY}</p>
                </div>
                <div className='col-md-3'>
                  <p>Brand: {formatBrand}</p>{' '}
                </div>
                <div className='col-md-3'>
                  <p>Model: {formatMDL}</p>
                </div>
              </div>
            </div>
          </div>
          <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
              <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className='show-grid'>
              <div>
                <p>Rx Number : {rxNumber}</p>
                {item.map((bulk) => (
                  <CartDetails key={bulk.tempID} bulk={bulk} />
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' onClick={onSubmit}>
                Submit for Approval
              </Button>
            </Modal.Footer>
          </Modal>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  orders: state.cart.orders,
  itemcategory: state.catalogue.supplyCategories,
  brands: state.catalogue.brands,
  lens: state.catalogue.lensItems,
  fscaModels: state.catalogue.fscsaModels,
  branch: state.auth.user.BranchDetail.id,
  user: state.auth.user.id,
  ordertype: state.catalogue.orderTypes,
  list: state.cart.lists,
  csaItems: state.catalogue.csaItems,
  fsItems: state.catalogue.fsItems,
});

export default connect(mapStateToProps, { forApproval, removeNumber })(
  CartList
);
