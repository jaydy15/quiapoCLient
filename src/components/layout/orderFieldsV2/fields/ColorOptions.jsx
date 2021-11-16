import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const ColorOptions = ({
  setFormData,
  formData,
  Model,
  color,
  LensParamId,
  lensParam,
  lensItems,
  ItemCategories,
  CAItems,
  FSItems,
}) => {
  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const isFS = ItemCategories == 3 || ItemCategories == 4;
  const isCA = ItemCategories == 5 || ItemCategories == 6;
  const isLens = ItemCategories == 2 || ItemCategories == 1;

  let colorFind;
  let optColor = [];
  const colorFinder = (key) => {
    colorFind = key.slice(1, -1).split(',');
    const clrsarray = colorFind.map((cf) => cf.substring(0, 4));
    const daysarray = colorFind.map((cf) => cf.slice(-2));

    for (let x = 0; x < clrsarray.length; x++) {
      let hldrlbl = color.find((color) => color.id == clrsarray[x]).colorName;
      let hldrid = color.find((color) => color.id == clrsarray[x]).id;
      let hldrobj = {
        label: hldrlbl + ' ' + daysarray[x] + ' days',
        value: hldrid,
      };
      optColor.push(hldrobj);
    }
  };
  if (isLens && Model) {
    const lensFit = lensParam.filter((item) => item.lensItemKey === Model);
    if (lensFit.length > 1) {
      const arrayLensFitting = lensParam.filter(
        (item) => item.lensItemKey === Model && item.id === LensParamId
      );
      if (arrayLensFitting.length > 0) {
        colorFinder(arrayLensFitting[0].cdKeys);
      }
    } else {
      colorFinder(lensFit[0].cdKeys);
    }
  }

  if (isFS && Model) {
    const getColor = FSItems.find((fs) => fs.id == Model).cdKey;

    if (getColor) {
      const findColor = color.find((cl) => cl.id == getColor);
      const obj = {
        label: findColor.colorName,
        value: findColor.id,
      };

      optColor.push(obj);
    }
  }

  if (isCA && Model) {
    const getColor = CAItems.find((ca) => ca.id == Model).cdKey;
    if (getColor) {
      const findColor = color.find((cl) => cl.id == getColor);
      const obj = {
        label: findColor.colorName,
        value: findColor.id,
      };

      optColor.push(obj);
    }
  }

  return (
    <div>
      <div className='form-group'>
        <label htmlFor='Model'>
          Color<span style={{ color: 'red' }}>*</span>
        </label>
        <Select
          name='Color'
          options={optColor}
          onChange={(selectedOption) => {
            setFormData({
              ...formData,
              Color: selectedOption.value,
            });
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  color: state.catalogue.colors,
  lensItems: state.catalogue.lensItems,
  lensParam: state.catalogue.lensParam,
  CAItems: state.catalogue.csaItems,
  FSItems: state.catalogue.fsItems,
});

export default connect(mapStateToProps)(ColorOptions);
