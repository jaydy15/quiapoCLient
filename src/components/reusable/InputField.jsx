import React from 'react';

const InputField = ({ id, label, type, value, onChange, name }) => {
  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className='form-control'
        id={id}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
