import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';

const AddLensParams = ({ lensItems }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    lensKey: '',
    brnd: '',
    lensTyp: '',
    indxTyp: '',
    prodFam: '',
    suppCat: '',
    lensMat: '',
  });

  const lensKeyOpt = [];
  const lensNameOpt = [];
  const optionFiller = (arrayName, arrayHolder) => {
    const list = arrayName.map((item) => item);

    for (let i = 0; i < list.length; i++) {
      let formattObj = {
        label: arrayName[i].id,
        value: arrayName[i].id,
      };
      arrayHolder.push(formattObj);
    }
  };
  const optionFiller2 = (arrayName, arrayHolder) => {
    const list = arrayName.map((item) => item);

    for (let i = 0; i < list.length; i++) {
      let formattObj = {
        label: arrayName[i].name,
        value: arrayName[i].name,
      };
      arrayHolder.push(formattObj);
    }
  };

  optionFiller(lensItems, lensKeyOpt);
  optionFiller2(lensItems, lensNameOpt);

  const { lensKey, lensName, lensTyp, brnd, ordrTyp, suppCat, indxTyp } =
    formData;

  const lensNames = lensItems
    .filter((ls) => ls.id === lensKey)
    .map((li) => li.name);
  console.log(lensKey);
  console.log(lensName);

  const lensIDs = lensItems
    .filter((ls) => ls.name === lensName)
    .map((li) => li.id);
  console.log(lensIDs);
  console.log(lensName);

  const onSubmit = (data) => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className='form-group'>
          <label htmlFor='brand'>
            Lens Item Key<span style={{ color: 'red' }}>*</span>
          </label>
          <Select
            name='ordrTyp'
            options={lensKeyOpt}
            onChange={(selectedOption) => {
              setFormData({ ...formData, lensKey: selectedOption.value });
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='brand'>
            Lens Name<span style={{ color: 'red' }}>*</span>
          </label>
          <Select
            name='ordrTyp'
            options={lensNameOpt}
            onChange={(selectedOption) => {
              setFormData({ ...formData, lensName: selectedOption.value });
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>
            Lens Name<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='text'
            className='form-control'
            name='lensName'
            placeholder={lensNames}
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
  lensItems: state.catalogue.lensItems,
});

export default connect(mapStateToProps)(AddLensParams);
