import React from 'react';
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

  return (
    <div>
      {model !== undefined && (
        <div className='form-group'>
          <label htmlFor='brand'>
            Model<span style={{ color: 'red' }}>*</span>
          </label>
          <select onChange={onChange} className='form-control' name='Model'>
            <option>Select Model</option>
            {ItemCategories === '2' &&
              lens
                .filter((lens) => lens.orderTypeKey.toString() === OrderType)
                .filter((lens) => lens.brandKey.toString() === Brand)
                .map((md) => (
                  <option key={md.id} value={md.id}>
                    {md.name}
                  </option>
                ))}
            {ItemCategories === '2' &&
              OrderType === '2' &&
              lens
                .filter((lens) => lens.orderTypeKey === 1)
                .filter((lens) => lens.brandKey.toString() === Brand)
                .map((md) => (
                  <option key={md.id} value={md.id}>
                    {md.name}
                  </option>
                ))}
            {(ItemCategories === '3' || ItemCategories === '4') &&
              fs
                .filter((fs) => fs.brandKey.toString() === Brand)
                .map((md) => (
                  <option key={md.id} value={md.fsModelKey}>
                    {model.find((elm) => elm.id === md.fsModelKey).modelName}
                  </option>
                ))}
            {(ItemCategories === '1' ||
              ItemCategories === '5' ||
              ItemCategories === '6') &&
              csa
                .filter((csa) => csa.orderTypeKey.toString() === OrderType)
                .filter((csa) => csa.scKey.toString() === ItemCategories)
                .filter((csa) => csa.brandKey.toString() === Brand)
                .map((md) => (
                  <option key={md.id} value={md.csaModelKey}>
                    {model.find((elm) => elm.id === md.csaModelKey).modelName}
                  </option>
                ))}
            {ItemCategories === '1' &&
              OrderType === '2' &&
              csa
                .filter((csa) => csa.orderTypeKey === 1)
                .filter((csa) => csa.scKey.toString() === ItemCategories)
                .filter((csa) => csa.brandKey.toString() === Brand)
                .map((md) => (
                  <option key={md.id} value={md.csaModelKey}>
                    {model.find((elm) => elm.id === md.csaModelKey).modelName}
                  </option>
                ))}
          </select>
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
