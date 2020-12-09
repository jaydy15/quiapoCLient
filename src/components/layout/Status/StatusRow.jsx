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
  orders,
  od,
  branch,
  approveOrder,
  rejectOrder,
  user,
  getOrders,
}) => {
  const [show, setShow] = useState(false);
  const [propsOrder, changePropsOrder] = useState(orders);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const orderApproved = () => {
    approveOrder(od.id);
    window.location.reload();
  };

  const orderRejected = () => {
    rejectOrder(od.id);
    window.location.reload();
  };

  return (
    <Fragment>
      <tr key={od.id}>
        <th scope='row'>{od.id}</th>
        <td>{od.rxNumber}</td>
        <td>{od.status}</td>
        {user.access === '0' ? (
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
            <StatusDetails key={od.id} od={od} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {user.access === '0' && (
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
  orders: state.orders.orders,
});

export default connect(mapStateToProps, {
  approveOrder,
  rejectOrder,
  getOrders,
})(StatusRow);
