import React from 'react';
import _ from 'lodash';
import Select from 'react-select';
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
  console.log(ItemCategories);
  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const lensBrand = lens
    .filter((len) => len.orderTypeKey === OrderType)
    .map((br) => br.brandKey);

  const bulkLensBrand = _.filter(lens, ['orderTypeKey', 1]).map(
    (br) => br.brandKey
  );

  const fsBrand = _.filter(fs, ['supplyCategoryKey', ItemCategories]).map(
    (br) => br.brandKey
  );

  const csaBrand = _.filter(csa, ['scKey', parseInt(ItemCategories)]).map(
    (br) => br.brandKey
  );

  let optBrandLens = [];

  if (ItemCategories === 2) {
    let listLensId = lensBrand.filter(unique);
    let listBrandLens = [];

    for (let x = 0; x < listLensId.length; x++) {
      let findLensBrand = brands.find((brand) => brand.id === listLensId[x])
        .name;
      console.log(findLensBrand);
      listBrandLens.push(findLensBrand);
    }

    for (let i = 0; i < listLensId.length; i++) {
      let formattObj = {
        label: listBrandLens[i],
        value: listLensId[i],
      };
      optBrandLens.push(formattObj);
    }
    console.log(optBrandLens);
  }

  return (
    <div>
      {brands !== undefined && (
        <div className='form-group'>
          <label htmlFor='brand'>
            Brand<span style={{ color: 'red' }}>*</span>
          </label>
          <Select options={optBrandLens} onChange={onChange} />
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
