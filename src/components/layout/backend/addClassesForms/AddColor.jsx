import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Alerts from '../../../Alerts';
import { connect } from 'react-redux';
import { setAlert } from '../../../../redux/alert/alertActions';
import {
  loadClasses,
  saveColor,
} from '../../../../redux/backend/backendActions';
import { loadCatalogue } from '../../../../redux/localCatalog/localCatalogActions';

const AddColor = ({
  setAlert,
  handleClose,
  saveColor,
  setClasses,
  color,
  loadCatalogue,
}) => {
  useEffect(() => {
    loadCatalogue();

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
    const isDuplicate = color.filter(
      (cl) => cl.colorName == name.toUpperCase()
    );
    console.log(isDuplicate);
    if (isDuplicate.length == 0) {
      saveColor(name.toUpperCase());
      setAlert('Brand Added Successfully', 'success');
      setTimeout(() => {
        setClasses('');
        setName('');
        loadCatalogue();
        handleClose();
      }, 1000);
    } else {
      setAlert('ColorName is already exists, enter another color', 'danger');
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
              Color Name is required
            </div>
          )}
        </div>
        <button className='btn btn-block btn-success'>Add Color</button>
      </form>
      <Alerts />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  color: state.catalogue.colors,
});

export default connect(mapStateToProps, {
  setAlert,
  saveColor,
  loadCatalogue,
  loadClasses,
})(AddColor);
