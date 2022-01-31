import React, { useState } from 'react';
import Select from 'react-select';
import AddCSAItem from './AddCSAItem';
import AddFSItem from './AddFSItem';
import AddLensItem from './AddLensItem';

const AddNewItem = ({ handleClose }) => {
  const [itemCategory, setItemCategory] = useState('');
  const optItemCategory = [
    { label: 'Lens', value: 'Lens' },
    { label: 'Frame', value: 'Frame' },
    { label: 'Accessories', value: 'Accessories' },
  ];

  console.log(itemCategory.userInput);
  return (
    <div>
      <div className='form-group'>
        <label htmlFor='brand'>
          Item Category<span style={{ color: 'red' }}>*</span>
        </label>
        <Select
          name='itemCategory'
          options={optItemCategory}
          onChange={(selectedOption) => {
            setItemCategory({ userInput: selectedOption.value });
          }}
        />
      </div>
      {itemCategory.userInput == 'Lens' && (
        <AddLensItem handleClose={handleClose} />
      )}
      {itemCategory.userInput == 'Accessories' && (
        <AddCSAItem handleClose={handleClose} />
      )}
      {itemCategory.userInput == 'Frame' && (
        <AddFSItem handleClose={handleClose} />
      )}
    </div>
  );
};

export default AddNewItem;
