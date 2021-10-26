import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

const Units = ({ units, onChange }) => {
  const arrayUnits = units.map((item) => item.name);
  const arrayUnitsdesc = units.map((item) => item.desc);
  let listUnits = [];
  for (let i = 0; i < arrayUnits.length; i++) {
    let formatObj = {
      label: arrayUnitsdesc[i],
      value: arrayUnits[i],
    };
    listUnits.push(formatObj);
  }
  return (
    <div>
      <div className='form-group'>
        <label htmlFor='brand'>
          Units<span style={{ color: 'red' }}>*</span>
        </label>
        <Select options={listUnits} onChange={onChange} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  units: state.catalogue.units,
});

export default connect(mapStateToProps)(Units);
