import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';

const AddFSItem = ({ orderType, brand, model, color, supplycategory }) => {
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
    console.log(ordrTyp, brnd, mdl, clr, suppCat);
  };
  return (
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
        <button className='btn btn-block btn-success'>Add Lens Item</button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  orderType: state.catalogue.orderTypes,
  brand: state.classes.brand,
  model: state.catalogue.fscsaModels,
  color: state.catalogue.colors,
  supplycategory: state.catalogue.supplyCategories,
});

export default connect(mapStateToProps)(AddFSItem);
