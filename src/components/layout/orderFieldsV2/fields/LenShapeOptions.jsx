import React, { useState, Fragment, createContext } from 'react';
import { connect } from 'react-redux';

const LenShapeOptions = ({
  setFormData,
  formData,
  frmshp,
  OrderType,
  ItemCategories,
  propLenShape,
}) => {
  console.log(propLenShape);
  const switcher = OrderType == 3 && ItemCategories == 2;

  const [holder, setHolder] = useState('');

  const optFrmShp = [];

  const type = frmshp.filter((ft) => ft.type == 0).map((ft) => ft);

  const len = type.find((ty) => ty.id === propLenShape);

  let labelHolder;

  if (propLenShape) {
    labelHolder = len.desc;
  } else {
    labelHolder = holder;
  }

  if (type) {
    for (let x = 0; x < type.length; x++) {
      const obj = {
        label: type[x].desc,
        value: type[x].id,
      };
      optFrmShp.push(obj);
    }
  }

  const onClickImage = (num) => {
    setFormData({
      ...formData,
      LenShape: optFrmShp[num].value,
    });
    setHolder(optFrmShp[num].label);
  };

  return (
    <Fragment>
      {switcher && (
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <label htmlFor=''>Frame Shape</label>
                <input type='text' disabled value={labelHolder} />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-m-3' style={{ padding: '10px' }}>
              <button type='button' onClick={() => onClickImage(0)}>
                <img
                  src='/images/OBLONG.jpg'
                  alt=''
                  style={{ width: '300px', height: '290px' }}
                />
              </button>
            </div>
            <div className='col-p-3' style={{ padding: '10px' }}>
              <button type='button' onClick={() => onClickImage(1)}>
                <img
                  src='/images/OVAL.jpg'
                  alt=''
                  style={{ width: '300px', height: '290px' }}
                />
              </button>
            </div>
            <div className='col-p-3' style={{ padding: '10px' }}>
              <button type='button' onClick={() => onClickImage(2)}>
                <img
                  src='/images/AVIATOR.jpg'
                  alt=''
                  style={{ width: '300px', height: '290px' }}
                />
              </button>
            </div>
            <div className='col-p-3' style={{ padding: '10px' }}>
              <button type='button' onClick={() => onClickImage(3)}>
                <img
                  src='/images/CAT_EYE.jpg'
                  alt=''
                  style={{ width: '300px', height: '290px' }}
                />
              </button>
            </div>
            <div className='col-p-3' style={{ padding: '10px' }}>
              <button type='button' onClick={() => onClickImage(4)}>
                <img
                  src='/images/SYMMETRICAL.jpg'
                  alt=''
                  style={{ width: '300px', height: '290px' }}
                />
              </button>
            </div>
            <div className='col-p-3' style={{ padding: '10px' }}>
              <button type='button' onClick={() => onClickImage(5)}>
                <img
                  src='/images/CUT_AWAY_RECTANGLE.jpg'
                  alt=''
                  style={{ width: '300px', height: '290px' }}
                />
              </button>
            </div>
            <div className='col-p-3' style={{ padding: '10px' }}>
              <button type='button' onClick={() => onClickImage(6)}>
                <img
                  src='/images/RECTANGLE.jpg'
                  alt=''
                  style={{ width: '300px', height: '290px' }}
                />
              </button>
            </div>
            <div className='col-p-3' style={{ padding: '10px' }}>
              <button type='button' onClick={() => onClickImage(7)}>
                <img
                  src='/images/CUT_AWAY_OVAL.jpg'
                  alt=''
                  style={{ width: '300px', height: '290px' }}
                />
              </button>
            </div>
            <div className='col-p-3' style={{ padding: '10px' }}>
              <button type='button' onClick={() => onClickImage(8)}>
                <img
                  src='/images/SHARP_RECTANGLE.jpg'
                  alt=''
                  style={{ width: '300px', height: '290px' }}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  frmshp: state.catalogue.generalEnums,
});

export default connect(mapStateToProps)(LenShapeOptions);
