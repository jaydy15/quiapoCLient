import React, { useEffect } from 'react';
import { getOrderType } from './../../../../redux/order/orderActions';
import { connect } from 'react-redux';

const OrderTypes = ({ order: { orderType }, getOrderType, ...ownprops }) => {
  useEffect(() => {
    getOrderType();
  }, []);

  const { onChange, value } = ownprops;

  return (
    <div>
      {orderType !== null && (
        <div className='form-group'>
          <label htmlFor='orderType'>Order Type</label>
          <select onChange={onChange} className='form-control' name='OrderType'>
            <option>Select Order Type</option>
            {orderType.map((order) => (
              <option key={order.id} value={order.typeDesc}>
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
  order: state.order,
});

export default connect(mapStateToProps, { getOrderType })(OrderTypes);
