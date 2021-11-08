import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Alerts from '../../../Alerts';
import { connect } from 'react-redux';
import { setAlert } from '../../../../redux/alert/alertActions';
import {
  loadClasses,
  saveModel,
} from '../../../../redux/backend/backendActions';
import { loadCatalogue } from '../../../../redux/localCatalog/localCatalogActions';

const AddModels = ({
  setAlert,
  handleClose,
  saveModel,
  setClasses,
  models,
  loadCatalogue,
}) => {
  useEffect(() => {
    loadCatalogue();

    //eslint-disable-next-line
  }, []);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name } = data;
    const isDuplicate = models.filter(
      (md) => md.modelName == name.toUpperCase()
    );
    console.log(isDuplicate);
    if (isDuplicate.length == 0) {
      saveModel(name.toUpperCase(), desc.toUpperCase());
      setAlert('Model Added Successfully', 'success');
      setTimeout(() => {
        setClasses('');
        setName('');
        loadCatalogue();
        handleClose();
      }, 1000);
    } else {
      setAlert('A model already exists, enter another model', 'danger');
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
        <button className='btn btn-block btn-success'>Add Color</button>
      </form>
      <Alerts />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  models: state.catalogue.fscsaModels,
});

export default connect(mapStateToProps, {
  setAlert,
  saveModel,
  loadCatalogue,
  loadClasses,
})(AddModels);
