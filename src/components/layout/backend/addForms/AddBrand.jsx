import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { setAlert } from '../../../../redux/alert/alertActions';
import { connect } from 'react-redux';
import Alerts from '../../../Alerts';
import { saveBrand } from '../../../../redux/backend/backendActions';

const AddBrand = ({ setAlert, handleClose, saveBrand }) => {
  const [name, setName] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name } = data;
    saveBrand(name);

    setAlert('Brand Added Successfully', 'success');

    setTimeout(() => {
      setName('');
      handleClose();
    }, 1000);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label htmlFor=''>
            Name<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='text'
            className='form-control'
            name='name'
            onChange={(e) => setName(e.target.value)}
            ref={register({ required: true })}
          />
        </div>

        <button className='btn btn-block btn-success'>Add Brand</button>
      </form>
      <Alerts />
    </Fragment>
  );
};

export default connect(null, { setAlert, saveBrand })(AddBrand);
