import React from 'react';
import { connect } from 'react-redux';

const Models = ({ model, ...ownprops }) => {
  const { onChange } = ownprops;

  return (
    <div>
      {model !== undefined && (
        <div className='form-group'>
          <label htmlFor='brand'>Model</label>
          <select onChange={onChange} className='form-control' name='Model'>
            <option>Select Model</option>
            {model.map((md) => (
              <option key={md.id} value={JSON.stringify(md)}>
                {md.modelName}
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
});

export default connect(mapStateToProps)(Models);
