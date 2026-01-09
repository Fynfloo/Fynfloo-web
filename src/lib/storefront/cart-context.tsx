'use client';

import React, { useState } from 'react';
import { createContext, useContext } from 'react';
import type { Cart } from '@/lib/storefront/types';

const CartContext = createContext<{
  cart: Cart | null;
  setCart: (c: Cart) => void;
} | null>(null);

export function CartProvider({
  initialCart,
  children,
}: {
  initialCart: Cart | null;
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(initialCart);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error('useCart must be used within CartProvider');
  }
  return cart;
}
