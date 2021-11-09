import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

const Models = ({
  model,
  ItemCategories,
  lens,
  Brand,
  fs,
  csa,
  OrderType,
  ...ownprops
}) => {
  const { onChange } = ownprops;

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  let optLensModel = [];
  let optCSAModel = [];
  let optFSModel = [];

  // LENS ITEM BRANDS
  if (ItemCategories === 2) {
    let listLensId;
    let listBrandLens;
    if (OrderType === 2) {
      listLensId = lens
        .filter((lens) => lens.orderTypeKey === 1)
        .filter((lens) => lens.brandKey === Brand)
        .map((md) => md.id);
      listBrandLens = lens
        .filter((lens) => lens.orderTypeKey === 1)
        .filter((lens) => lens.brandKey === Brand)
        .map((md) => md.name);
    } else {
      listLensId = lens
        .filter((lens) => lens.orderTypeKey === OrderType)
        .filter((lens) => lens.brandKey === Brand)
        .map((md) => md.id);
      listBrandLens = lens
        .filter((lens) => lens.orderTypeKey === OrderType)
        .filter((lens) => lens.brandKey === Brand)
        .map((md) => md.name);
    }

    for (let i = 0; i < listLensId.length; i++) {
      let formattObj = {
        label: listBrandLens[i],
        value: listLensId[i],
      };

      optLensModel.push(formattObj);
    }
  } else if (
    ItemCategories === 1 ||
    ItemCategories === 5 ||
    ItemCategories === 6
  ) {
    let listCSAModelKey = csa
      .filter((csa) => csa.scKey === ItemCategories)
      .filter((csa) => csa.brandKey === Brand)
      .map((md) => md.csaModelKey);
    let listCSAId = csa
      .filter((csa) => csa.scKey === ItemCategories)
      .filter((csa) => csa.brandKey === Brand)
      .map((md) => md.id);

    let listBrandCSA = [];
    for (let x = 0; x < listCSAId.length; x++) {
      let findCSAModel = model.find(
        (elm) => elm.id === listCSAModelKey[x]
      ).modelName;

      listBrandCSA.push(findCSAModel);
    }

    for (let i = 0; i < listCSAId.length; i++) {
      let formattObj = {
        label: listBrandCSA[i],
        value: listCSAId[i],
      };
      optCSAModel.push(formattObj);
    }
  } else if (ItemCategories === 3 || ItemCategories === 4) {
    let listFSKey = fs
      .filter((fs) => fs.supplyCategoryKey === ItemCategories)
      .filter((fs) => fs.brandKey === Brand)
      .map((md) => md.fsModelKey);
    let listFSId = fs
      .filter((fs) => fs.supplyCategoryKey === ItemCategories)
      .filter((fs) => fs.brandKey === Brand)
      .map((md) => md.id);

    let listBrandFS = [];
    for (let x = 0; x < listFSId.length; x++) {
      let findFSModel = model.find((elm) => elm.id === listFSKey[x]).modelName;

      listBrandFS.push(findFSModel);
    }

    for (let i = 0; i < listFSId.length; i++) {
      let formattObj = {
        label: listBrandFS[i],
        value: listFSId[i],
      };
      optFSModel.push(formattObj);
    }
  }
  const options = {};
  let finalOpt = [];
  if (ItemCategories === 2) {
    finalOpt = optLensModel;
  } else if (
    ItemCategories === 1 ||
    ItemCategories === 5 ||
    ItemCategories === 6
  ) {
    finalOpt = optCSAModel;
  } else if (ItemCategories === 3 || ItemCategories === 4) {
    finalOpt = optFSModel;
  }
  return (
    <div>
      {Brand ? null : (
        <div className='form-group'>
          <label htmlFor='brand'>
            Model<span style={{ color: 'red' }}>*</span>
          </label>
          <Select options={finalOpt} onChange={onChange} />
        </div>
      )}
      {OrderType === 1 && ItemCategories === 2 && Brand && (
        <div className='form-group'>
          <label htmlFor='brand'>
            Model<span style={{ color: 'red' }}>*</span>
          </label>
          <Select options={finalOpt} onChange={onChange} />
        </div>
      )}
      {OrderType === 1 && ItemCategories === 1 && Brand && (
        <div className='form-group'>
          <label htmlFor='brand'>
            Model<span style={{ color: 'red' }}>*</span>
          </label>
          <Select options={finalOpt} onChange={onChange} />
        </div>
      )}
      {OrderType === 3 && ItemCategories === 2 && Brand && (
        <div className='form-group'>
          <label htmlFor='brand'>
            Model<span style={{ color: 'red' }}>*</span>
          </label>
          <Select options={finalOpt} onChange={onChange} />
        </div>
      )}
      {OrderType === 3 && ItemCategories === 1 && (
        <div className='form-group'>
          <label htmlFor='brand'>
            Model<span style={{ color: 'red' }}>*</span>
          </label>
          <Select options={finalOpt} onChange={onChange} />
        </div>
      )}
      {OrderType === 2 && ItemCategories <= 6 && Brand && (
        <div className='form-group'>
          <label htmlFor='brand'>
            Model<span style={{ color: 'red' }}>*</span>
          </label>
          <Select options={finalOpt} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  model: state.catalogue.fscsaModels,
  lens: state.catalogue.lensItems,
  fs: state.catalogue.fsItems,
  csa: state.catalogue.csaItems,
});

export default connect(mapStateToProps)(Models);
