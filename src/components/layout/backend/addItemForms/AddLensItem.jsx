import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';

const AddLensItem = ({
  orderType,
  brand,
  lensType,
  indexType,
  productFamily,
  supplycategory,
  lensMaterial,
}) => {
  const [formData, setFormData] = useState({
    ordrTyp: '',
    brnd: '',
    lensTyp: '',
    indxTyp: '',
    prodFam: '',
    suppCat: '',
    lensMat: '',
  });

  const { prodFam, lensMat, lensTyp, brnd, ordrTyp, suppCat, indxTyp } =
    formData;

  const optorderType = [];
  const optbrand = [];
  const optlensType = [];
  const optindexType = [];
  const optProductFamily = [];
  const optsupplycategory = [];
  const optLensMaterial = [];

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

  optionFillerDesc(orderType, optorderType);
  optionFiller(brand, optbrand);
  optionFiller(lensType, optlensType);
  optionFiller(indexType, optindexType);
  optionFiller(productFamily, optProductFamily);
  optionFillerDesc2(supplycategory, optsupplycategory);
  optionFiller(lensMaterial, optLensMaterial);

  console.log(optProductFamily);
  console.log(optLensMaterial);
  console.log(optlensType);
  console.log(optindexType);
  console.log(optbrand);
  console.log(optorderType);
  console.log(optsupplycategory);
  return (
    <div>
      <div className='form-group'>
        <label htmlFor='brand'>
          Order Type<span style={{ color: 'red' }}>*</span>
        </label>
        <Select
          name='classes'
          options={optorderType}
          onChange={(selectedOption) => {
            setFormData({ ...formData, ordrTyp: selectedOption.id });
          }}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='brand'>
          Brand<span style={{ color: 'red' }}>*</span>
        </label>
        <Select
          name='classes'
          options={optbrand}
          onChange={(selectedOption) => {
            setFormData({ ...formData, brnd: selectedOption.id });
          }}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='brand'>
          Lens Type<span style={{ color: 'red' }}>*</span>
        </label>
        <Select
          name='classes'
          options={optlensType}
          onChange={(selectedOption) => {
            setFormData({ ...formData, lensTyp: selectedOption.id });
          }}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='brand'>
          Index Type<span style={{ color: 'red' }}>*</span>
        </label>
        <Select
          name='classes'
          options={optindexType}
          onChange={(selectedOption) => {
            setFormData({ ...formData, indxTyp: selectedOption.id });
          }}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='brand'>
          Product Family<span style={{ color: 'red' }}>*</span>
        </label>
        <Select
          name='classes'
          options={optProductFamily}
          onChange={(selectedOption) => {
            setFormData({ ...formData, prodFam: selectedOption.id });
          }}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='brand'>
          Supply Category<span style={{ color: 'red' }}>*</span>
        </label>
        <Select
          name='classes'
          options={optsupplycategory}
          onChange={(selectedOption) => {
            setFormData({ ...formData, suppCat: selectedOption.id });
          }}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='brand'>
          Lens Material <span style={{ color: 'red' }}>*</span>
        </label>
        <Select
          name='classes'
          options={optLensMaterial}
          onChange={(selectedOption) => {
            setFormData({ ...formData, lensMat: selectedOption.id });
          }}
        />
      </div>
    </div>
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
});

export default connect(mapStateToProps)(AddLensItem);
