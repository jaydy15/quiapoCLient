import React from 'react';

const AddInstruction = ({ setFormData, formData, onChange }) => {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor=''>Additional Instructions</label>
        <input type='text' name='AdditionalInstructions' onChange={onChange} />
      </div>
    </div>
  );
};

export default AddInstruction;
