import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const OrderTypes = ({ orderTypes, lists, RxNumber, ...ownprops }) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState(Math.random()), []);
  useEffect(() => {
    forceUpdate();
  }, []);
  const { onChange } = ownprops;
  const selected = lists
    .filter((num) => num.OrderNumber.toString() === RxNumber)
    .map((elm) => elm.OrderTypes)
    .toString();
  let optOrderType = [];

  if (selected === 'Non Bulk Order') {
    let listOrderType = orderTypes
      .filter((or) => or.id === 1 || or.id === 3)
      .map((item) => item.typeDesc);
    let listOrderId = orderTypes
      .filter((or) => or.id === 1 || or.id === 3)
      .map((item) => item.id);

    for (let i = 0; i < listOrderType.length; i++) {
      let formattObj = {
        label: listOrderType[i],
        value: listOrderId[i],
      };
      optOrderType.push(formattObj);
    }
  } else {
    let listOrderType = orderTypes
      .filter((or) => or.id === 2)
      .map((item) => item.typeDesc);
    let listOrderId = orderTypes
      .filter((or) => or.id === 2)
      .map((item) => item.id);

    for (let i = 0; i < listOrderType.length; i++) {
      let formattObj = {
        label: listOrderType[i],
        value: listOrderId[i],
      };
      optOrderType.push(formattObj);
    }
  }

  return (
    <div>
      {orderTypes !== undefined && (
        <div className='form-group'>
          <label htmlFor='orderType'>
            Order Type<span style={{ color: 'red' }}>*</span>
          </label>
          {selected ? null : (
            <Select
              options={optOrderType}
              onChange={onChange}
              placeholder='Select Order Type'
            />
          )}
          {selected === 'Non Bulk Order' && (
            <Select
              options={optOrderType}
              onChange={onChange}
              placeholder='Select Order Type'
            />
          )}
          {selected === 'Bulk Order' && (
            <Select
              options={optOrderType}
              onChange={onChange}
              placeholder='Select Order Type'
            />
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  orderTypes: state.catalogue.orderTypes,
  lists: state.cart.lists,
});

export default connect(mapStateToProps)(OrderTypes);
