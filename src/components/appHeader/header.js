import React from 'react';
import useAppState from '../../state';
import {
  HeaderWrapper,
  Menu,
  Group,
  NavGroup,
  Logo,
  NavLink,
} from './componentElements';

import {Cart} from './headerCart'

const Header = () => {
  const { displayCart, shoppingCart } = useAppState();
  const cartLength = shoppingCart.length;

  return (
    <HeaderWrapper>
      <Menu />
      <NavGroup>
        <Logo />
      </NavGroup>
      <Group>
        <NavLink>My Account</NavLink>
        <Cart onClick={displayCart} cartLength={cartLength} />
      </Group>
    </HeaderWrapper>
  );
};

export default Header;
