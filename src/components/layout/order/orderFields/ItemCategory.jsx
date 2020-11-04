import React from 'react';
import { connect } from 'react-redux';

const ItemCategory = ({ itemCategory, ...ownprops }) => {
  const { onChange, OrderType } = ownprops;
  return (
    <div>
      {/* ITEM CATEGORY FOR JOB ORDER AND SPECIAL ORDER */}
      {OrderType !== 'BULK ORDER' && itemCategory !== undefined && (
        <div className='form-group'>
          <label htmlFor='brand'>Item Category</label>
          <select
            onChange={onChange}
            className='form-control'
            name='ItemCategories'>
            <option>Select Item Category</option>
            {itemCategory
              .filter((ic) => {
                return ic.id <= 2;
              })
              .map((flic) => (
                <option key={flic.id}>{flic.desc}</option>
              ))}
          </select>
        </div>
      )}
      {/* BULK ORDER ITEM CATEGORY */}
      {OrderType === 'BULK ORDER' && itemCategory !== undefined && (
        <div className='form-group'>
          <label htmlFor='brand'>Item Category</label>
          <select
            onChange={onChange}
            className='form-control'
            name='ItemCategories'>
            <option>Select Item Category</option>
            {itemCategory.map((ic) => (
              <option key={ic.id} value={ic.desc}>
                {ic.desc}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  itemCategory: state.catalogue.supplyCategories,
});
export default connect(mapStateToProps)(ItemCategory);
