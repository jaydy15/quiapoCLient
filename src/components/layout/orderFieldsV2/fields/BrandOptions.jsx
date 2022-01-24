import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const BrandOptions = ({
  setFormData,
  formData,
  ItemCategories,
  lensItems,
  brands,
  CAItems,
  FSItems,
  OrderType,
  lists,
  RxNumber,
  propBrand,
  Model,
}) => {
  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const optLens = [];
  const optFrames = [];
  const optAccessories = [];

  const brandFiller = (arrayName, arrayHolder) => {
    for (let x = 0; x < arrayName.length; x++) {
      const Holder = brands
        .filter((br) => br.id === arrayName[x])
        .map((br) => br);
      const Obj = {
        label: Holder[0].name,
        value: Holder[0].id,
      };
      arrayHolder.push(Obj);
    }
  };

  const lensBrandID = lensItems
    .filter((ls) => ls.supplyCategoryKey == ItemCategories)
    .filter((ls) => ls.orderTypeKey == OrderType)
    .map((ls) => ls.brandKey)
    .filter(unique);

  if (OrderType == 2) {
    const lensBrandID = lensItems
      .filter((ls) => ls.supplyCategoryKey == ItemCategories)
      .filter((ls) => ls.orderTypeKey == 1)
      .map((ls) => ls.brandKey)
      .filter(unique);

    brandFiller(lensBrandID, optLens);
  }

  const SAID = CAItems.filter((sa) => sa.scKey == ItemCategories)
    .map((sa) => sa.brandKey)
    .filter(unique);

  const FSID = FSItems.filter((sa) => sa.supplyCategoryKey == ItemCategories)
    .map((sa) => sa.brandKey)
    .filter(unique);

  const isLens = ItemCategories == 1 || ItemCategories == 2;
  const isFrame = ItemCategories == 3 || ItemCategories == 4;
  const isAccessories = ItemCategories == 5 || ItemCategories == 6;

  const isBulk =
    lists
      .filter((ls) => ls.OrderNumber == RxNumber)
      .map((ls) => ls.OrderTypes)
      .toString() === 'Bulk Order';

  brandFiller(lensBrandID, optLens);

  brandFiller(FSID, optFrames);

  brandFiller(SAID, optAccessories);

  return (
    <div>
      <div className='form-group'>
        <label htmlFor='brand'>
          Brand<span style={{ color: 'red' }}>*</span>
        </label>
        {ItemCategories == '' && (
          <Select
            name='OrderType'
            options={[]}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Brand: selectedOption.value,
                Model: '',
              });
            }}
          />
        )}
        {isLens && isBulk && (
          <Select
            name='OrderType'
            options={optLens}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Brand: selectedOption.value,
                Model: '',
              });
            }}
          />
        )}
        {ItemCategories == 1 && !isBulk && (
          <Select
            name='OrderType'
            options={optLens}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Brand: selectedOption.value,
                Model: '',
              });
            }}
          />
        )}
        {ItemCategories == 2 && !isBulk && (
          <Select
            name='OrderType'
            options={optLens}
            defaultValue={optLens.find((ln) => ln.value == propBrand)}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Brand: selectedOption.value,
                Model: '',
              });
            }}
          />
        )}
        {isFrame && isBulk && (
          <Select
            name='OrderType'
            options={optFrames}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Brand: selectedOption.value,
                Model: '',
              });
            }}
          />
        )}

        {isAccessories && isBulk && (
          <Select
            name='OrderType'
            options={optAccessories}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Brand: selectedOption.value,
                Model: '',
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lensItems: state.catalogue.lensItems,
  brands: state.catalogue.brands,
  CAItems: state.catalogue.csaItems,
  FSItems: state.catalogue.fsItems,
  lists: state.cart.lists,
});

export default connect(mapStateToProps)(BrandOptions);
