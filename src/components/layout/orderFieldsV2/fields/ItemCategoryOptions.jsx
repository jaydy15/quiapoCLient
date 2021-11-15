import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const ItemCategoryOptions = ({
  lists,
  setFormData,
  formData,
  RxNumber,
  ortyp,
  itmcat,
}) => {
  const isBulk =
    lists
      .filter((ls) => ls.OrderNumber == RxNumber)
      .map((ls) => ls.OrderTypes)
      .toString() === 'Bulk Order';

  const optItemCategory = [];
  if (isBulk) {
    const opt = itmcat.map((itm) => itm);
    for (let i = 0; i < opt.length; i++) {
      let formattObj = {
        label: opt[i].desc,
        value: opt[i].id,
      };
      optItemCategory.push(formattObj);
    }
  }
  if (!isBulk) {
    const opt = itmcat.map((itm) => itm);
    for (let i = 0; i < 2; i++) {
      let formattObj = {
        label: opt[i].desc,
        value: opt[i].id,
      };
      optItemCategory.push(formattObj);
    }
  }

  return (
    <div>
      <div className='form-group'>
        <label htmlFor='brand'>
          Item Category<span style={{ color: 'red' }}>*</span>
        </label>
        {isBulk && (
          <Select
            name='OrderType'
            options={optItemCategory}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                ItemCategories: selectedOption.value,
                Brand: '',
                Model: '',
                Color: '',
              });
            }}
          />
        )}
        {!isBulk && (
          <Select
            name='OrderType'
            options={optItemCategory}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                ItemCategories: selectedOption.value,
                Brand: '',
                Model: '',
                Color: '',
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lists: state.cart.lists,
  ortyp: state.catalogue.orderTypes,
  itmcat: state.catalogue.supplyCategories,
});

export default connect(mapStateToProps)(ItemCategoryOptions);
