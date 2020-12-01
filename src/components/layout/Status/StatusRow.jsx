import React, { Fragment, useState } from 'react';
import { Icon } from '@iconify/react';
import checkCircle from '@iconify-icons/mdi/check-circle';
import alphaXCircle from '@iconify-icons/mdi/alpha-x-circle';
import eyeIcon from '@iconify-icons/mdi/eye';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import StatusDetails from './StatusDetails';

const StatusRow = ({ orders, branch }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(orders);
  return (
    <Fragment>
      <tr key={orders.id}>
        <th scope='row'>{orders.id}</th>
        <td>{orders.rxNumber}</td>
        <td>{orders.status}</td>
        <td>
          <Icon
            className='icon'
            icon={checkCircle}
            style={{
              color: 'green',
              fontSize: '2rem',
              margin: '5px',
            }}
          />
          <Icon
            className='icon'
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
      </tr>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className='show-grid'>
          <div>
            <StatusDetails key={orders.id} od={orders} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleClose}>
            REJECT
          </Button>
          <Button variant='success'>APPROVE</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default StatusRow;
