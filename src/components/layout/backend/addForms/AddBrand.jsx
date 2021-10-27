import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Alerts from '../../../Alerts';
import { connect } from 'react-redux';
import { setAlert } from '../../../../redux/alert/alertActions';
import {
  loadClasses,
  saveBrand,
} from '../../../../redux/backend/backendActions';
import { loadCatalogue } from '../../../../redux/localCatalog/localCatalogActions';

const AddBrand = ({
  setAlert,
  handleClose,
  saveBrand,
  setClasses,
  brand,
  loadClasses,
}) => {
  useEffect(() => {
    loadClasses();

    //eslint-disable-next-line
  }, []);
  const [name, setName] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name } = data;
    const isDuplicate = brand.filter((br) => br.name == name.toUpperCase());
    console.log(isDuplicate);
    if (isDuplicate.length == 0) {
      saveBrand(name);
      setAlert('Brand Added Successfully', 'success');
      setTimeout(() => {
        setClasses('');
        setName('');
        loadClasses();
        handleClose();
      }, 1000);
    } else {
      setAlert('Brand is already exists, enter another brand', 'danger');
    }
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
          {errors.name && (
            <div className='alert alert-danger col-md-3'>
              Brand Name is required
            </div>
          )}
        </div>
        <button className='btn btn-block btn-success'>Add Brand</button>
      </form>
      <Alerts />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  brand: state.classes.brand,
});

export default connect(mapStateToProps, {
  setAlert,
  saveBrand,
  loadCatalogue,
  loadClasses,
})(AddBrand);
