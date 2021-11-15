import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const OrderTypeOptions = ({
  lists,
  setFormData,
  formData,
  RxNumber,
  ortyp,
}) => {
  const isBulk =
    lists
      .filter((ls) => ls.OrderNumber == RxNumber)
      .map((ls) => ls.OrderTypes)
      .toString() === 'Bulk Order';

  const optOrderTypes = [];
  if (isBulk) {
    const opt = ortyp.filter((oty) => oty.id == 2).map((oty) => oty);
    const obj = {
      label: opt[0].typeDesc,
      value: opt[0].id,
    };
    optOrderTypes.push(obj);
  }

  if (!isBulk) {
    const opt2 = ortyp.filter((oty2) => oty2.id !== 2).map((oty2) => oty2);
    for (let i = 0; i < opt2.length; i++) {
      let formattObj = {
        label: opt2[i].typeDesc,
        value: opt2[i].id,
      };
      optOrderTypes.push(formattObj);
    }
  }

  return (
    <div>
      <div className='form-group'>
        <label htmlFor='brand'>
          Order Type<span style={{ color: 'red' }}>*</span>
        </label>
        {isBulk && (
          <Select
            name='OrderType'
            options={optOrderTypes}
            onChange={(selectedOption) => {
              setFormData({ ...formData, OrderType: selectedOption.value });
            }}
          />
        )}
        {!isBulk && (
          <Select
            name='OrderType'
            options={optOrderTypes}
            onChange={(selectedOption) => {
              setFormData({ ...formData, OrderType: selectedOption.value });
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
});

export default connect(mapStateToProps)(OrderTypeOptions);
