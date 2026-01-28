'use client';

import { createContext, useContext } from 'react';
import React from 'react';

type CheckoutState = {
  orderId: string | null;
  clientSecret: string | null;
  // Add other checkout-related state properties here
};
const CheckoutContext = createContext<CheckoutState | null>(null);

export function CheckoutProvider({
  checkoutState,
  children,
}: {
  checkoutState: CheckoutState;
  children: React.ReactNode;
}) {
  return (
    <CheckoutContext.Provider value={checkoutState}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
