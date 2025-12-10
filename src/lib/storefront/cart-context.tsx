import { createContext, useContext } from 'react';
import type { Cart } from '@/lib/storefront/types';

const CartContext = createContext<Cart | null>(null);

export function CartProvider({
  cart,
  children,
}: {
  cart: Cart;
  children: React.ReactNode;
}) {
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error('useCart must be used within CartProvider');
  }
  return cart;
}
