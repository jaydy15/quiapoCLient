import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import { setAlert } from '../../../../redux/alert/alertActions';
import { saveLensParams } from '../../../../redux/backend/backendActions';
import { loadCatalogue } from '../../../../redux/localCatalog/localCatalogActions';
import Alerts from '../../../Alerts';

const AddLensParams = ({
  lensItems,
  lensParams,
  saveLensParams,
  loadCatalogue,
  setAlert,
  handleClose3,
  colors,
}) => {
  const { handleSubmit } = useForm();
  const [formData, setFormData] = useState({
    maxSph: 0,
    minSph: 0,
    maxCyl: 0,
    minCyl: 0,
    maxAdd: 0,
    minAdd: 0,
    totalPower: 0,
    lensName: '0',
  });

  const {
    lensName,
    maxSph,
    minSph,
    maxCyl,
    minCyl,
    maxAdd,
    minAdd,
    totalPower,
    color,
  } = formData;

  const lensNameOpt = [];
  const colorOpt = [];

  const lensNameOption = (arrayName, arrayHolder) => {
    const list = arrayName.map((item) => item);

    for (let i = 0; i < list.length; i++) {
      let formattObj = {
        label: arrayName[i].name,
        value: arrayName[i].name,
      };
      arrayHolder.push(formattObj);
    }
  };

  lensNameOption(lensItems, lensNameOpt);

  const colorOptionFiller = (arrayName, arrayHolder) => {
    const list = arrayName.map((item) => item);
    for (let i = 0; i < list.length; i++) {
      let formattObj = {
        label: arrayName[i].colorName,
        value: arrayName[i].id,
      };
      arrayHolder.push(formattObj);
    }
  };

  colorOptionFiller(colors, colorOpt);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const lenparamArray = lensParams.map((lp) => lp);
  const index = lenparamArray.length;
  const lastId = lenparamArray[index - 1].id;
  const nextId = parseInt(lastId.slice(0, -2)) + 1;

  console.log(nextId);

  const clrArray = [];
  const addColorArray = () => {
    clrArray.push(color);
    console.log(clrArray);
  };

  const onSubmit = (data) => {
    let suppKey;
    let paddingSupp;
    let lensId;

    if (lensName !== '0' || lensName !== undefined) {
      lensId = lensItems.find((ls) => ls.name == lensName).id;

      suppKey = lensItems.find((ls) => ls.name == lensName).supplyCategoryKey;
      paddingSupp = suppKey.toString().padStart(2, '0');
    }

    const finalId = nextId.toString().padStart(8, '0') + paddingSupp;

    const obj = {
      id: finalId,
      lensItemKey: lensId,
      maxSph: maxSph,
      minSph: minSph,
      maxCyl: maxCyl,
      minCyl: minCyl,
      maxAdd: maxAdd,
      minAdd: minAdd,
      totalPower: totalPower,
      cdKeys: '{001703,005103,004703,010003}',
    };
    saveLensParams(obj);
    setAlert('New Item added successfully', 'success');
    setTimeout(() => {
      setFormData({ maxSph: '' });
      setFormData({ minSph: '' });
      setFormData({ maxCyl: '' });
      setFormData({ minCyl: '' });
      setFormData({ maxAdd: '' });
      setFormData({ minAdd: '' });
      setFormData({ totalPower: '' });
      setFormData({ lensItemKey: '' });
      loadCatalogue();
      handleClose3();
    }, 1000);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className='form-group'>
          <label htmlFor='brand'>
            Lens Name<span style={{ color: 'red' }}>*</span>
          </label>
          <Select
            name='lensName'
            options={lensNameOpt}
            onChange={(selectedOption) => {
              setFormData({ ...formData, lensName: selectedOption.value });
            }}
          />
        </div>

        <div className='form-group'>
          <label htmlFor=''>
            Max Sph<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='text'
            className='form-control'
            name='maxSph'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>
            Min Sph<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='text'
            className='form-control'
            name='minSph'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>
            Max Cyl<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='text'
            className='form-control'
            name='maxCyl'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>
            Min Cyl<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='text'
            className='form-control'
            name='minCyl'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>
            Max Add<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='text'
            className='form-control'
            name='maxAdd'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>
            Min Add<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='text'
            className='form-control'
            name='minAdd'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>
            TotalPower<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='text'
            className='form-control'
            name='totalPower'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='brand'>
            Color<span style={{ color: 'red' }}>*</span>
          </label>
          <Select
            name='Color'
            options={colorOpt}
            onChange={(selectedOption) => {
              setFormData({ ...formData, color: selectedOption.value });
            }}
          />
        </div>
        <button type='button' className='btn btn-info' onClick={addColorArray}>
          Add Color
        </button>
        <div className='form-group'>
          <label htmlFor=''>
            Colors<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='text'
            className='form-control'
            name='color'
            onChange={onChange}
            disabled={true}
          />
        </div>
        <button className='btn btn-block btn-success'>Add Lens Item</button>
      </div>
      <Alerts />
    </form>
  );
};

const mapStateToProps = (state) => ({
  orderType: state.catalogue.orderTypes,
  brand: state.classes.brand,
  lensType: state.classes.lensType,
  indexType: state.classes.indexType,
  productFamily: state.classes.productFamily,
  supplycategory: state.catalogue.supplyCategories,
  lensMaterial: state.classes.lensMaterial,
  lensItems: state.catalogue.lensItems,
  lensParams: state.catalogue.lensParam,
  colors: state.catalogue.colors,
});

export default connect(mapStateToProps, {
  saveLensParams,
  loadCatalogue,
  setAlert,
})(AddLensParams);
