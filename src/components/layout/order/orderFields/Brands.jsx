import React from 'react';

import { connect } from 'react-redux';

const Brands = ({
  brands,
  ItemCategories,
  lens,
  fs,
  csa,
  OrderType,
  ...ownprops
}) => {
  const { onChange } = ownprops;
  return (
    <div>
      {brands !== undefined && (
        <div className='form-group'>
          <label htmlFor='brand'>Brand</label>
          <select onChange={onChange} className='form-control' name='Brand'>
            <option>Select Brand</option>
            {/* LENS BRANDS */}
            {ItemCategories === '2' &&
              lens
                .filter((lens) => lens.orderTypeKey.toString() === OrderType)
                .map((br) => (
                  <option key={br.id} value={br.brandKey}>
                    {brands.find((elm) => elm.id === br.brandKey).name}
                  </option>
                ))}
            {ItemCategories === '2' &&
              OrderType === '2' &&
              lens
                .filter((lens) => lens.orderTypeKey.toString() === '1')
                .map((br) => (
                  <option key={br.id} value={br.brandKey}>
                    {brands.find((elm) => elm.id === br.brandKey).name}
                  </option>
                ))}
            {/* LENS BRANDS */}
            {/* FS BRANDS */}
            {(ItemCategories === '3' || ItemCategories === '4') &&
              fs
                .filter(
                  (fs) => fs.supplyCategoryKey.toString() === ItemCategories
                )
                .map((br) => (
                  <option key={br.id} value={br.brandKey}>
                    {brands.find((elm) => elm.id === br.brandKey).name}
                  </option>
                ))}
            {/* FS BRANDS */}
            {/* CSA BRANDS */}
            {(ItemCategories === '1' ||
              ItemCategories === '5' ||
              ItemCategories === '6') &&
              csa
                .filter((csa) => csa.scKey.toString() === ItemCategories)
                .filter((csa) => csa.orderTypeKey.toString() === OrderType)
                .map((br) => (
                  <option key={br.id} value={br.brandKey}>
                    {brands.find((elm) => elm.id === br.brandKey).name}
                  </option>
                ))}
            {ItemCategories === '1' &&
              OrderType === '2' &&
              csa
                .filter((csa) => csa.scKey.toString() === ItemCategories)
                .filter((csa) => csa.orderTypeKey.toString() === '1')
                .map((br) => (
                  <option key={br.id} value={br.brandKey}>
                    {brands.find((elm) => elm.id === br.brandKey).name}
                  </option>
                ))}

            {/* CSA BRANDS */}
          </select>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  brands: state.catalogue.brands,
  fs: state.catalogue.fsItems,
  csa: state.catalogue.csaItems,
  lens: state.catalogue.lensItems,
});

export default connect(mapStateToProps)(Brands);
