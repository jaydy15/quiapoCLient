import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const NonLensDetails = ({
  units,
  onChange,
  setFormData,
  formData,
  ItemCategories,
}) => {
  const switcher =
    ItemCategories == 3 ||
    ItemCategories == 4 ||
    ItemCategories == 5 ||
    ItemCategories == 6;

  const unts = units.map((un) => un);

  const optUnits = [];

  for (let x = 0; x < unts.length; x++) {
    const obj = {
      label: unts[x].desc,
      value: unts[x].id,
    };
    optUnits.push(obj);
  }

  return (
    <Fragment>
      {switcher && (
        <div className='row'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor=''>Non Lens Qty</label>
              <input type='text' name='NonLensQty' onChange={onChange} />
            </div>
          </div>

          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='Model'>
                Unit Name<span style={{ color: 'red' }}>*</span>
              </label>
              <Select
                name='nonLensUnitName'
                options={optUnits}
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    nonLensUnitName: selectedOption.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  units: state.catalogue.units,
});

export default connect(mapStateToProps)(NonLensDetails);
