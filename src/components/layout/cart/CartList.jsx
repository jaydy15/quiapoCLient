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
}) => {
  // MODAL PROPERTIES
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(item.length);
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
  const ot = list.find((x) => x.OrderNumber === item[0].rxNumber).OrderTypes;
  let isBulk;
  if (ot === 'Bulk Order') {
    isBulk = true;
  } else {
    isBulk = false;
  }

  //FOR SUBMIT FOR APPROVAL
  const onSubmit = (e) => {
    e.preventDefault();
    const toGenerate = {
      rxNumber: item[0].RxNumber,
      branchId: branch,
      items: item,
      isBulk,
    };
    console.log(toGenerate);

    // forApproval({
    //   id: '7',
    //   typeName: 'PO',
    //   fromBranchKey: branch,
    //   toBranchKey: branch,
    //   userIdKey: user,
    //   orderTypeKey: parseInt(item.OrderType),
    //   rxNumber: item.RxNumber,
    //   supplyCategoryKey: parseInt(item.ItemCategories),
    //   itemKey: '1',
    //   cdKey: '1',
    //   size: '11.00',
    //   additionalInstruction: item.AdditionalInstructions,
    //   odDetails: item.OdDetails,
    //   osDetails: item.OsDetails,
    //   pxName: item.PatientsName,
    //   soDetails: item.SoDetails,
    //   status: '',
    // });
    // removeNumber(item.RxNumber);
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
});

export default connect(mapStateToProps, { forApproval, removeNumber })(
  CartList
);
