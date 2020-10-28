import React from 'react';

const Button = ({ label, property }) => {
  return (
    <button type='submit' className={property}>
      {label}
    </button>
  );
};

export default Button;
