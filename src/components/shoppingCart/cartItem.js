import React from 'react';
import useAppState from '../../state';

import {
  CartItemWrap,
  CartItemTitle,
  CartItemCancel,
  CartItemImg,
  QuantityManager,
  CartItemBottomRow,
  PriceWrap,
  Price,
} from './componentElements';

const CartItem = ({ quantity, title, img, price, id }) => {
  const { addItemToCart, removeItemFromCart, currencySymbol } = useAppState();

  return (
    <CartItemWrap>
      <CartItemTitle>{title}</CartItemTitle>
      <CartItemCancel onClick={() => removeItemFromCart(id, -quantity)}>
        x
      </CartItemCancel>
      <CartItemImg src={img} />
      <CartItemBottomRow>
        <QuantityManager
          quantity={quantity}
          onIncrease={() => addItemToCart(id)}
          onDecrease={() => removeItemFromCart(id)}
        />
        <PriceWrap>
          <Price>
            {currencySymbol}
            {price * quantity}
          </Price>
        </PriceWrap>
      </CartItemBottomRow>
    </CartItemWrap>
  );
};

export default CartItem;
