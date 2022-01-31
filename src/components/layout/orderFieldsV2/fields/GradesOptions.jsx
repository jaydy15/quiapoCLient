import React, { Fragment } from 'react';
import { connect } from 'react-redux';
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
  propOdSph,
  propOdCyl,
  propOdAxis,
  propOdAdd,
  propOdPd,
  propOdQty,
  propOsSph,
  propOsCyl,
  propOsAxis,
  propOsAdd,
  propOsPd,
  propOsQty,
}) => {
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
            propOdSph={propOdSph}
            propOdCyl={propOdCyl}
            propOdAxis={propOdAxis}
            propOdAdd={propOdAdd}
            propOdPd={propOdPd}
            propOdQty={propOdQty}
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
            propOsSph={propOsSph}
            propOsCyl={propOsCyl}
            propOsAxis={propOsAxis}
            propOsAdd={propOsAdd}
            propOsPd={propOsPd}
            propOsQty={propOsQty}
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
