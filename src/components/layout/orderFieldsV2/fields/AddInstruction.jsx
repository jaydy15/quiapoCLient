import React from 'react';

const AddInstruction = ({ setFormData, formData, onChange, propAddIns }) => {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor=''>Additional Instructions</label>
        <input
          type='text'
          name='AdditionalInstructions'
          value={propAddIns}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default AddInstruction;
