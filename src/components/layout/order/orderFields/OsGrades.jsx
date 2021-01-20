import React from 'react';

const OsGrades = ({ onChange }) => {
  const sphLoad = () => {
    let grades = [];
    for (let i = -25.0; i <= 25.0; i = i + 0.25) {
      grades.push(i);
    }
    return grades;
  };

  const cylLoad = () => {
    let grades = [];
    for (let i = -8.0; i <= -0.25; i = i + 0.25) {
      grades.push(i);
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
      grades.push(i);
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
        <label htmlFor=''>OS SPH</label>
        <select className='form-control' onChange={onChange} name='OsSph'>
          <option>N/A</option>
          {sphGrades.map((gr) => (
            <option key={gr}>{gr}</option>
          ))}
        </select>
      </div>
      <div className='col-md-2'>
        <label htmlFor=''>OS CYL</label>
        <select className='form-control' onChange={onChange} name='OsCyl'>
          <option>N/A</option>
          {cylGrades.map((gr) => (
            <option key={gr}>{gr}</option>
          ))}
        </select>
      </div>
      <div className='col-md-2'>
        <label htmlFor=''>OS AXIS</label>
        <select className='form-control' onChange={onChange} name='OsAxis'>
          <option>N/A</option>
          {axisGrades.map((gr) => (
            <option key={gr}>{gr}</option>
          ))}
        </select>
      </div>
      <div className='col-md-2'>
        <label htmlFor=''>OS ADD</label>
        <select className='form-control' onChange={onChange} name='OsAdd'>
          <option>N/A</option>
          {addGrades.map((gr) => (
            <option key={gr}>{gr}</option>
          ))}
        </select>
      </div>
      <div className='col-md-2'>
        <label htmlFor=''>OS PD</label>
        <input
          type='number'
          className='form-control'
          onChange={onChange}
          style={{ margin: '0' }}
          name='OsPd'
        />
      </div>
      <div className='col-md-2'>
        <label htmlFor=''>OS QTY</label>
        <input
          type='number'
          className='form-control'
          onChange={onChange}
          style={{ margin: '0' }}
          name='OsQty'
        />
      </div>
    </div>
  );
};

export default OsGrades;
