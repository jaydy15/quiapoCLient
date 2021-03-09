import React, { Fragment, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import checkCircle from '@iconify-icons/mdi/check-circle';
import alphaXCircle from '@iconify-icons/mdi/alpha-x-circle';
import eyeIcon from '@iconify-icons/mdi/eye';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import StatusDetails from './StatusDetails';
import { approveOrder, rejectOrder } from '../../../redux/cart/cartActions';
import { connect } from 'react-redux';
import { getOrders } from './../../../redux/order/orderActions';

const StatusRow = ({
  order,
  od,
  branch,
  approveOrder,
  rejectOrder,
  user,
  getOrders,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [status, setStatus] = useState(order.items[0].status);

  console.log(order.items[0]);

  const orderApproved = () => {
    try {
      approveOrder(order.items[0].txNumber, branch);
      setStatus('APPROVED');
    } catch (err) {
      setStatus(order.items[0].status);
    }
  };

  const orderRejected = () => {
    try {
      rejectOrder(order.items[0].txNumber, branch);
      setStatus('REJECTED');
    } catch (err) {
      setStatus(order.items[0].status);
    }
  };

  return (
    <Fragment>
      <tr key={order.items[0].txNumber}>
        <td>{order.items[0].txNumber}</td>
        <td>{order.items[0].rxNumber}</td>
        <td>{status}</td>
        {status === 'FOR APPROVAL' &&
        (user.access === '0' ||
          user.access === '1' ||
          user.access === '2' ||
          user.access === '3') ? (
          <td>
            <Icon
              className='icon'
              icon={checkCircle}
              onClick={orderApproved}
              style={{
                color: 'green',
                fontSize: '2rem',
                margin: '5px',
              }}
            />
            <Icon
              className='icon'
              onClick={orderRejected}
              icon={alphaXCircle}
              style={{
                color: 'red',
                fontSize: '2rem',
                margin: '5px',
              }}
            />
            <Icon
              className='icon'
              icon={eyeIcon}
              style={{
                color: 'orange',
                fontSize: '2rem',
                margin: '5px',
              }}
              onClick={handleShow}
            />
          </td>
        ) : (
          <td>
            <Icon
              className='icon'
              icon={eyeIcon}
              style={{
                color: 'orange',
                fontSize: '2rem',
                margin: '5px',
              }}
              onClick={handleShow}
            />
          </td>
        )}
      </tr>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className='show-grid'>
          <div>
            <StatusDetails key={order.items[0].status} items={order.items} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {(user.access === '0' ||
            user.access === '1' ||
            user.access === '2' ||
            user.access === '3') && (
            <Fragment>
              <Button variant='danger' onClick={orderRejected}>
                REJECT
              </Button>
              <Button variant='success' onClick={orderApproved}>
                APPROVE
              </Button>
            </Fragment>
          )}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  branch: state.auth.user.BranchDetail.id,
});

export default connect(mapStateToProps, {
  approveOrder,
  rejectOrder,
  getOrders,
})(StatusRow);
