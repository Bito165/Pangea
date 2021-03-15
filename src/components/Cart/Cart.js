import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import useAppState from '../../state';

import CartItem from './CartItem';
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
} from './Elements';

const CURRENCY_QUERY = gql`
  {
    currency
  }
`;

const Cart = () => {
  const { data = {} } = useQuery(CURRENCY_QUERY);
  const currencies = data.currency || [];
  const {
    isCartOpen,
    shoppingCart,
    closeCart,
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
      <Overlay onClick={closeCart} />
      <Content>
        <Header style={{padding: '1.5rem'}}>
          <Title>My cart <hr /> </Title>
          <Back onClick={closeCart} />
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

export default Cart;
