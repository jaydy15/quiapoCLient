import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { useForm } from 'react-hook-form';

const GradesOptions = ({
  setFormData,
  formData,
  Model,
  color,
  LensParamId,
  lensParam,
  lensItems,
  ItemCategories,
  onChange,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let maxSph, minSph, maxCyl, minCyl, maxAdd, minAdd;

  const switcher = ItemCategories == 1 || ItemCategories == 2;

  const lensFit = lensParam.filter((item) => item.lensItemKey === Model);
  if (lensFit.length > 1) {
    const arrayLensFitting = lensParam.filter(
      (item) => item.lensItemKey === Model && item.id === LensParamId
    );
    if (arrayLensFitting.length > 0) {
      maxSph = parseFloat(arrayLensFitting[0].maxSph);

      minSph = parseFloat(arrayLensFitting[0].minSph);
      maxCyl = parseFloat(arrayLensFitting[0].maxCyl);
      minCyl = parseFloat(arrayLensFitting[0].minCyl);
      maxAdd = parseFloat(arrayLensFitting[0].maxAdd);
      minAdd = parseFloat(arrayLensFitting[0].minAdd);
    }
  } else {
    if (lensFit[0]) {
      maxSph = parseFloat(lensFit[0].maxSph);
      minSph = parseFloat(lensFit[0].minSph);
      maxCyl = parseFloat(lensFit[0].maxCyl);
      minCyl = parseFloat(lensFit[0].minCyl);
      maxAdd = parseFloat(lensFit[0].maxAdd);
      minAdd = parseFloat(lensFit[0].minAdd);
    }
  }

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
    console.log(minSph, maxSph);
    if (minSph > maxSph) {
      for (let i = maxSph; i <= minSph; i = i + 0.25) {
        grades.push(gradify(i));
      }
      return grades;
    } else {
      for (let i = minSph; i <= maxSph; i = i + 0.25) {
        grades.push(gradify(i));
      }
      return grades;
    }
  };

  const cylLoad = () => {
    let grades = [];
    console.log(minCyl, maxCyl);
    if (minCyl < maxCyl) {
      for (let i = minCyl; i <= maxCyl; i = i + 0.25) {
        grades.push(gradify(i));
      }
      return grades;
    } else {
      for (let i = maxCyl; i <= minCyl; i = i + 0.25) {
        grades.push(gradify(i));
      }
      return grades;
    }
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
    for (let i = minAdd; i <= maxAdd; i = i + 0.25) {
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
    let zero = {
      value: 0,
      label: 'N/A',
    };
    optGrades.push(zero);
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

  console.log(errors);

  return (
    <Fragment>
      {switcher && (
        <Fragment>
          <h3>Grade Details</h3>

          {errors.OdQty && (
            <div className='alert alert-danger'>
              OD QTY SHOULD BE A MAXIMUM OF ONE ITEM
            </div>
          )}
          {errors.OsQty && (
            <div className='alert alert-danger'>
              OS QTY SHOULD BE A MAXIMUM OF ONE ITEM
            </div>
          )}
          <div className='row'>
            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OD SPH</label>
                <Select
                  options={optSph}
                  defaultValue={{ label: 'N/A', value: 0 }}
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      OdSph: selectedOption.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OD CYL</label>
                <Select
                  options={optCyl}
                  defaultValue={{ label: 'N/A', value: 0 }}
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      OdCyl: selectedOption.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OD AXIS</label>
                <Select
                  options={optAxis}
                  defaultValue={{ label: 'N/A', value: 0 }}
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      OdAxis: selectedOption.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OD ADD</label>
                <Select
                  options={optAdd}
                  defaultValue={{ label: 'N/A', value: 0 }}
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      OdAdd: selectedOption.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OD PD</label>
                <input
                  type='number'
                  className='form-control'
                  style={{ margin: '0' }}
                  name='OdPd'
                  onChange={onChange}
                />
              </div>
            </div>

            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OD QTY LENS</label>
                <input
                  ref={register({ min: 0, max: 1 })}
                  type='number'
                  className='form-control'
                  style={{ margin: '0' }}
                  name='OdQty'
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OS SPH</label>
                <Select
                  options={optSph}
                  defaultValue={{ label: 'N/A', value: 0 }}
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      OsSph: selectedOption.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OS CYL</label>
                <Select
                  options={optCyl}
                  defaultValue={{ label: 'N/A', value: 0 }}
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      OsCyl: selectedOption.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OS AXIS</label>
                <Select
                  options={optAxis}
                  defaultValue={{ label: 'N/A', value: 0 }}
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      OsAxis: selectedOption.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OS ADD</label>
                <Select
                  options={optAdd}
                  defaultValue={{ label: 'N/A', value: 0 }}
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      OsAdd: selectedOption.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OS PD</label>
                <input
                  type='number'
                  className='form-control'
                  style={{ margin: '0' }}
                  name='OsPd'
                  onChange={onChange}
                />
              </div>
            </div>

            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OS QTY LENS</label>
                <input
                  type='number'
                  className='form-control'
                  style={{ margin: '0' }}
                  name='OsQty'
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  color: state.catalogue.colors,
  lensItems: state.catalogue.lensItems,
  lensParam: state.catalogue.lensParam,
  CAItems: state.catalogue.csaItems,
  FSItems: state.catalogue.fsItems,
});

export default connect(mapStateToProps)(GradesOptions);
