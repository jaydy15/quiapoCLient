import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const ModelOptions = ({
  Brand,
  OrderType,
  setFormData,
  formData,
  ItemCategories,
  lensItems,
  brands,
  CAItems,
  FSItems,
  fscaModels,
  lists,
  RxNumber,
}) => {
  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const ModelFiller = (arrayName, arrayHolder) => {
    for (let x = 0; x < arrayName.length; x++) {
      const Obj = {
        label: arrayName[x].name,
        value: arrayName[x].id,
      };
      arrayHolder.push(Obj);
    }
  };

  const FSSAModelFiller = (arrayName, arrayHolder) => {
    if (isFrame) {
      for (let x = 0; x < arrayName.length; x++) {
        const Holder = fscaModels
          .filter((fsca) => fsca.id == arrayName[x].fsModelKey)
          .map((br) => br);
        const Obj = {
          label: Holder[0].modelDescription,
          value: arrayName[x].id,
        };
        arrayHolder.push(Obj);
      }
    } else if (isAccessories) {
      for (let x = 0; x < arrayName.length; x++) {
        const Holder = fscaModels
          .filter((fsca) => fsca.id == arrayName[x].csaModelKey)
          .map((br) => br);
        const Obj = {
          label: Holder[0].modelDescription,
          value: arrayName[x].id,
        };
        arrayHolder.push(Obj);
      }
    }
  };

  const isLens = ItemCategories == 1 || ItemCategories == 2;
  const isFrame = ItemCategories == 3 || ItemCategories == 4;
  const isAccessories = ItemCategories == 5 || ItemCategories == 6;

  const optLens = [];
  const optFs = [];
  const optCa = [];

  const lensModel = lensItems
    .filter((ls) => ls.brandKey == Brand)
    .filter((ls) => ls.orderTypeKey == OrderType)
    .map((ls) => ls);

  if (OrderType == 2) {
    const lensModel = lensItems
      .filter((ls) => ls.orderTypeKey === 1)
      .filter((ls) => ls.brandKey == Brand)
      .map((ls) => ls);
    ModelFiller(lensModel, optLens);
  }
  ModelFiller(lensModel, optLens);

  const FSModel = FSItems.filter((fs) => fs.brandKey == Brand)
    .filter((fs) => fs.supplyCategoryKey == ItemCategories)
    .map((fs) => fs);

  const SAModel = CAItems.filter((ca) => ca.brandKey == Brand)
    .filter((ca) => ca.scKey == ItemCategories)
    .map((ca) => ca);

  FSSAModelFiller(FSModel, optFs);
  FSSAModelFiller(SAModel, optCa);

  const isBulk =
    lists
      .filter((ls) => ls.OrderNumber == RxNumber)
      .map((ls) => ls.OrderTypes)
      .toString() === 'Bulk Order';

  return (
    <div>
      <div className='form-group'>
        <label htmlFor='Model'>
          Model<span style={{ color: 'red' }}>*</span>
        </label>
        {ItemCategories == '' && (
          <Select
            name='Model'
            options={[]}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Model: selectedOption.value,
              });
            }}
          />
        )}
        {ItemCategories == 1 && isBulk && (
          <Select
            name='Model'
            options={optLens}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Model: selectedOption.value,
                Color: '',
                LensParamId: '',
              });
            }}
          />
        )}
        {ItemCategories == 2 && isBulk && (
          <Select
            name='Model'
            options={optLens}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Model: selectedOption.value,
                Color: '',
                LensParamId: '',
              });
            }}
          />
        )}
        {isFrame && isBulk && (
          <Select
            name='Model'
            options={optFs}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Model: selectedOption.value,
                Color: '',
              });
            }}
          />
        )}
        {isAccessories && isBulk && (
          <Select
            name='Model'
            options={optCa}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Model: selectedOption.value,
                Color: '',
              });
            }}
          />
        )}
        {ItemCategories == 1 && !isBulk && (
          <Select
            name='Model'
            options={optLens}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Model: selectedOption.value,
                Color: '',
                LensParamId: '',
              });
            }}
          />
        )}
        {ItemCategories == 2 && !isBulk && (
          <Select
            name='Model'
            options={optLens}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Model: selectedOption.value,
                Color: '',
                LensParamId: '',
              });
            }}
          />
        )}
        {isFrame && !isBulk && (
          <Select
            name='Model'
            options={optFs}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Model: selectedOption.value,
                Color: '',
              });
            }}
          />
        )}
        {isAccessories && !isBulk && (
          <Select
            name='Model'
            options={optCa}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                Model: selectedOption.value,
                Color: '',
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
  fscaModels: state.catalogue.fscsaModels,
  lists: state.cart.lists,
});

export default connect(mapStateToProps)(ModelOptions);
