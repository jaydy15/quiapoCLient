import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';

const AddLensParams = ({
  orderType,
  brand,
  lensType,
  indexType,
  productFamily,
  supplycategory,
  lensMaterial,
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
    lensTyp: '',
    indxTyp: '',
    prodFam: '',
    suppCat: '',
    lensMat: '',
  });

  const [lensName, setLensName] = useState('');
  const [lensKey, setLensKey] = useState('');

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

  const onSubmit = (data) => {
    console.log(ordrTyp, brnd, lensTyp, indxTyp, prodFam, suppCat, lensMat);
    const checkLensId =
      ordrTyp.toString().padStart(2, '0') +
      '' +
      brnd.toString().padStart(5, '0') +
      '' +
      lensTyp.toString().padStart(3, '0') +
      '' +
      indxTyp.toString().padStart(2, '0') +
      '' +
      prodFam.toString().padStart(5, '0') +
      '' +
      lensMat.toString().padStart(5, '0') +
      '' +
      suppCat.toString().padStart(2, '0');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className='form-group'>
          <label htmlFor=''>
            Lens Name<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='text'
            className='form-control'
            name='lensName'
            onChange={(e) => setLensKey(e.target.value)}
            ref={register({ required: true })}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>
            Lens Key<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='text'
            className='form-control'
            name='lensKey'
            onChange={(e) => setLensKey(e.target.value)}
            ref={register({ required: true })}
          />
        </div>
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
            Lens Type<span style={{ color: 'red' }}>*</span>
          </label>
          <Select
            name='lensTyp'
            options={optlensType}
            onChange={(selectedOption) => {
              setFormData({ ...formData, lensTyp: selectedOption.value });
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='brand'>
            Index Type<span style={{ color: 'red' }}>*</span>
          </label>
          <Select
            name='indxTyp'
            options={optindexType}
            onChange={(selectedOption) => {
              setFormData({ ...formData, indxTyp: selectedOption.value });
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='brand'>
            Product Family<span style={{ color: 'red' }}>*</span>
          </label>
          <Select
            name='prodFam'
            options={optProductFamily}
            onChange={(selectedOption) => {
              setFormData({ ...formData, prodFam: selectedOption.value });
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='brand'>
            Lens Material <span style={{ color: 'red' }}>*</span>
          </label>
          <Select
            name='lensMat'
            options={optLensMaterial}
            onChange={(selectedOption) => {
              setFormData({ ...formData, lensMat: selectedOption.value });
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
  lensType: state.classes.lensType,
  indexType: state.classes.indexType,
  productFamily: state.classes.productFamily,
  supplycategory: state.catalogue.supplyCategories,
  lensMaterial: state.classes.lensMaterial,
});

export default connect(mapStateToProps)(AddLensParams);
