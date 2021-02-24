import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const OrderTypes = ({ orderTypes, lists, RxNumber, ...ownprops }) => {
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
          <Select options={optOrderType} onChange={onChange} />
          {/* <select onChange={onChange} className='form-control' name='OrderType'>
            <option>Select Order Type</option>
            {selected === 'Non Bulk Order' &&
              orderTypes
                .filter((or) => or.id === 1 || or.id === 3)
                .map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.typeDesc}
                  </option>
                ))}
            {selected === 'Bulk Order' &&
              orderTypes
                .filter((or) => or.id === 2)
                .map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.typeDesc}
                  </option>
                ))}
          </select> */}
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
