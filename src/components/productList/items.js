import React, { useCallback } from 'react';
import {
  ProductName,
  ProductImg,
  ProductPrice,
  ProductButton,
  ProductItemWrap,
} from './componentElements';

const Items = ({ img, name, price, id, onaddItemToCart }) => {
  const handleAddItemToCart = useCallback(() => onaddItemToCart(id), [onaddItemToCart, id]);

  return (
    <ProductItemWrap>
      <div className={'productWrap'}>
        <ProductImg src={img} />
      </div>
      <ProductName>{name}</ProductName>
      <ProductPrice>{price}</ProductPrice>
      <ProductButton onClick={handleAddItemToCart}>Add To Cart</ProductButton>
    </ProductItemWrap>
  );
};

export default Items;
