import React, { Fragment } from 'react';
import useAppState from '../../state';

import {
  Header,
  Title,
  ProductGallery,
  GalleryItem, ProductGalleryWrap,
} from './componentElements';
import Items from './items';

const Products = () => {
  const { addItemToCart, products, currencySymbol } = useAppState();

  return (
    <Fragment>
        <Header>
          <Title>All Products</Title>
        </Header>

      <ProductGalleryWrap>
          <ProductGallery>
            {products.map((product) => (
              <GalleryItem key={product.id} className={'productItem'}>
                <Items
                  id={product.id}
                  name={product.title}
                  price={`${currencySymbol}${product.price}`}
                  img={product.image_url}
                  onaddItemToCart={addItemToCart}
                />
              </GalleryItem>
            ))}
          </ProductGallery>
      </ProductGalleryWrap>
    </Fragment>
  );
};

export default Products;
