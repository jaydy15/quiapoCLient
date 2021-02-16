import React from 'react';
import _ from 'lodash';

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
  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const lensBrand = _.filter(lens, ['orderTypeKey', parseInt(OrderType)]).map(
    (br) => br.brandKey
  );
  const bulkLensBrand = _.filter(lens, ['orderTypeKey', 1]).map(
    (br) => br.brandKey
  );

  const fsBrand = _.filter(fs, ['supplyCategoryKey', ItemCategories]).map(
    (br) => br.brandKey
  );

  const csaBrand = _.filter(csa, ['scKey', parseInt(ItemCategories)]).map(
    (br) => br.brandKey
  );

  console.log(csaBrand.filter(unique));
  return (
    <div>
      {brands !== undefined && (
        <div className='form-group'>
          <label htmlFor='brand'>Brand</label>
          <select onChange={onChange} className='form-control' name='Brand'>
            <option>Select Brand</option>

            {/* LENS BRANDS */}
            {ItemCategories === '2' &&
              lensBrand.filter(unique).map((br) => (
                <option key={br} value={br}>
                  {brands.find((elm) => elm.id === br).name}
                </option>
              ))}
            {ItemCategories === '2' &&
              OrderType === '2' &&
              bulkLensBrand.filter(unique).map((br) => (
                <option key={br} value={br}>
                  {brands.find((elm) => elm.id === br).name}
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
              csaBrand.filter(unique).map((br) => (
                <option key={br} value={br}>
                  {brands.find((elm) => elm.id === br).name}
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
