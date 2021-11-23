import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import FittingOptions from './FittingOptions';
import ColorOptions from './ColorOptions';
import OdOptions from './OdOptions';
import OsOptions from './OsOptions';

const GradesOptions = ({
  setFormData,
  formData,
  Model,
  color,
  LensParamId,
  lensParam,
  lensItems,
  ItemCategories,
  onChange,
  lensParamCounter,
  LensParamIdOd,
  LensParamIdOs,
  OdSph,
  OdCyl,
  OdAxis,
  OdAdd,
  OdPd,
  OdQty,
  OsSph,
  OsCyl,
  OsAxis,
  OsAdd,
  OsPd,
  OsQty,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const switcher = ItemCategories == 1 || ItemCategories == 2;

  return (
    <Fragment>
      {switcher && (
        <Fragment>
          <OdOptions
            lensParamCounter={lensParamCounter}
            setFormData={setFormData}
            formData={formData}
            Model={Model}
            ItemCategories={ItemCategories}
            LensParamId={LensParamId}
            onChange={onChange}
            LensParamIdOd={LensParamIdOd}
            OdSph={OdSph}
            OdCyl={OdCyl}
            OdAxis={OdAxis}
            OdAdd={OdAdd}
            OdPd={OdPd}
            OdQty={OdQty}
          />

          <OsOptions
            lensParamCounter={lensParamCounter}
            setFormData={setFormData}
            formData={formData}
            Model={Model}
            ItemCategories={ItemCategories}
            LensParamId={LensParamId}
            onChange={onChange}
            LensParamIdOs={LensParamIdOs}
            OsSph={OsSph}
            OsCyl={OsCyl}
            OsAxis={OsAxis}
            OsAdd={OsAdd}
            OsPd={OsPd}
            OsQty={OsQty}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  color: state.catalogue.colors,
  lensItems: state.catalogue.lensItems,
  lensParam: state.catalogue.lensParam,
  CAItems: state.catalogue.csaItems,
  FSItems: state.catalogue.fsItems,
});

export default connect(mapStateToProps)(GradesOptions);
