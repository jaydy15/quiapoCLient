import React from 'react';
import { connect } from 'react-redux';

const OrderTypes = ({ orderTypes, lists, RxNumber, ...ownprops }) => {
  const { onChange } = ownprops;

  const selected = lists
    .filter((num) => num.OrderNumber.toString() === RxNumber)
    .map((elm) => elm.OrderTypes)
    .toString();
  console.log(selected);
  return (
    <div>
      {orderTypes !== undefined && (
        <div className='form-group'>
          <label htmlFor='orderType'>Order Type</label>
          <select onChange={onChange} className='form-control' name='OrderType'>
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
          </select>
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
