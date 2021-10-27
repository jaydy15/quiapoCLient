import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import Alerts from '../../../Alerts';
import { connect } from 'react-redux';
import { setAlert } from '../../../../redux/alert/alertActions';
import { saveProductFamily } from '../../../../redux/backend/backendActions';
import { loadCatalogue } from '../../../../redux/localCatalog/localCatalogActions';

const AddProductFamily = ({
  setAlert,
  handleClose,
  saveProductFamily,
  setClasses,
  loadCatalogue,
}) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, desc } = data;
    saveProductFamily(name, desc);

    setAlert('New Product Family Added Successfully', 'success');

    setTimeout(() => {
      setClasses('');
      setName('');
      loadCatalogue();
      handleClose();
    }, 1000);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label htmlFor=''>
            Product Family Name<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='text'
            className='form-control'
            name='name'
            onChange={(e) => setName(e.target.value)}
            ref={register({ required: true })}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>
            Description<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='text'
            className='form-control'
            name='desc'
            onChange={(e) => setDesc(e.target.value)}
            ref={register({ required: true })}
          />
        </div>

        <button className='btn btn-block btn-success'>
          Add Product Family
        </button>
      </form>
      <Alerts />
    </Fragment>
  );
};

export default connect(null, { setAlert, saveProductFamily, loadCatalogue })(
  AddProductFamily
);
