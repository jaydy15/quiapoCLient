import React from 'react';

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
      grades.push(gradify(i));
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
  return (
    <div className='row'>
      <div className='col-md-2'>
        <label htmlFor=''>OD SPH</label>
        <select className='form-control' onChange={onChange} name='OdSph'>
          <option>N/A</option>
          {sphGrades.map((gr) => (
            <option key={gr}>{gr}</option>
          ))}
        </select>
      </div>
      <div className='col-md-2'>
        <label htmlFor=''>OD CYL</label>
        <select className='form-control' onChange={onChange} name='OdCyl'>
          <option>N/A</option>
          {cylGrades.map((gr) => (
            <option key={gr}>{gr}</option>
          ))}
        </select>
      </div>
      <div className='col-md-2'>
        <label htmlFor=''>OD AXIS</label>
        <select className='form-control' onChange={onChange} name='OdAxis'>
          <option>N/A</option>
          {axisGrades.map((gr) => (
            <option key={gr}>{gr}</option>
          ))}
        </select>
      </div>
      <div className='col-md-2'>
        <label htmlFor=''>OD ADD</label>
        <select className='form-control' onChange={onChange} name='OdAdd'>
          <option>N/A</option>
          {addGrades.map((gr) => (
            <option key={gr}>{gr}</option>
          ))}
        </select>
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
