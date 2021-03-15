import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useQuery, gql } from '@apollo/client';
import getSymbolFromCurrency from 'currency-symbol-map';

const AppStateContext = createContext({
  shoppingCart: [],
  isCartOpen: false,
  products: [],
  subTotal: 0,
  removeFromCart: () => {},
  addToCart: () => {},
  closeCart: () => {},
  openCart: () => {},
  currency: 'USD',
  setCurrency: () => {},
});

const PRODUCTS_QUERY = gql`
  query GetProducts($currency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
  }
`;

const findItemIndex = (shoppingCart, id) =>
    shoppingCart.findIndex((shoppingCartItem) => shoppingCartItem.id === id);

const getIndexInfo = (shoppingCart, id) => {
  const itemIndex = findItemIndex(shoppingCart, id);
  const existsInCart = itemIndex > -1;

  return { itemIndex, existsInCart };
};

const getNewStore = (shoppingCart, id, updateCount) => {
  const { existsInCart, itemIndex } = getIndexInfo(shoppingCart, id);

  if (existsInCart) {
    const updatedItem = shoppingCart[itemIndex];
    const newQuantity = updatedItem.quantity + updateCount;
    const quantityIsPositive = newQuantity > 0;

    if (quantityIsPositive) {
      const newCart = [...shoppingCart];
      newCart[itemIndex] = { ...updatedItem, quantity: newQuantity };
      return newCart;
    }

    return shoppingCart.filter((shoppingCartItem) => shoppingCartItem.id !== id);
  }

  return [...shoppingCart, { id, quantity: updateCount }];
};

const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        isCartOpen: true,
        store: getNewStore(state.store, action.payload.id, 1),
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        store: getNewStore(
            state.store,
            action.payload.id,
            action.payload.count || -1
        ),
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isCartOpen: false,
      };

    case 'OPEN_CART':
      return {
        ...state,
        isCartOpen: true,
      };

    default:
      return state;
  }
};

const flattenProductList = (arr = []) =>
    arr.reduce((obj, arrItem) => ({ ...obj, [arrItem.id]: arrItem }), {});

export const AppStateProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const { data = {} } = useQuery(PRODUCTS_QUERY, { variables: { currency } });
  const { products = [] } = data;
  const [shoppingCartState, dispatch] = useReducer(shoppingCartReducer, {
    store: [],
    isCartOpen: false,
  });
  const normalizedProducts = useMemo(() => flattenProductList(products), [
    products,
  ]);
  const shoppingCart = useMemo(
      () =>
          shoppingCartState.store.map((item) => ({
            ...item,
            ...normalizedProducts[item.id],
          })),
      [shoppingCartState, normalizedProducts]
  );
  const subTotal = useMemo(
      () => shoppingCart.reduce((total, item) => total + item.quantity * item.price, 0),
      [shoppingCart]
  );

  const addToCart = useCallback(
      (id) => dispatch({ type: 'ADD_TO_CART', payload: { id } }),
      [dispatch]
  );

  const removeFromCart = useCallback(
      (id, count = -1) =>
          dispatch({ type: 'REMOVE_FROM_CART', payload: { id, count } }),
      [dispatch]
  );

  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), [
    dispatch,
  ]);

  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), [
    dispatch,
  ]);
  return (
      <AppStateContext.Provider
          value={{
            shoppingCart,
            isCartOpen: shoppingCartState.isCartOpen,
            products,
            subTotal,
            removeFromCart,
            addToCart,
            closeCart,
            openCart,
            currency,
            setCurrency,
          }}
      >
        {children}
      </AppStateContext.Provider>
  );
};

const useAppState = () => {
  const appState = useContext(AppStateContext);
  const currencySymbol = getSymbolFromCurrency(appState.currency);

  return { ...appState, currencySymbol };
};


export default useAppState;
