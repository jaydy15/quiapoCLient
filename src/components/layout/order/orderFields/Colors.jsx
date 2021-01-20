import React from 'react';
import { connect } from 'react-redux';

const Colors = ({ onChange, colors }) => {
  return (
    <div className='form-group'>
      <label htmlFor='brand'>Color</label>
      <select onChange={onChange} className='form-control' name='Color'>
        <option>Select Color</option>
        {colors.map((color) => (
          <option key={color.id} value={color.id}>
            {color.colorName}
          </option>
        ))}
      </select>
    </div>
  );
};

const mapStateToProps = (state) => ({
  colors: state.catalogue.colors,
});

export default connect(mapStateToProps)(Colors);
