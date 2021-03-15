import React, { useCallback } from 'react';
import {
  ProductName,
  ProductImg,
  ProductPrice,
  ProductButton,
  ProductItemWrap,
} from './Elements';

const ProductItem = ({ img, name, price, id, onAddToCart }) => {
  const handleAddToCart = useCallback(() => onAddToCart(id), [onAddToCart, id]);

  return (
    <ProductItemWrap>
      <div
        style={{ height: '10rem', display: 'flex', justifyContent: 'flex-end' }}
      >
        <ProductImg src={img} />
      </div>
      <ProductName>{name}</ProductName>
      <ProductPrice>{price}</ProductPrice>
      <ProductButton onClick={handleAddToCart}>Add To Cart</ProductButton>
    </ProductItemWrap>
  );
};

export default ProductItem;
