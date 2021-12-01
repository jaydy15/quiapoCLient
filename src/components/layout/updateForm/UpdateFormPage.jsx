import React from 'react';
import { connect } from 'react-redux';
import UpdateForm from './UpdateForm';

const UpdateFormPage = ({ current }) => {
  let propForm;
  console.log(current);
  if (current.length > 0) {
    propForm = current;
  } else {
    propForm = [
      {
        RxNumber: 0,
        OrderType: 0,
        ItemCategories: 0,
        Brand: 0,
        Model: 0,
        Color: 0,
        Size: '0',
        NonLensQty: 0,
        OdSph: 0,
        OdCyl: 0,
        OdAxis: 0,
        OdAdd: 0,
        OdPd: 0,
        OdQty: 0,
        OsSph: 0,
        OsCyl: 0,
        OsAxis: 0,
        OsAdd: 0,
        OsPd: 0,
        OsQty: 0,
        PatientsName: 0,
        Horizontal: 0,
        Vertical: 0,
        Bridge: 0,
        FrameType: 0,
        LenShape: 0,
        AdditionalInstructions: 0,
        LensParamId: 0,
        nonLensUnitName: 0,
      },
    ];
  }
  return (
    <div>
      <UpdateForm current={propForm} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  current: state.cart.current,
});

export default connect(mapStateToProps)(UpdateFormPage);
