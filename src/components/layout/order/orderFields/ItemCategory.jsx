import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const ItemCategory = ({ itemCategory, ...ownprops }) => {
  const { onChange, OrderType } = ownprops;

  let optSC = [];

  if (OrderType !== 2) {
    let listSC = itemCategory
      .filter((ic) => ic.id <= 2)
      .map((item) => item.desc);
    let listSCId = itemCategory
      .filter((ic) => ic.id <= 2)
      .map((item) => item.id);

    for (let i = 0; i < listSC.length; i++) {
      let formattObj = {
        label: listSC[i],
        value: listSCId[i],
      };
      optSC.push(formattObj);
    }
  } else {
    let listSC = itemCategory.map((item) => item.desc);
    let listSCId = itemCategory.map((item) => item.id);

    for (let i = 0; i < listSC.length; i++) {
      let formattObj = {
        label: listSC[i],
        value: listSCId[i],
      };
      optSC.push(formattObj);
    }
  }
  return (
    <div>
      {/* ITEM CATEGORY FOR JOB ORDER AND SPECIAL ORDER */}
      {OrderType !== 2 && itemCategory !== undefined && (
        <div className='form-group'>
          <label htmlFor='brand'>
            Item Category<span style={{ color: 'red' }}>*</span>
          </label>
          <Select options={optSC} onChange={onChange} />
          {/* <select
            onChange={onChange}
            className='form-control'
            name='ItemCategories'>
            <option>Select Item Category</option>
            {itemCategory
              .filter((ic) => {
                return ic.id <= 2;
              })
              .map((flic) => (
                <option key={flic.id} value={flic.id}>
                  {flic.desc}
                </option>
              ))}
          </select> */}
        </div>
      )}
      {/* BULK ORDER ITEM CATEGORY */}
      {OrderType === 2 && itemCategory !== undefined && (
        <div className='form-group'>
          <label htmlFor='brand'>Item Category</label>
          <Select options={optSC} onChange={onChange} />
          {/* <select
            onChange={onChange}
            className='form-control'
            name='ItemCategories'>
            <option>Select Item Category</option>
            {itemCategory.map((ic) => (
              <option key={ic.id} value={ic.id}>
                {ic.desc}
              </option>
            ))}
          </select> */}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  itemCategory: state.catalogue.supplyCategories,
});
export default connect(mapStateToProps)(ItemCategory);
