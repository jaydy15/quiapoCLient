import React, { useState, Fragment } from 'react';
import Select from 'react-select';
import AddBrand from './AddBrand';
import AddColor from './AddColor';
import AddIndexType from './AddIndexType';
import AddLensType from './AddLensType';
import AddMaterial from './AddMaterial';
import AddModels from './AddModels';
import AddProductFamily from './AddProductFamily';

const AddClassesForm = ({ handleClose2 }) => {
  const [classes, setClasses] = useState('');
  const optClasses = [
    { label: 'Brand', value: 'Brand' },
    { label: 'Lens Type', value: 'Lens Type' },
    { label: 'Index Type', value: 'Index Type' },
    { label: 'Product Family', value: 'Product Family' },
    { label: 'Material', value: 'Material' },
    { label: 'Color', value: 'Color' },
    { label: 'Models', value: 'Models' },
  ];

  console.log(classes.userInput);
  return (
    <div>
      <div className='form-group'>
        <label htmlFor='brand'>
          Class<span style={{ color: 'red' }}>*</span>
        </label>
        <Select
          name='classes'
          options={optClasses}
          onChange={(selectedOption) => {
            setClasses({ userInput: selectedOption.value });
          }}
        />
      </div>
      {classes.userInput == 'Brand' && (
        <AddBrand handleClose={handleClose2} setClasses={setClasses} />
      )}
      {classes.userInput == 'Lens Type' && (
        <AddLensType handleClose={handleClose2} setClasses={setClasses} />
      )}
      {classes.userInput == 'Index Type' && (
        <AddIndexType handleClose={handleClose2} setClasses={setClasses} />
      )}
      {classes.userInput == 'Product Family' && (
        <AddProductFamily handleClose={handleClose2} setClasses={setClasses} />
      )}
      {classes.userInput == 'Material' && (
        <AddMaterial handleClose={handleClose2} setClasses={setClasses} />
      )}
      {classes.userInput == 'Color' && (
        <AddColor handleClose={handleClose2} setClasses={setClasses} />
      )}
      {classes.userInput == 'Models' && (
        <AddModels handleClose={handleClose2} setClasses={setClasses} />
      )}
    </div>
  );
};

export default AddClassesForm;
