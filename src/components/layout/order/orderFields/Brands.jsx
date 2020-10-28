import React, { useEffect } from 'react';
import { getBrands } from './../../../../redux/order/orderActions';
import { connect } from 'react-redux';

const Brands = ({ order: { brand }, getBrands, ...ownprops }) => {
  useEffect(() => {
    getBrands();
  }, []);

  const { onChange, value } = ownprops;

  return (
    <div>
      {brand !== null && (
        <div className='form-group'>
          <label htmlFor='brand'>Brand</label>
          <select onChange={onChange} className='form-control' name='Brand'>
            <option>Select Brand</option>
            {brand.map((br) => (
              <option key={br.id} value={br.name}>
                {br.name}
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

export default connect(mapStateToProps, { getBrands })(Brands);
