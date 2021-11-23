import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import FittingOptions from './FittingOptions';
import ColorOptions from './ColorOptions';

const OdOptions = ({
  setFormData,
  formData,
  Model,
  LensParamId,
  lensParam,
  ItemCategories,
  onChange,
  lensParamCounter,
  LensParamIdOd,
  OdSph,
  OdCyl,
  OdAxis,
  OdAdd,
  OdPd,
  OdQty,
}) => {
  let maxSph, minSph, maxCyl, minCyl, maxAdd, minAdd;

  const switcher = ItemCategories == 1 || ItemCategories == 2;

  const lensFit = lensParam.filter((item) => item.lensItemKey === Model);
  if (lensFit.length > 1) {
    const arrayLensFitting = lensParam.filter(
      (item) => item.lensItemKey === Model && item.id === LensParamIdOd
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

  return (
    <Fragment>
      {switcher && (
        <Fragment>
          <h3>Grade Details New</h3>

          {lensParamCounter > 1 && (
            <div className='row'>
              <div className='col-md-6'>
                <FittingOptions
                  setFormData={setFormData}
                  formData={formData}
                  Model={Model}
                  field='LensParamIdOd'
                />
              </div>
              <div className='col-md-4'>
                <ColorOptions
                  setFormData={setFormData}
                  formData={formData}
                  Model={Model}
                  ItemCategories={ItemCategories}
                  LensParamId={LensParamIdOd}
                />
              </div>
            </div>
          )}

          <div className='row'>
            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OD SPH</label>
                <Select
                  name={OdSph}
                  options={optSph}
                  defaultValue={{ label: 'N/A', value: 0 }}
                  onChange={(selectedOption, e) => {
                    setFormData({
                      ...formData,
                      [e.name]: selectedOption.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OD CYL</label>
                <Select
                  name={OdCyl}
                  options={optCyl}
                  defaultValue={{ label: 'N/A', value: 0 }}
                  onChange={(selectedOption, e) => {
                    setFormData({
                      ...formData,
                      [e.name]: selectedOption.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OD AXIS</label>
                <Select
                  name={OdAxis}
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
                  name={OdAdd}
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
                  type='text'
                  className='form-control'
                  style={{ margin: '0' }}
                  name={OdPd}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className='col-md-2'>
              <div className='form-group'>
                <label htmlFor=''>OD QTY LENS</label>
                <input
                  type='text'
                  className='form-control'
                  style={{ margin: '0' }}
                  name={OdQty}
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

export default connect(mapStateToProps)(OdOptions);
