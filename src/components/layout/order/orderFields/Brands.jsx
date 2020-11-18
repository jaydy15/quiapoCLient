import React from 'react';

import { connect } from 'react-redux';

const Brands = ({ brands, ...ownprops }) => {
  const { onChange } = ownprops;

  return (
    <div>
      {brands !== undefined && (
        <div className='form-group'>
          <label htmlFor='brand'>Brand</label>
          <select onChange={onChange} className='form-control' name='Brand'>
            <option>Select Brand</option>
            {brands.map((br) => (
              <option key={br.id} value={br.id}>
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
  brands: state.catalogue.brands,
});

export default connect(mapStateToProps)(Brands);
