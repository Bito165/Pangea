import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import useAppState from '../../state';

import CartItem from './cartItem';
import {
  Wrapper,
  Overlay,
  Content,
  Back,
  Title,
  Header,
  Select,
  CartItemDisplay,
  SubTotalRow,
  SubTotalLabel,
  SubTotalPrice,
  CheckoutButton, CardFooter, EmptyCartText,
} from './componentElements';

const CURRENCY_QUERY = gql`
  {
    currency
  }
`;

const ShoppingCart = () => {
  const { data = {} } = useQuery(CURRENCY_QUERY);
  const currencies = data.currency || [];
  const {
    isCartOpen,
    shoppingCart,
    hideCart,
    subTotal,
    currencySymbol,
    currentCurrency,
    setCurrency,
  } = useAppState();

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isCartOpen ? 'hidden' : 'scroll';
  }, [isCartOpen]);

  if (!isCartOpen) {
    return null;
  }

  return (
    <Wrapper>
      <Overlay onClick={hideCart} />
      <Content>
        <Header style={{padding: '1.5rem'}}>
          <Title>My cart <hr /> </Title>
          <Back onClick={hideCart} />
        </Header>
        <div>
          <span style={{textAlign: 'left', padding: '1.5rem'}}>
            Select Currency ({currencySymbol}) :
          </span>
          <span>
          <Select value={currentCurrency} onChange={(e) => setCurrency(e.target.value)}>
            {currencies.map((currency) => (
                <option value={currency}>{currency}</option>
            ))}
          </Select>
        </span>
        </div>
        {shoppingCart.length > 0 ?
          <CartItemDisplay>
          {shoppingCart.map((item) => (
              <CartItem
                  key={item.id}
                  quantity={item.quantity}
                  title={item.title}
                  price={item.price}
                  id={item.id}
                  img={item.image_url}
              />
          ))}
        </CartItemDisplay> :
          <EmptyCartText> There are no items in your cart
          </EmptyCartText> }
        {shoppingCart.length > 0 ?
          <CardFooter>
            <SubTotalRow>
              <SubTotalLabel>Subtotal: </SubTotalLabel>
              <SubTotalPrice>
                {currencySymbol}
                {subTotal}
              </SubTotalPrice>
            </SubTotalRow>
            <CheckoutButton>Proceed To Checkout</CheckoutButton>
          </CardFooter> : null }
      </Content>
    </Wrapper>
  );
};

export default ShoppingCart;
