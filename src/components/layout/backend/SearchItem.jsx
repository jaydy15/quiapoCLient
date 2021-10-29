import React, { useState, Fragment } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import AddBrand from './addForms/AddBrand';
import AddLensType from './addForms/AddLensType';
import AddIndexType from './addForms/AddIndexType';
import AddProductFamily from './addForms/AddProductFamily';
import AddMaterial from './addForms/AddMaterial';
import AddLensItem from './addItemForms/AddLensItem';

const SearchItem = () => {
  const [barcode, setBarcode] = useState();
  const [classes, setClasses] = useState('');
  const [newclasses, setNewClasses] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const optClasses = [
    { label: 'Brand', value: 'Brand' },
    { label: 'Lens Type', value: 'Lens Type' },
    { label: 'Index Type', value: 'Index Type' },
    { label: 'Product Family', value: 'Product Family' },
    { label: 'Material', value: 'Material' },
  ];

  console.log(classes.userInput);
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
                  New
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
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className='show-grid'>
          <div>
            <AddLensItem />
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
          <div className='form-group'>
            <label htmlFor='brand'>
              Class<span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              name='classes'
              options={optClasses}
              onChange={(selectedOption) => {
                setClasses({ userInput: selectedOption.value });
              }}
            />
          </div>
          {classes.userInput == 'Brand' && (
            <AddBrand handleClose={handleClose2} setClasses={setClasses} />
          )}
          {classes.userInput == 'Lens Type' && (
            <AddLensType handleClose={handleClose2} setClasses={setClasses} />
          )}
          {classes.userInput == 'Index Type' && (
            <AddIndexType handleClose={handleClose2} setClasses={setClasses} />
          )}
          {classes.userInput == 'Product Family' && (
            <AddProductFamily
              handleClose={handleClose2}
              setClasses={setClasses}
            />
          )}
          {classes.userInput == 'Material' && (
            <AddMaterial handleClose={handleClose2} setClasses={setClasses} />
          )}
          {/* <div className='form-group'>
            <label htmlFor=''>
              Name<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type='text'
              className='form-control'
              name='newclasses'
              onChange={(e) => setNewClasses(e.target.value)}
            />
          </div> */}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default SearchItem;
