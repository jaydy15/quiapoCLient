import React, { Fragment, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import CartDetails from './CartDetails';
import { forApproval } from '../../../redux/cart/cartActions';
import { v4 as uuidv4 } from 'uuid';

const CartList = ({
  item,
  orders,
  itemcategory,
  brands,
  lens,
  fscaModel,
  forApproval,
  branch,
  user,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const filtredOrder = orders.filter(
    (order) => order.RxNumber === item.RxNumber
  );
  const formatBrand = brands.find((br) => br.id.toString() === item.Brand).name;
  const formatITCY = itemcategory.find(
    (itm) => itm.id.toString() === item.ItemCategories
  ).desc;
  const formatMDL =
    formatITCY === 'LENS'
      ? lens.find((mdl) => mdl.id.toString() === item.Model).name
      : fscaModel.find((mdl) => mdl.id.toString() === item.Model).modelName;

  const onSubmit = (e) => {
    e.preventDefault();
    forApproval({
      id: '4',
      typeName: 'PO',
      fromBranchKey: branch,
      toBranchKey: branch,
      userIdKey: user,
      orderTypeKey: parseInt(item.OrderType),
      rxNumber: parseInt(item.RxNumber),
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
  };

  return (
    <Fragment>
      <div className='row' style={{ border: '1px solid #eee', margin: '20px' }}>
        <div className='col-md-12'>
          <h3 onClick={handleShow}>Rx Number : {item.RxNumber}</h3>
          <div className='row'>
            <div className='col-md-3'>
              <p>Item Category: {formatITCY}</p>
            </div>
            <div className='col-md-3'>
              <p>Brand: {formatBrand}</p>
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
            <p>Rx Number : {item.RxNumber}</p>
            {filtredOrder.map((bulk) => (
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
  fscaModel: state.catalogue.fscaModel,
  branch: state.auth.user.BranchDetail.id,
  user: state.auth.user.id,
});

export default connect(mapStateToProps, { forApproval })(CartList);
