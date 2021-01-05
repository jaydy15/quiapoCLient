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
  RxNumber,
}) => {
  // MODAL PROPERTIES
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // FIND DESC FOR ID VALUES
  const filtredOrder = orders.filter(
    (order) => order.RxNumber === item.RxNumber
  );
  const formatBrand = brands.find((br) => br.id.toString() === item[0].Brand)
    .name;
  const formatITCY = itemcategory.find(
    (itm) => itm.id.toString() === item[0].ItemCategories
  ).desc;
  console.log(item);
  const formatMDL =
    formatITCY !== 'LENS'
      ? fscaModels.find((mdl) => mdl.id.toString() === item[0].Model).modelName
      : lens.find((mdl) => mdl.id.toString() === item[0].Model).name;
  //FOR SUBMIT FOR APPROVAL
  const onSubmit = (e) => {
    e.preventDefault();
    forApproval({
      id: '7',
      typeName: 'PO',
      fromBranchKey: branch,
      toBranchKey: branch,
      userIdKey: user,
      orderTypeKey: parseInt(item.OrderType),
      rxNumber: item.RxNumber,
      supplyCategoryKey: parseInt(item.ItemCategories),
      itemKey: '1',
      cdKey: '1',
      size: '11.00',
      additionalInstruction: item.AdditionalInstructions,
      odDetails: item.OdDetails,
      osDetails: item.OsDetails,
      pxName: item.PatientsName,
      soDetails: item.SoDetails,
      status: '',
    });
    removeNumber(item.RxNumber);
  };

  return (
    <Fragment>
      <div className='row' style={{ border: '1px solid #eee', margin: '20px' }}>
        <div className='col-md-12'>
          <h3 onClick={handleShow}>Rx Number : {RxNumber}</h3>
          <div className='row'>
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
            <p>Rx Number : {RxNumber}</p>
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
});

export default connect(mapStateToProps, { forApproval, removeNumber })(
  CartList
);
