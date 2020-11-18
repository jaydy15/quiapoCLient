import React, { Fragment, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import CartDetails from './CartDetails';

const CartList = ({ item, orders }) => {
  console.log(item);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filtredOrder = orders.filter(
    (order) => order.RxNumber === item.RxNumber
  );
  const formatBrand = JSON.parse(item.Brand);
  const formatITCY = JSON.parse(item.ItemCategories);
  const formatMDL = JSON.parse(item.Model);
  return (
    <Fragment>
      <div
        className='row'
        style={{ border: '1px black solid', margin: '20px' }}>
        <div className='col-md-12'>
          <h3 onClick={handleShow}>Rx Number : {item.RxNumber}</h3>
          <div className='row'>
            <div className='col-md-3'>
              <p>Item Category: {formatITCY.desc}</p>
            </div>
            <div className='col-md-3'>
              <p>Brand: {formatBrand.name}</p>
            </div>
            <div className='col-md-3'>
              <p>Model: {formatMDL.modelName}</p>
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
          <Button variant='primary' onClick={handleClose}>
            Submit for Approval
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  orders: state.cart.orders,
});

export default connect(mapStateToProps)(CartList);
