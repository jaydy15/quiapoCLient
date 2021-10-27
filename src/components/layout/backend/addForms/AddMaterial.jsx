import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import Alerts from '../../../Alerts';
import { connect } from 'react-redux';
import { setAlert } from '../../../../redux/alert/alertActions';
import { saveMaterial } from '../../../../redux/backend/backendActions';
import { loadCatalogue } from '../../../../redux/localCatalog/localCatalogActions';

const AddMaterial = ({
  setAlert,
  handleClose,
  saveMaterial,
  setClasses,
  loadCatalogue,
}) => {
  const [name, setName] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name } = data;
    saveMaterial(name);

    setAlert('New Lens Material Added Successfully', 'success');

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

        <button className='btn btn-block btn-success'>Add Material</button>
      </form>
      <Alerts />
    </Fragment>
  );
};

export default connect(null, { setAlert, saveMaterial, loadCatalogue })(
  AddMaterial
);
