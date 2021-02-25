import React from 'react';
import Select from 'react-select';

const OdGrades = ({ onChange, OdSph, OdCyl, OdAxis, OdAdd, OdPd, OdQty }) => {
  const gradify = (item) => {
    let number = item.toFixed(2);
    if (item > 0) {
      return '+' + number;
    } else {
      if (item < 0) {
        return number;
      } else {
        return 'PLANO';
      }
    }
  };
  const sphLoad = () => {
    let grades = [];
    for (let i = -25.0; i <= 25.0; i = i + 0.25) {
      grades.push(gradify(i));
    }
    return grades;
  };

  const cylLoad = () => {
    let grades = [];
    for (let i = -8.0; i <= -0.25; i = i + 0.25) {
      grades.push(gradify(i));
    }
    return grades;
  };

  const axisLoad = () => {
    let grades = [];
    for (let i = 0; i <= 180; i++) {
      grades.push(i);
    }
    return grades;
  };

  const addLoad = () => {
    let grades = [];
    for (let i = 0.25; i <= 4.0; i = i + 0.25) {
      grades.push(gradify(i));
    }
    return grades;
  };

  const sphGrades = sphLoad();
  const cylGrades = cylLoad();
  const axisGrades = axisLoad();
  const addGrades = addLoad();

  const utils = (arrayMap) => {
    let optGrades = [];
    let listGrades = arrayMap.map((item) => item);
    for (let i = 0; i < listGrades.length; i++) {
      let formattObj = {
        value: listGrades[i],
        label: listGrades[i],
      };
      optGrades.push(formattObj);
    }

    return optGrades;
  };

  const optSph = utils(sphGrades);
  const optCyl = utils(cylGrades);
  const optAxis = utils(axisGrades);
  const optAdd = utils(addGrades);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '30px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      padding: '0 6px',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: (state) => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '30px',
    }),
  };

  return (
    <div className='row'>
      <div className='col-md-2'>
        <label htmlFor=''>OD SPH</label>
        <Select options={optSph} styles={customStyles} />
      </div>
      <div className='col-md-2'>
        <label htmlFor=''>OD CYL</label>
        <Select options={optCyl} styles={customStyles} onChange={onChange} />
      </div>
      <div className='col-md-2'>
        <label htmlFor=''>OD AXIS</label>
        <Select options={optAxis} styles={customStyles} onChange={onChange} />
      </div>
      <div className='col-md-2'>
        <label htmlFor=''>OD ADD</label>
        <Select options={optAdd} styles={customStyles} onChange={onChange} />
      </div>
      <div className='col-md-2'>
        <label htmlFor=''>OD PD</label>
        <input
          type='number'
          className='form-control'
          onChange={onChange}
          style={{ margin: '0' }}
          name='OdPd'
        />
      </div>
      <div className='col-md-2'>
        <label htmlFor=''>OD QTY</label>
        <input
          type='number'
          className='form-control'
          onChange={onChange}
          style={{ margin: '0' }}
          name='OdQty'
        />
      </div>
    </div>
  );
};

export default OdGrades;
