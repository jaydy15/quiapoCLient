import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import Alerts from '../../../Alerts';
import { connect } from 'react-redux';
import { setAlert } from '../../../../redux/alert/alertActions';
import {
  saveProductFamily,
  loadClasses,
} from '../../../../redux/backend/backendActions';

const AddProductFamily = ({
  setAlert,
  handleClose,
  saveProductFamily,
  setClasses,
  loadClasses,
  productFamily,
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
    const isDuplicate = productFamily.filter(
      (br) => br.name == name.toUpperCase()
    );
    console.log(isDuplicate);
    if (isDuplicate.length == 0) {
      saveProductFamily(name.toUpperCase(), desc.toUpperCase());
      setAlert('Product Family Added Successfully', 'success');
      setTimeout(() => {
        setClasses('');
        setName('');
        loadClasses();
        handleClose();
      }, 1000);
    } else {
      setAlert(
        'A product family already exists, enter another product family',
        'danger'
      );
    }
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

const mapStateToProps = (state) => ({
  productFamily: state.classes.productFamily,
});

export default connect(mapStateToProps, {
  setAlert,
  saveProductFamily,
  loadClasses,
})(AddProductFamily);
