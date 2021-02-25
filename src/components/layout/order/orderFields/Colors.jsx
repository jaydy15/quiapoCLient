import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const Colors = ({ onChange, colors }) => {
  let listColorId = colors.map((color) => color.id);
  let listColorName = colors.map((color) => color.colorName);
  let optColor = [];
  for (let i = 0; i < listColorId.length; i++) {
    let formattObj = {
      label: listColorName[i],
      value: listColorName[i],
    };
    optColor.push(formattObj);
  }
  return (
    <div className='form-group'>
      <label htmlFor='brand'>
        Color<span style={{ color: 'red' }}>*</span>
      </label>
      <Select options={optColor} onChange={onChange} />
      {/* <select onChange={onChange} className='form-control' name='Color'>
        <option>Select Color</option>
        {colors.map((color) => (
          <option key={color.id} value={color.id}>
            {color.colorName}
          </option>
        ))}
      </select> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  colors: state.catalogue.colors,
});

export default connect(mapStateToProps)(Colors);
