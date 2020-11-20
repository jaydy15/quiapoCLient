import React from 'react';
import { connect } from 'react-redux';

const Models = ({ model, ItemCategories, lens, ...ownprops }) => {
  const { onChange } = ownprops;

  console.log(lens);

  return (
    <div>
      {model !== undefined && ItemCategories !== '2' && (
        <div className='form-group'>
          <label htmlFor='brand'>Model</label>
          <select onChange={onChange} className='form-control' name='Model'>
            <option>Select Model</option>
            {model.map((md) => (
              <option key={md.id} value={md.id}>
                {md.modelName}
              </option>
            ))}
          </select>
        </div>
      )}
      {model !== undefined && ItemCategories === '2' && (
        <div className='form-group'>
          <label htmlFor='brand'>Model</label>
          <select onChange={onChange} className='form-control' name='Model'>
            <option>Select Model</option>
            {lens.map((md) => (
              <option key={md.id} value={md.id}>
                {md.name}
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
});

export default connect(mapStateToProps)(Models);
