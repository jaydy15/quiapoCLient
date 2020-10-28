import React from 'react';
import CartListItem from './CartListItem';

const CartList = () => {
  const items = ['eyeglasses', 'sunglasses', 'contact lens', 'lens'];
  return (
    <div>
      {items.map((item) => (
        <p>{item}</p>
      ))}
    </div>
  );
};

export default CartList;
