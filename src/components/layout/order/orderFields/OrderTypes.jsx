import React from 'react';
import { connect } from 'react-redux';

const OrderTypes = ({ orderTypes, ...ownprops }) => {
  const { onChange } = ownprops;

  return (
    <div>
      {orderTypes !== undefined && (
        <div className='form-group'>
          <label htmlFor='orderType'>Order Type</label>
          <select onChange={onChange} className='form-control' name='OrderType'>
            <option>Select Order Type</option>
            {orderTypes.map((order) => (
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
});

export default connect(mapStateToProps)(OrderTypes);
