import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const FittingOptions = ({ setFormData, formData, Model, lensParam }) => {
  const listFit = lensParam
    .filter((lp) => lp.lensItemKey == Model)
    .map((lp) => lp);

  const optFitting = [];
  for (let i = 0; i < listFit.length; i++) {
    let formattObj = {
      label:
        listFit[i].maxSph +
        ' ' +
        listFit[i].minSph +
        ' | ' +
        listFit[i].maxCyl +
        ' ' +
        listFit[i].minCyl +
        ' | ' +
        listFit[i].minAdd +
        '  ' +
        listFit[i].maxAdd +
        ' | ' +
        listFit[i].fitting +
        ' | ' +
        listFit[i].totalPower,
      value: listFit[i].id,
    };
    optFitting.push(formattObj);
  }

  const switcher = listFit.length > 1;

  return (
    <div>
      {switcher && (
        <div className='form-group'>
          <label htmlFor='Model'>
            Fitting<span style={{ color: 'red' }}>*</span>
          </label>
          <Select
            name='OrderType'
            options={optFitting}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                LensParamId: selectedOption.value,
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  lensParam: state.catalogue.lensParam,
});

export default connect(mapStateToProps)(FittingOptions);
