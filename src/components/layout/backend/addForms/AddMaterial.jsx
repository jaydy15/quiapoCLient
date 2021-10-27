import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import Alerts from '../../../Alerts';
import { connect } from 'react-redux';
import { setAlert } from '../../../../redux/alert/alertActions';
import {
  saveMaterial,
  loadClasses,
} from '../../../../redux/backend/backendActions';

const AddMaterial = ({
  setAlert,
  handleClose,
  saveMaterial,
  setClasses,
  loadClasses,
  lensMaterial,
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
    const isDuplicate = lensMaterial.filter(
      (br) => br.name == name.toUpperCase()
    );
    console.log(isDuplicate);
    if (isDuplicate.length == 0) {
      saveMaterial(name.toUpperCase());
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
        </div>

        <button className='btn btn-block btn-success'>Add Material</button>
      </form>
      <Alerts />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  lensMaterial: state.classes.lensMaterial,
});

export default connect(mapStateToProps, {
  setAlert,
  saveMaterial,
  loadClasses,
})(AddMaterial);
