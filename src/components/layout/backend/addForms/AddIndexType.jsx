import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import Alerts from '../../../Alerts';
import { connect } from 'react-redux';
import { setAlert } from '../../../../redux/alert/alertActions';
import {
  loadClasses,
  saveIndexType,
} from '../../../../redux/backend/backendActions';

const AddIndexType = ({
  setAlert,
  handleClose,
  saveIndexType,
  setClasses,
  loadClasses,
  indexType,
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
    const isDuplicate = indexType.filter((br) => br.name == name.toUpperCase());
    console.log(isDuplicate);
    if (isDuplicate.length == 0) {
      saveIndexType(name, desc);
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
            Index<span style={{ color: 'red' }}>*</span>
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

        <button className='btn btn-block btn-success'>Add Index Type</button>
      </form>
      <Alerts />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  indexType: state.classes.indexType,
});

export default connect(mapStateToProps, {
  setAlert,
  saveIndexType,
  loadClasses,
})(AddIndexType);
