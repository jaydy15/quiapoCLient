import React, { Fragment, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CartList = ({ item }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <div
        className='row'
        style={{ border: '1px black solid', margin: '20px' }}>
        <div className='col-md-12'>
          <h3 onClick={handleShow}>Rx Number : {item.RxNumber}</h3>
          <div className='row'>
            <div className='col-md-3'>
              <p>Item Category: {item.ItemCategories}</p>
            </div>
            <div className='col-md-3'>
              <p>Brand: {item.Brand}</p>
            </div>
            <div className='col-md-3'>
              <p>Model: {item.Model}</p>
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
            <div className='row'>
              <div className='col-md-4'>
                <p>Order Type : {item.OrderType}</p>
              </div>
              <div className='col-md-2'>
                <p>OdSph : {item.OdSph}</p>
              </div>
              <div className='col-md-2'>
                <p>OsSph : {item.OsSph}</p>
              </div>
              <div className='col-md-2'>
                <p>Horizontal : {item.Horizontal}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <p>Item Category : {item.ItemCategories}</p>
              </div>
              <div className='col-md-2'>
                <p>OdCyl : {item.OdCyl}</p>
              </div>
              <div className='col-md-2'>
                <p>OsCyl : {item.OsCyl}</p>
              </div>
              <div className='col-md-2'>
                <p>Vertical : {item.Vertical}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <p>Brand : {item.Brand}</p>
              </div>
              <div className='col-md-2'>
                <p>OdAxis : {item.OdAxis}</p>
              </div>
              <div className='col-md-2'>
                <p>OsAxis : {item.OsAxis}</p>
              </div>
              <div className='col-md-2'>
                <p>Bridge : {item.Bridge}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <p>Model : {item.Model}</p>
              </div>
              <div className='col-md-2'>
                <p>OdAxis : {item.OdAxis}</p>
              </div>
              <div className='col-md-2'>
                <p>OsAxis : {item.OsAxis}</p>
              </div>
              <div className='col-md-2'>
                <p>Frame Type : {item.FrameType}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <p>Color : {item.Color}</p>
              </div>
              <div className='col-md-2'>
                <p>OdPd : {item.OdPd}</p>
              </div>
              <div className='col-md-2'>
                <p>OsPd : {item.OsPd}</p>
              </div>
              <div className='col-md-2'>
                <p>Patient's Name : {item.PatientsName}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <p>Size : {item.Size}</p>
              </div>
              <div className='col-md-2'>
                <p>OdQty : {item.OdQty}</p>
              </div>
              <div className='col-md-2'>
                <p>OsQty : {item.OsQty}</p>
              </div>
              <div className='col-md-2'>
                <p>Additional Instruction : {item.AdditionalInstructions}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CartList;
