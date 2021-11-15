import React, { Fragment } from 'react';

const PXName = ({ setFormData, formData, onChange, OrderType }) => {
  const isBulk = OrderType == 2;
  return (
    <Fragment>
      {isBulk ? null : (
        <div>
          <div className='form-group'>
            <label htmlFor=''>Patient's Name</label>
            <input type='text' name='PatientsName' onChange={onChange} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PXName;
