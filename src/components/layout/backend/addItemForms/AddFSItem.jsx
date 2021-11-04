import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import { setAlert } from '../../../../redux/alert/alertActions';
import { saveFSItems } from '../../../../redux/backend/backendActions';
import { loadCatalogue } from '../../../../redux/localCatalog/localCatalogActions';
import Alerts from '../../../Alerts';

const AddFSItem = ({
  orderType,
  brand,
  model,
  color,
  supplycategory,
  fsItems,
  loadCatalogue,
  setAlert,
  handleClose,
  saveFSItems,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    ordrTyp: '',
    brnd: '',
    mdl: '',
    clr: '',
    suppCat: '',
  });

  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [bridge, setBridge] = useState('');
  const [temple, setTemple] = useState('');

  const { ordrTyp, brnd, mdl, clr, suppCat } = formData;

  const optorderType = [];
  const optbrand = [];
  const optModel = [];
  const optColor = [];
  const optsupplycategory = [];

  const optionFiller = (arrayName, arrayHolder) => {
    const list = arrayName.map((item) => item);

    for (let i = 0; i < list.length; i++) {
      let formattObj = {
        label: arrayName[i].name,
        value: arrayName[i].id,
      };
      arrayHolder.push(formattObj);
    }
  };
  const optionFillerDesc = (arrayName, arrayHolder) => {
    const list = arrayName.map((item) => item);

    for (let i = 0; i < list.length; i++) {
      let formattObj = {
        label: arrayName[i].typeDesc,
        value: arrayName[i].id,
      };
      arrayHolder.push(formattObj);
    }
  };

  const optionFillerDesc2 = (arrayName, arrayHolder) => {
    const list = arrayName.map((item) => item);

    for (let i = 0; i < list.length; i++) {
      let formattObj = {
        label: arrayName[i].desc,
        value: arrayName[i].id,
      };
      arrayHolder.push(formattObj);
    }
  };

  const optionFillerModel = (arrayName, arrayHolder) => {
    const list = arrayName.map((item) => item);

    for (let i = 0; i < list.length; i++) {
      let formattObj = {
        label: arrayName[i].modelName,
        value: arrayName[i].id,
      };
      arrayHolder.push(formattObj);
    }
  };

  const optionFillerColor = (arrayName, arrayHolder) => {
    const list = arrayName.map((item) => item);

    for (let i = 0; i < list.length; i++) {
      let formattObj = {
        label: arrayName[i].colorName,
        value: arrayName[i].id,
      };
      arrayHolder.push(formattObj);
    }
  };

  optionFillerDesc(orderType, optorderType);
  optionFiller(brand, optbrand);
  optionFillerModel(model, optModel);
  optionFillerColor(color, optColor);
  optionFillerDesc2(supplycategory, optsupplycategory);

  const onSubmit = (data) => {
    const fsID =
      ordrTyp.toString().padStart(2, '0') +
      '' +
      brnd.toString().padStart(5, '0') +
      '' +
      mdl.toString().padStart(5, '0') +
      '' +
      clr.toString().padStart(5, '0') +
      '' +
      suppCat.toString().padStart(2, '0');

    console.log(fsID);
    console.log(ordrTyp, brnd, mdl, clr, suppCat);

    console.log(fsItems);
    const isDuplicate = fsItems.filter((fs) => fs.id.toString() == fsID);
    console.log(isDuplicate);

    const obj = {
      id: fsID,
      orderTypeKey: ordrTyp,
      brandKey: brnd,
      fsModelKey: mdl,
      cdKey: clr,
      supplyCategoryKey: suppCat,
      width: width,
      height: height,
      bridge: bridge,
      templeArms: temple,
    };
    console.log(obj);
    if (isDuplicate.length == 0) {
      saveFSItems(obj);
      setAlert('New Item added successfully', 'success');
      setTimeout(() => {
        setFormData({ ordrTyp: '' });
        setFormData({ brnd: '' });
        setFormData({ mdl: '' });
        setFormData({ clr: '' });
        setFormData({ suppCat: '' });
        loadCatalogue();
        handleClose();
      }, 1000);
    } else {
      setAlert('Brand is already exists, enter another brand', 'danger');
    }
  };
  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='form-group'>
            <label htmlFor='brand'>
              Order Type<span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              name='ordrTyp'
              options={optorderType}
              onChange={(selectedOption) => {
                setFormData({ ...formData, ordrTyp: selectedOption.value });
              }}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='brand'>
              Brand<span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              name='brnd'
              options={optbrand}
              onChange={(selectedOption) => {
                setFormData({ ...formData, brnd: selectedOption.value });
              }}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='brand'>
              Model<span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              name='mdl'
              options={optModel}
              onChange={(selectedOption) => {
                setFormData({ ...formData, mdl: selectedOption.value });
              }}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='brand'>
              Color<span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              name='clr'
              options={optColor}
              onChange={(selectedOption) => {
                setFormData({ ...formData, clr: selectedOption.value });
              }}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='brand'>
              Supply Category<span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              name='suppCat'
              options={optsupplycategory}
              onChange={(selectedOption) => {
                setFormData({ ...formData, suppCat: selectedOption.value });
              }}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>
              Width<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type='text'
              className='form-control'
              name='width'
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>
              Height<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type='text'
              className='form-control'
              name='height'
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>
              Bridge<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type='text'
              className='form-control'
              name='bridge'
              value={bridge}
              onChange={(e) => setBridge(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>
              Temple Arm<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type='text'
              className='form-control'
              name='temple'
              value={temple}
              onChange={(e) => setTemple(e.target.value)}
            />
          </div>
          <button className='btn btn-block btn-success'>Add Lens Item</button>
        </div>
      </form>
      <Alerts />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  orderType: state.catalogue.orderTypes,
  brand: state.classes.brand,
  model: state.catalogue.fscsaModels,
  color: state.catalogue.colors,
  supplycategory: state.catalogue.supplyCategories,
  fsItems: state.catalogue.fsItems,
});

export default connect(mapStateToProps, {
  loadCatalogue,
  setAlert,
  saveFSItems,
})(AddFSItem);
