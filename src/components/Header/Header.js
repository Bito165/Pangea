import React from 'react';
import useAppState from '../../state';
import {
  HeaderWrapper,
  Menu,
  Group,
  NavGroup,
  Logo,
  NavLink,
} from './Elements';

import {Cart} from './HeaderCart'

const Header = () => {
  const { openCart, shoppingCart } = useAppState();
  const cartLength = shoppingCart.length;

  return (
    <HeaderWrapper>
      <Menu />
      <NavGroup>
        <Logo />
      </NavGroup>
      <Group>
        <NavLink>My Account</NavLink>
        <Cart onClick={openCart} cartLength={cartLength} />
      </Group>
    </HeaderWrapper>
  );
};

export default Header;
