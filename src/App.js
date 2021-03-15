import React from 'react';

import Header from './components/appHeader';
import Products from './components/productList';
import ShoppingCart from './components/shoppingCart';

import './styles/normalize.css';
import './styles/font.css';
import './styles/base.css';
import { AppStateProvider } from './state';

function App() {
  return (
    <AppStateProvider>
      <Header />
      <Products />
      <ShoppingCart />
    </AppStateProvider>
  );
}

export default App;
