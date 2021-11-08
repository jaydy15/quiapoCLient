import React, { useState, Fragment } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import AddLensItem from './addItemForms/AddLensItem';
import AddClassesForm from './addClassesForms/AddClassesForm';
import AddNewItem from './addItemForms/AddNewItem';
import AddLensParams from './addLensParams/AddLensParams';

const SearchItem = () => {
  const [barcode, setBarcode] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  return (
    <Fragment>
      <div>
        <Navbar />
        <div className='dcontainer'>
          <div className='left-side'>
            <Sidebar />
          </div>
          <div className='main-content'>
            <h1>BackEnd Dashboard</h1>
            <div className='d-flex flex-row-reverse'>
              <div className='p-2'>
                <button
                  type='button'
                  className='btn btn-success'
                  data-toggle='modal'
                  data-target='#myModal'
                  onClick={handleShow}>
                  New Product
                </button>
              </div>
              <div className='p-2'>
                <button
                  type='button'
                  className='btn btn-success'
                  data-toggle='modal'
                  data-target='#myModal'
                  onClick={handleShow2}>
                  New Classes
                </button>
              </div>
              <div className='p-2'>
                <button
                  type='button'
                  className='btn btn-success'
                  data-toggle='modal'
                  data-target='#myModal'
                  onClick={handleShow3}>
                  New Lens Param
                </button>
              </div>
            </div>
            <div className='col'>
              <div className='form-group'>
                <label htmlFor=''>
                  Barcode<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  name='barcode'
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* New Item Complete Info */}
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body className='show-grid'>
          <div>
            <AddNewItem handleClose={handleClose} />
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* New Classes */}
      <Modal show={show2} onHide={handleClose2} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>New Class</Modal.Title>
        </Modal.Header>
        <Modal.Body className='show-grid'>
          <div>
            <AddClassesForm handleClose2={handleClose2} />
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* New Lens Param */}
      <Modal show={show3} onHide={handleClose3} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>New Lens Param</Modal.Title>
        </Modal.Header>
        <Modal.Body className='show-grid'>
          <div>
            <AddLensParams handleClose2={handleClose2} />
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default SearchItem;
