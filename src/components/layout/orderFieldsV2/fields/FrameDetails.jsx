import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const FrameDetails = ({
  setFormData,
  formData,
  frametyp,
  onChange,
  OrderType,
  ItemCategories,
}) => {
  const switcher = OrderType == 3 && ItemCategories == 2;
  const optFrmTyp = [];
  const type = frametyp.filter((ft) => ft.type == 1).map((ft) => ft);
  if (type) {
    for (let x = 0; x < type.length; x++) {
      const obj = {
        label: type[x].desc,
        value: type[x].id,
      };
      optFrmTyp.push(obj);
    }
  }
  return (
    <Fragment>
      {switcher && (
        <div>
          <h3>SO Details</h3>
          <div className='row'>
            <div className='col-md-3'>
              <div className='form-group'>
                <label htmlFor=''>
                  Horizontal<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  name='Horizontal'
                  onChange={onChange}
                />
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label htmlFor=''>
                  Vertical<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  name='Vertical'
                  onChange={onChange}
                />
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label htmlFor=''>
                  Bridge<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  name='Bridge'
                  onChange={onChange}
                />
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label htmlFor='Model'>
                  Frame Type<span style={{ color: 'red' }}>*</span>
                </label>
                <Select
                  name='FrameType'
                  options={optFrmTyp}
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      FrameType: selectedOption.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  frametyp: state.catalogue.generalEnums,
});

export default connect(mapStateToProps)(FrameDetails);
