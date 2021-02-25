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

  let optLensModel = [];
  let optCSAModel = [];
  console.log(ItemCategories);
  // LENS ITEM BRANDS
  if (ItemCategories === 2) {
    let listLensId;
    let listBrandLens;
    if (OrderType === 2) {
      listLensId = lens
        .filter((lens) => lens.orderTypeKey === OrderType)
        .filter((lens) => lens.brandKey === Brand)
        .map((md) => md.id);
      listBrandLens = lens
        .filter((lens) => lens.orderTypeKey === OrderType)
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
      console.log(optLensModel);
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
    console.log(listCSAId);
    let listBrandCSA = [];
    for (let x = 0; x < listCSAId.length; x++) {
      let findCSAModel = model.find((elm) => elm.id === listCSAModelKey[x])
        .modelName;
      console.log(findCSAModel);
      listBrandCSA.push(findCSAModel);
    }

    for (let i = 0; i < listCSAId.length; i++) {
      let formattObj = {
        label: listBrandCSA[i],
        value: listCSAId[i],
      };
      optCSAModel.push(formattObj);
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
  }
  return (
    <div>
      {model !== undefined && (
        <div className='form-group'>
          <label htmlFor='brand'>
            Model<span style={{ color: 'red' }}>*</span>
          </label>
          <Select options={finalOpt} onChange={onChange} />
          {/* <select onChange={onChange} className='form-control' name='Model'>
            <option>Select Model</option>
            {ItemCategories === 2 &&
              lens
                .filter((lens) => lens.orderTypeKey === OrderType)
                .filter((lens) => lens.brandKey === Brand)
                .map((md) => (
                  <option key={md.id} value={md.id}>
                    {md.name}
                  </option>
                ))}
            {ItemCategories === 2 &&
              OrderType === 2 &&
              lens
                .filter((lens) => lens.orderTypeKey === 1)
                .filter((lens) => lens.brandKey === Brand)
                .map((md) => (
                  <option key={md.id} value={md.id}>
                    {md.name}
                  </option>
                ))}
            {(ItemCategories === 3 || ItemCategories === 4) &&
              fs
                .filter((fs) => fs.brandKey === Brand)
                .map((md) => (
                  <option key={md.id} value={md.fsModelKey}>
                    {model.find((elm) => elm.id === md.fsModelKey).modelName}
                  </option>
                ))}
            {(ItemCategories === 1 ||
              ItemCategories === 5 ||
              ItemCategories === 6) &&
              csa
                .filter((csa) => csa.orderTypeKey === OrderType)
                .filter((csa) => csa.scKey === ItemCategories)
                .filter((csa) => csa.brandKey === Brand)
                .map((md) => (
                  <option key={md.id} value={md.csaModelKey}>
                    {model.find((elm) => elm.id === md.csaModelKey).modelName}
                  </option>
                ))}
            {ItemCategories === 1 &&
              OrderType === 2 &&
              csa
                .filter((csa) => csa.orderTypeKey === 1)
                .filter((csa) => csa.scKey === ItemCategories)
                .filter((csa) => csa.brandKey === Brand)
                .map((md) => (
                  <option key={md.id} value={md.csaModelKey}>
                    {model.find((elm) => elm.id === md.csaModelKey).modelName}
                  </option>
                ))}
          </select> */}
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
