import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const FittingOptions = ({
  setFormData,
  formData,
  Model,
  lensParam,
  field,
  propParam,
}) => {
  let holder = '';
  if (field == undefined) {
    holder = 'LensParamId';
  } else {
    holder = field;
  }

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

  return (
    <div>
      <div className='form-group'>
        <label htmlFor='Model'>
          Fitting<span style={{ color: 'red' }}>*</span>
        </label>
        <Select
          name={holder}
          options={optFitting}
          defaultValue={optFitting.find((ln) => ln.value == propParam)}
          onChange={(selectedOption, e) => {
            setFormData({
              ...formData,
              [e.name]: selectedOption.value,
            });
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lensParam: state.catalogue.lensParam,
});

export default connect(mapStateToProps)(FittingOptions);
