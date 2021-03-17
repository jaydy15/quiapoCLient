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

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const lensBrand = lens
    .filter((len) => len.orderTypeKey === OrderType)
    .map((br) => br.brandKey);

  const bulkLensBrand = lens
    .filter((len) => len.orderTypeKey === 1)
    .map((br) => br.brandKey);

  const fsBrand = _.filter(fs, ['supplyCategoryKey', ItemCategories]).map(
    (br) => br.brandKey
  );

  const csaBrand = _.filter(csa, ['scKey', parseInt(ItemCategories)]).map(
    (br) => br.brandKey
  );

  let optBrandLens,
    optBrandCSA = [];
  // LENS ITEM BRANDS
  if (ItemCategories === 2) {
    let listLensId;
    if (OrderType === 2) {
      listLensId = bulkLensBrand.filter(unique);
    } else {
      listLensId = lensBrand.filter(unique);
    }
    let listBrandLens = [];

    for (let x = 0; x < listLensId.length; x++) {
      let findLensBrand = brands.find((brand) => brand.id === listLensId[x])
        .name;
      listBrandLens.push(findLensBrand);
    }

    for (let i = 0; i < listLensId.length; i++) {
      let formattObj = {
        label: listBrandLens[i],
        value: listLensId[i],
      };
      optBrandCSA.push(formattObj);
    }
  }
  // ENDING OF LENS ITEM BRANDS
  else if (
    ItemCategories === 1 ||
    ItemCategories === 5 ||
    ItemCategories === 6
  ) {
    let listCSAId = csaBrand.filter(unique);
    let listBrandCSA = [];
    for (let x = 0; x < listCSAId.length; x++) {
      let findCSABrand = brands.find((brand) => brand.id === listCSAId[x]).name;

      listBrandCSA.push(findCSABrand);
    }

    for (let i = 0; i < listCSAId.length; i++) {
      let formattObj = {
        label: listBrandCSA[i],
        value: listCSAId[i],
      };
      optBrandCSA.push(formattObj);
    }
  }
  return (
    <div>
      {ItemCategories ? null : (
        <div className='form-group'>
          <label htmlFor='brand'>
            Brand<span style={{ color: 'red' }}>*</span>
          </label>
          <Select options={optBrandCSA} onChange={onChange} />
        </div>
      )}
      {ItemCategories === 2 && OrderType === 1 && (
        <div className='form-group'>
          <label htmlFor='brand'>
            Brand<span style={{ color: 'red' }}>*</span>
          </label>
          <Select options={optBrandCSA} onChange={onChange} />
        </div>
      )}
      {ItemCategories === 2 && OrderType === 3 && (
        <div className='form-group'>
          <label htmlFor='brand'>
            Brand<span style={{ color: 'red' }}>*</span>
          </label>
          <Select options={optBrandCSA} onChange={onChange} />
        </div>
      )}
      {(ItemCategories === 1 || ItemCategories === 5 || ItemCategories === 6) &&
        OrderType === 1 && (
          <div className='form-group'>
            <label htmlFor='brand'>
              Brand<span style={{ color: 'red' }}>*</span>
            </label>
            <Select options={optBrandCSA} onChange={onChange} />
          </div>
        )}
      {(ItemCategories === 1 || ItemCategories === 5 || ItemCategories === 6) &&
        OrderType === 3 && (
          <div className='form-group'>
            <label htmlFor='brand'>
              Brand<span style={{ color: 'red' }}>*</span>
            </label>
            <Select options={optBrandCSA} onChange={onChange} />
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
