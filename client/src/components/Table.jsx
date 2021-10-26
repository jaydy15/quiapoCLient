import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

const Table = ({ lens }) => {
  const lensItems = lens.map((len) => len.name);
  const lensId = lens.map((len) => len.id);
  console.log(lensItems);
  const objOptions = [];
  for (let i = 0; i < lensItems.length; i++) {
    let formattObj = {
      label: lensItems[i],
      value: lensId[i],
    };
    objOptions.push(formattObj);
  }

  return <Select options={objOptions} />;
};

const mapStateToProps = (state) => ({
  lens: state.catalogue.lensItems,
});

export default connect(mapStateToProps)(Table);
