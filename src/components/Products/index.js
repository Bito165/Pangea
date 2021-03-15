import React, { Fragment } from 'react';
import useAppState from '../../state';
import { Container } from './../Layout';
import {
  Header,
  Title,
  ProductGallery,
  GalleryItem, ProductGalleryWrap,
} from './Elements';
import ProductItem from './ProductItem';

const Products = () => {
  const { addToCart, products, currencySymbol } = useAppState();

  return (
    <Fragment>
      <Container>
        <Header>
          <Title>All Products</Title>
        </Header>
      </Container>

      <ProductGalleryWrap>
        <Container>
          <ProductGallery>
            {products.map((product) => (
              <GalleryItem key={product.id} className={'productItem'}>
                <ProductItem
                  id={product.id}
                  name={product.title}
                  price={`${currencySymbol}${product.price}`}
                  img={product.image_url}
                  onAddToCart={addToCart}
                />
              </GalleryItem>
            ))}
          </ProductGallery>
        </Container>
      </ProductGalleryWrap>
    </Fragment>
  );
};

export default Products;
