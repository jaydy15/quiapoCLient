import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const RxOptions = ({ lists, setFormData, formData, propRx }) => {
  const optRxNumber = [];
  const optionFiller = (arrayName, arrayHolder) => {
    const list = arrayName.map((item) => item);

    for (let i = 0; i < list.length; i++) {
      let formattObj = {
        label: arrayName[i].OrderNumber,
        value: arrayName[i].OrderNumber,
      };
      arrayHolder.push(formattObj);
    }
  };
  optionFiller(lists, optRxNumber);

  return (
    <div>
      <div className='form-group'>
        <label htmlFor='brand'>
          Rx Number<span style={{ color: 'red' }}>*</span>
        </label>
        <Select
          name='RxNumber'
          options={optRxNumber}
          defaultValue={optRxNumber.find((ln) => ln.value == propRx)}
          onChange={(selectedOption) => {
            setFormData({ ...formData, RxNumber: selectedOption.value });
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lists: state.cart.lists,
});

export default connect(mapStateToProps)(RxOptions);
