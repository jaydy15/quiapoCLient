import React from 'react';

const CartList = () => {
  const items = ['eyeglasses', 'sunglasses', 'contact lens', 'lens'];
  return (
    <div>
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
};

export default CartList;
